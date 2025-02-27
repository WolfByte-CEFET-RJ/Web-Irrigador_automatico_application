const measurementService = require('../../src/services/measurementService'); // Substitua pelo caminho correto
const knex = require('../../src/database/index.js');
const { UnauthorizedGardenReturn } = require('../../src/errors/gardenError.js');
const { SensorConfigurationNotFound } = require('../../src/errors/measurementError');
const irrigationSettingService = require("../../src/services/irrigationSettingService");

jest.mock('../../src/database');
jest.mock('../../src/services/irrigationSettingService');

describe("Measurement Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe("Last Measures", () => {
        it("Should return all last measures of a garden", async () => {
            const userId = 1;
            const gardenUserId = 1;
            const gardenIrrigationId = 1;
            const gardenId = 1;
            const sensors = [{ id: 1 }];
            const lastMeasures = { gardenId, sensorId: 1, measurement: 30, date: '2024-08-24' }

            knex.mockImplementation((table) => {
                if(table==="sensor"){
                    return {
                        select: jest.fn().mockResolvedValue(sensors)
                    }
                }
                else{ 
                    return {
                        select: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        orderBy: jest.fn().mockReturnThis(),
                        first: jest.fn().mockResolvedValueOnce(lastMeasures)
                    }
                }
            });

            measurementService.returnConfigValues = jest.fn().mockResolvedValue({configHumidityValue: 50});

            const result = await measurementService.lastMeasures(userId, gardenUserId, gardenIrrigationId, gardenId);

            expect(result).toEqual([
                lastMeasures,
                { message: 'Nível de umidade baixo. Sua planta precisa ser irrigada!' }
            ]);
        });

        it("should throw UnauthorizedGardenReturn if userId does not match gardenUserId", async () => {
            const userId = 1;
            const gardenUserId = 2;
            const gardenIrrigationId = 1;
            const gardenId = 1;

            await expect(measurementService.lastMeasures(userId, gardenUserId, gardenIrrigationId, gardenId))
                .rejects
                .toThrow(UnauthorizedGardenReturn);
        });
    });

    describe('lastMeasuresAllGardens', () => {
        it('should return last measurements for all gardens', async () => {
            const gardens = [
                { id: 1, irrigationId: 1, description: "mock 1", name:"mock 1", userId: 1 }, 
                { id: 2, irrigationId: 2, description: "mock 2", name: "mock 2", userId: 2 }
            ];
            const sensors = [{ id: 1 }, { id: 2 }];
            const measurements = [
                { gardenId: 1, sensorId: 1, measurement: 30, date: '2024-08-24' },
                { gardenId: 2, sensorId: 2, measurement: 50, date: '2024-08-24' }
            ];
            const irrigationSetting = { name: 'Default' };

            let counter = -1;
            const firstValueKnex = [
                measurements[0],
                undefined,
                measurements[1],
                undefined
            ]
    
            // Mocks
            knex.mockImplementation((table) => {
                if(table=="sensor"){
                    return {
                        select: jest.fn().mockResolvedValue(sensors)
                    }
                } else { 
                    counter++ // utilizando contador para controlar retorno, pois mockResolvedValueOnce não funcionou
                    return{
                        select: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        orderBy: jest.fn().mockReturnThis(),
                        first: jest.fn().mockResolvedValue(firstValueKnex[counter])
                }}
            });

            measurementService.returnConfigValues = jest.fn().mockResolvedValue({configHumidityValue: 50});
    
            irrigationSettingService.getOneSetting.mockResolvedValue(irrigationSetting);
    
            const result = await measurementService.lastMeasuresAllGardens(gardens);
    
            expect(result).toEqual([
                {
                    id: gardens[0].id,
                    name: gardens[0].name,
                    description: gardens[0].description,
                    irrigationId: gardens[0].irrigationId,
                    userId: gardens[0].userId,
                    lastMeasures: [measurements[0]],
                    message: 'Nível de umidade baixo. Sua planta precisa ser irrigada!',
                    settingName: 'Default'
                },
                {
                    id: gardens[1].id,
                    name: gardens[1].name,
                    description: gardens[1].description,
                    irrigationId: gardens[1].irrigationId,
                    userId: gardens[1].userId,
                    lastMeasures: [measurements[1]],
                    message: 'Tudo certo!',
                    settingName: 'Default'
                }
            ]);
        });
    
        it('should return an empty array if no measurements are found', async () => {
            const gardens = [{ id: 1, irrigationId: 1, userId: 1 }];
    
            // Mocks
            knex.mockImplementation(() => ({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                first: jest.fn()
                    .mockResolvedValueOnce([]) // Mock para sensores vazios
                    .mockResolvedValue(null) // Mock para não encontrar nenhuma medida
            }));
    
            const result = await measurementService.lastMeasuresAllGardens(gardens);
    
            expect(result).toEqual([
                {
                    id: 1,
                    irrigationId: 1,
                    userId: 1,
                    lastMeasures: []
                }
            ]);
        });
    
        it('should propagate throwed errors', async () => {
            const gardens = [{ id: 1, irrigationId: 1, userId: 1 }];

            knex.mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            await expect(measurementService.lastMeasuresAllGardens(gardens)).rejects.toThrow('Database error');
        });
    });
});