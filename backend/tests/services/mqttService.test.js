const knex = require('../../src/database');
const mqttService = require('../../src/services/mqttService');

jest.mock('../../src/database');

describe("MQTT Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
		jest.clearAllTimers();
    });

    describe("recordIrrigationHistory", () => {
        it("should record irrigation history for a valid garden identifier", async () => {
            const gardenIdentifier = 'valid-garden';
            const gardenMock = { id: 1 };

            // Mocking knex behavior
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(gardenMock);
            const insertKnexMock = jest.fn().mockResolvedValue([1]);

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                insert: insertKnexMock,
            }));

            await mqttService.recordIrrigationHistory(gardenIdentifier);

            expect(knex).toHaveBeenCalledWith('garden');
            expect(selectKnexMock).toHaveBeenCalledWith('id');
            expect(whereKnexMock).toHaveBeenCalledWith({ identifier: gardenIdentifier });
            expect(firstKnexMock).toHaveBeenCalled();
            expect(knex).toHaveBeenCalledWith('irrigationHistory');
            expect(insertKnexMock).toHaveBeenCalledWith({
                date: expect.any(Date),
                gardenId: gardenMock.id,
            });
        });

        it("should throw an error if the garden identifier is invalid", async () => {
            const invalidIdentifier = 'invalid-garden';

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
            }));

            await expect(mqttService.recordIrrigationHistory(invalidIdentifier))
                .rejects.toThrow('O identificador informado não pertence a uma horta!');

            expect(knex).toHaveBeenCalledWith('garden');
            expect(selectKnexMock).toHaveBeenCalledWith('id');
            expect(whereKnexMock).toHaveBeenCalledWith({ identifier: invalidIdentifier });
            expect(firstKnexMock).toHaveBeenCalled();
        });
    });

    describe("deleteOldIrrigationHistory", () => {
        it("should delete old irrigation history records", async () => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
			
			const whereKnexMock = jest.fn().mockReturnThis();
            const deleteKnexMock = jest.fn().mockResolvedValue(5);

            knex.mockImplementation(() => ({
                where: whereKnexMock,
                del: deleteKnexMock,
            }));

            await mqttService.deleteOldIrrigationHistory();

            expect(knex).toHaveBeenCalledWith('irrigationHistory');
			const calledDate = whereKnexMock.mock.calls[0][2];
			
			expect(new Date(calledDate).getTime()).toBeCloseTo(sevenDaysAgo.getTime(), -2);
            expect(deleteKnexMock).toHaveBeenCalled();
        });
    });

    describe("insertData", () => {
        it("should insert measurement data at database", async () => {
            knex.mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValueOnce({ id: 1 }), 
              });
              
              knex.mockReturnValueOnce({
                insert: jest.fn().mockResolvedValueOnce([1]), 
              });
          
              const data = 'horta123, 45'; 
              await expect(mqttService.insertData(data)).resolves.toBeUndefined();
        });

        it('Should return an error when the identifier was not found associated with a garden', async () => {
            knex.mockReturnValueOnce({
              select: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              first: jest.fn().mockResolvedValueOnce(null), 
            });
        
            const data = 'hortaInvalida, 45';
            
            await expect(mqttService.insertData(data)).rejects.toThrow('O identificador informado não pertence a uma horta!');
          });
    });

    describe("checkAndSendIrrigationMessage", ()=>{
        //Simulated Data
        const topicMQTTName = 'Outros/Estado_Motor';
        const qosMQTT = 0;
        const valueConfigSensor = "50";
        
        let parseFloatSpy, consoleErrorSpy;
        let publishMQTT, mqttClientMock;
        
        beforeEach(()=>{
            jest.clearAllMocks();

            parseFloatSpy = jest.spyOn(global, 'parseFloat');
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(()=>{return});

            // Mocking mqtt
            publishMQTT = jest.fn();
            mqttClientMock = {
                publish: publishMQTT
            };

            // Mocking knex (best scenario)
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn()
                .mockResolvedValueOnce({ id: 1, irrigationId: 2 }) 
                .mockResolvedValueOnce({ value: valueConfigSensor });

            knex.mockImplementation(() => {
                return {
                    select: selectKnexMock,
                    where: whereKnexMock,
                    first: firstKnexMock,
                };
            });
        })

        it("should send a mqtt message when garden's humidity is lower than the received one", async () => {
            const data = "1111111111,20";
            const decompData = data.split(",")

            mqttService.extractValuesFromString = jest.fn().mockReturnValue({ identificador:decompData[0], valorUmidade:decompData[1] });
        
            await mqttService.checkAndSendIrrigationMessage(data, mqttClientMock);
            
            // asserts
            expect(decompData.length).toBe(2);
            expect(mqttService.extractValuesFromString).toHaveBeenCalledWith(data);
            expect(parseFloatSpy).toHaveBeenCalledWith(decompData[1]);
            expect(parseFloatSpy).toHaveBeenCalledWith(valueConfigSensor);
            expect(knex).toHaveBeenCalledTimes(3);
            expect(parseFloat(decompData[1])).toBeLessThan(parseFloat(valueConfigSensor));
            expect(consoleErrorSpy).not.toHaveBeenCalled();
            expect(publishMQTT).toHaveBeenCalledWith(
                topicMQTTName,
                `"${decompData[0]}"`, 
                { qos: qosMQTT }, 
                expect.any(Function)
            );
        }); 

        it("should do nothing when garden's humidity is higher than the received one", async () => {
            const data = "1111111111,99";
            const decompData = data.split(",")

            mqttService.extractValuesFromString = jest.fn().mockReturnValue({ identificador:decompData[0], valorUmidade:decompData[1] });
        
            await mqttService.checkAndSendIrrigationMessage(data, mqttClientMock);
        
            // asserts
            expect(decompData.length).toBe(2);
            expect(mqttService.extractValuesFromString).toHaveBeenCalledWith(data)
            expect(parseFloatSpy).toHaveBeenCalledWith(decompData[1]);
            expect(parseFloatSpy).toHaveBeenCalledWith(valueConfigSensor);
            expect(knex).toHaveBeenCalledTimes(3);
            expect(publishMQTT).not.toHaveBeenCalled()
            expect(parseFloat(decompData[1])).toBeGreaterThan(parseFloat(valueConfigSensor));
        });

        it("should throw an error when recivied identifier does not belong to any garden", async () => {
            const data = "1111111111,20";
            const decompData = data.split(",");

            mqttService.extractValuesFromString = jest.fn().mockReturnValue({ identificador:decompData[0], valorUmidade:decompData[1] });

            // mocking knex failure
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn()
                .mockResolvedValueOnce(null) 
                .mockResolvedValueOnce({ value: valueConfigSensor });

            knex.mockImplementation(() => {
                return {
                    select: selectKnexMock,
                    where: whereKnexMock,
                    first: firstKnexMock,
                };
            });
        
            // asserts
            await expect(mqttService.checkAndSendIrrigationMessage(data, mqttClientMock))
                .rejects.toThrow(expect.any(Error));
            expect(decompData.length).toBe(2);
            expect(mqttService.extractValuesFromString).toHaveBeenCalledWith(data);
            expect(knex).toHaveBeenCalledTimes(1);
            expect(publishMQTT).not.toHaveBeenCalled()
            expect(parseFloatSpy).not.toHaveBeenCalled();
        });

        it("should throw an error when sensor confiuration is not found", async () => {
            const data = "1111111111,20";
            const decompData = data.split(",")

            mqttService.extractValuesFromString = jest.fn().mockReturnValue({ identificador:decompData[0], valorUmidade:decompData[1] });

            // mocking failure knex
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn()
                .mockResolvedValueOnce({ id: 1, irrigationId: 2 }) 
                .mockResolvedValueOnce(null);

            knex.mockImplementation(() => {
                return {
                    select: selectKnexMock,
                    where: whereKnexMock,
                    first: firstKnexMock,
                };
            });
        
            // asserts
            await expect(mqttService.checkAndSendIrrigationMessage(data, mqttClientMock))
                .rejects.toThrow(expect.any(Error));
            expect(decompData.length).toBe(2);
            expect(mqttService.extractValuesFromString).toHaveBeenCalledWith(data)
            expect(knex).toHaveBeenCalledTimes(3);
            expect(publishMQTT).not.toHaveBeenCalled()
            expect(parseFloatSpy).not.toHaveBeenCalled();
        });

        it("should log an error message when mqtt publish fails", async () => {
            const data = "1111111111,20"
            const decompData = data.split(",")

            mqttService.extractValuesFromString = jest.fn().mockReturnValue({ identificador:decompData[0], valorUmidade:decompData[1] });
    
            // mocking mqtt failure
            const publishMQTT = jest.fn((topic, payload, options, callback) => {
                callback(new Error('Simulated error while publish message'));
            });
            const mqttClientMock = {
                publish: publishMQTT
            };
        
            await mqttService.checkAndSendIrrigationMessage(data, mqttClientMock);
            
            // asserts
            expect(mqttService.extractValuesFromString).toHaveBeenCalledWith(data);
            expect(parseFloatSpy).toHaveBeenCalledTimes(2);
            expect(parseFloatSpy).toHaveBeenCalledWith(decompData[1]);
            expect(parseFloatSpy).toHaveBeenCalledWith(valueConfigSensor);
            expect(knex).toHaveBeenCalledTimes(3);
            expect(parseFloat(decompData[1])).toBeLessThan(parseFloat(valueConfigSensor));
            expect(consoleErrorSpy).toHaveBeenCalled();
            expect(publishMQTT).toHaveBeenCalledWith(
                topicMQTTName,
                `"${decompData[0]}"`, 
                { qos: qosMQTT }, 
                expect.any(Function)
            );
        });
    });        
});
