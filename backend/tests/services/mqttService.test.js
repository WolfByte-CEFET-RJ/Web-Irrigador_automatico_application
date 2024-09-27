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
});
