const irrigationSetting = require("../../../src/services/irrigationSettingService");
const knex = require('../../../src/database');

jest.mock('../../../src/database');

describe("Irrigation Setting Utils", ()=>{
    describe("Verify Update Data", () => {
        it("should return true if all expected fields exist in parameter object", () => {
            const data = { name: undefined, humidityValue: undefined };
            const response = irrigationSetting.verifyUpdateData(data);
    
            expect(response).toBe(true); 
        });
    
        it("should return true if just name field exist in parameter object", () => {
            const data = { name: undefined };
            const response = irrigationSetting.verifyUpdateData(data);
    
            expect(response).toBe(true);
        });
    
        it("should return true if just humidityValue field exist in parameter object", () => {
            const data = { humidityValue: undefined };
            const response = irrigationSetting.verifyUpdateData(data);
    
            expect(response).toBe(true);
        });
    
        it("should return false if an extra unexpected field exists in parameter object", () => {
            const data = { name: undefined, humidityValue: undefined, extraField: undefined };
            const response = irrigationSetting.verifyUpdateData(data);
    
            expect(response).toBe(false);
        });
    });

    describe("Validade Humity Value", ()=>{
        it("should return true if humidity match regex (0-9 characters only)", ()=>{
            const response = irrigationSetting.validadeHumidityValue("1234567890");
            expect(response).toBe(true);
        })

        it("should return true if humidity doues not match regex (0-9 characters only)", ()=>{
            const response = irrigationSetting.validadeHumidityValue("1234567890aAZ!@");
            expect(response).toBe(false);
        })
    });

    describe("Return Config Sensors", ()=>{
        let settings_array=[], sensors_config=[];

        beforeEach(()=>{
            //mocking perfect scenario
            settings_array = [
                { id: 1, name: 'Configuração 0', userId: null, sensors: '[{"sensorId": 1, "value": "50"}]' },
                { id: 2, name: 'Configuração 1', userId: 1, sensors: '[{"sensorId": 1, "value": "40"}]' },
                { id: 3, name: 'Configuração 2', userId: 2, sensors: '[{"sensorId": 2, "value": "60"}]' }
            ];

            sensors_config = [
                { Umidade: "50" },
                { Umidade: "40" },
                { Umidade: "60" }
            ]

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn()
                .mockResolvedValueOnce({name:"Umidade"})
                .mockResolvedValueOnce({name:"Umidade"})
                .mockResolvedValueOnce({name:"Umidade"})
                .mockResolvedValueOnce(null); 
            
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
            }));

            jest.spyOn(JSON, 'parse');
        });

        afterEach(()=>{
            jest.clearAllMocks();
        })

        it("should return an array of objects with the name os each sensor correspondent to a given array of settings", async()=>{
             const response = await irrigationSetting.returnConfigSensors(settings_array);

             expect(response).toStrictEqual(sensors_config);
             for(let i=0;i<settings_array.length;i++){
                 expect(JSON.parse).toHaveBeenCalledWith(settings_array[i].sensors);
             }
        });

        it("should return an empty array if parameter array is empty", async()=>{
            settings_array = []
            const response = await irrigationSetting.returnConfigSensors(settings_array);

            expect(response).toStrictEqual([]);
            expect(knex).toHaveBeenCalledTimes(0);
       });
    })
})