const measurementService = require("../../../src/services/measurementService");
const knex = require('../../../src/database');
const { SensorConfigurationNotFound } = require("../../../src/errors/measurementError");

jest.mock('../../../src/database');

describe("Measurement Utils", ()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
    describe("Return Config Values", ()=>{
        let irrigation_id = 1;
        let mock_config_value = "50"

        it("should return configuration values of sensor related to the given irrigation", async()=>{
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue({value:mock_config_value}); //valor da configuração do sensor relacionado
            
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
            }));

            const result = await measurementService.returnConfigValues(irrigation_id);
            expect(result).toEqual({ configHumidityValue: mock_config_value });
        });
        
        it("should return an error when sensor config value is not found", async()=>{
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);
            
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
            }));

            await expect(measurementService.returnConfigValues(irrigation_id)).rejects.toThrow(new SensorConfigurationNotFound());
        });
    
    });

    describe("Verify Measurement", ()=>{

        beforeEach(() => {             
            jest.spyOn(global, 'parseFloat');
        });
        it("Should return a OK message if humidity is lower than config value", async ()=>{
            const humidityValue = "10";
            const configHumidityValue = "50";

            const message = await measurementService.verifyMeasurements(humidityValue, configHumidityValue);

            expect(parseFloat).toHaveBeenCalledTimes(2);
            expect(parseFloat).toHaveBeenCalledWith(humidityValue);
            expect(parseFloat).toHaveBeenCalledWith(configHumidityValue);
            expect(message).toEqual("Nível de umidade baixo. Sua planta precisa ser irrigada!");
        });

        it("Should return a BAD message if humidity is bigger than config value", async ()=>{
            const humidityValue = "60";
            const configHumidityValue = "40";

            const message = await measurementService.verifyMeasurements(humidityValue, configHumidityValue);

            expect(parseFloat).toHaveBeenCalledTimes(2);
            expect(parseFloat).toHaveBeenCalledWith(humidityValue);
            expect(parseFloat).toHaveBeenCalledWith(configHumidityValue);
            expect(message).toEqual("Tudo certo!");
        });

    })
})