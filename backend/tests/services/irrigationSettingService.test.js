const { ValidationError } = require("yup");
const knex = require("../../src/database");
const { IrrigationSettingNotFound, UnauthorizedIrrigationSettingOperation, DuplicatedIrrigatonSettingName, DefaultSettingNotEditable, NoValuePassed, UserIdNotEditable, InvalidUpdateFields, IrrigationSettingAlreadyExists, UpdateUmidityValueError, InvalidHumidity } = require("../../src/errors/irrigationSettingError");
const irrigationSettingService = require("../../src/services/irrigationSettingService");

jest.mock('../../src/database');

describe("Irrigation Settings Service", ()=>{
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All or One Setting", ()=>{
        describe("Get All Settings", ()=>{
            let settings_from_database, formatted_setting;

            beforeEach(()=>{
                //mocking perfect scenario

                settings_from_database = [
                    { id: 1, name: 'Configuração 0', userId: null, sensors: '[{"sensorId": 1, "value": "50"}]' },
                    { id: 2, name: 'Configuração 1', userId: 1, sensors: '[{"sensorId": 1, "value": "40"}]' },
                    { id: 3, name: 'Configuração 2', userId: 2, sensors: '[{"sensorId": 2, "value": "60"}]' }
                ];
                
                formatted_setting = [ // junção com returnConfigSensors
                    { id: 1, name: 'Configuração 0', userId: null, Umidade: "50" },
                    { id: 2, name: 'Configuração 1', userId: 1, Umidade: "40" },
                    { id: 3, name: 'Configuração 2', userId: 2, Umidade: "60" }
                ];

                const selectKnexMock = jest.fn().mockReturnThis();
                const joinKnexMock = jest.fn().mockReturnThis();
                const groupByKnexMock = jest.fn().mockReturnThis();
                const orderByKnexMock = jest.fn().mockResolvedValue(settings_from_database);
            
                knex.mockImplementation(() => ({
                    select: selectKnexMock,
                    join: joinKnexMock,
                    groupBy: groupByKnexMock,
                    orderBy: orderByKnexMock,
                }));

                irrigationSettingService.returnConfigSensors = jest.fn().mockResolvedValue(
                    [{ Umidade :"50" }, { Umidade: "40" }, { Umidade: "60" }]);
            })

            it("should return all irrigation settings data", async () => {                
                // execução
                const response = await irrigationSettingService.getSettings();
                
                //asserts
                expect(response).toEqual(formatted_setting);
                expect(knex).toHaveBeenCalledTimes(1);
            });

            it("should propagate throwed sub-errors", async () => {
                // mocking
                const erro = new Error("unexpected error")
                irrigationSettingService.returnConfigSensors = jest.fn().mockRejectedValue(erro)
                
                // execução e asserts
                await expect(irrigationSettingService.getSettings()).rejects.toThrow(erro);

            });
        });

        describe("Get One Setting", ()=>{

            let setting_id, user_id, final_setting;
            let setting_knex;
            beforeEach(()=>{
                setting_id = 1;
                user_id = 1;

                setting_knex = [{ id: setting_id, name: "mocked setting", userId: user_id, value: "50", sendorId: 1 }];
                const sensor_knex = {name: "Umidade"}
                final_setting = { id: setting_id, name: "mocked setting", userId: user_id, Umidade: "50"};


                const selectKnexMock = jest.fn().mockReturnThis();
                const joinKnexMock = jest.fn().mockReturnThis();
                const firstKnexMock = jest.fn().mockResolvedValue(sensor_knex);
                const whereKnexMock = jest.fn()
                    .mockImplementationOnce(() => setting_knex)
                    .mockReturnThis();
                

                knex.mockImplementation((table) => {
                    if (table === 'irrigationSetting') {
                        return {
                            select: selectKnexMock,
                            where: whereKnexMock,
                            join: joinKnexMock
                        };
                    } else if (table === 'sensor') {
                        return {
                            select: selectKnexMock,
                            where: whereKnexMock,
                            first: firstKnexMock
                        };
                    } 
                    else return {};
                });
            });

            it("should return one required irrigation setting", async ()=>{
                const response = await irrigationSettingService.getOneSetting(setting_id, user_id);
                expect(response).toStrictEqual(final_setting);
            })

            it("should return an error when required irrigation setting not exists", async ()=>{
                setting_knex = [];
                await expect(irrigationSettingService.getOneSetting(setting_id, user_id)).rejects.toThrow(new IrrigationSettingNotFound());
            })

            it("should return an error when required irrigation don't belongs to user (and is not the default)", async ()=>{
                setting_knex[0].userId = -1;
                setting_knex[0].id = -1;

                await expect(irrigationSettingService.getOneSetting(setting_id, user_id)).rejects.toThrow(new UnauthorizedIrrigationSettingOperation());
            })
        })
    });

    describe("Create Irrigation Setting", () => {
        it("should create a new irrigation setting", async () => {
            const mockSetting = { name: 'Configuração 1', userId: 1, humidityValue: '50' };
            const { name, userId, humidityValue } = mockSetting;
            
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn()
                .mockResolvedValueOnce(null) 
                .mockResolvedValueOnce({ id: 1 });  
            const insertKnexMock = jest.fn().mockResolvedValue([1]); 

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                insert: insertKnexMock
            }));

            const result = await irrigationSettingService.createIrrigationSetting(name, userId, humidityValue);

            expect(result).toBe("Configuração cadastrada!");
            expect(knex).toHaveBeenCalledWith('irrigationSetting');
            expect(selectKnexMock).toHaveBeenCalledWith('id');
            expect(whereKnexMock).toHaveBeenCalledWith({ name, userId });
            expect(firstKnexMock).toHaveBeenCalled();
            expect(insertKnexMock).toHaveBeenCalledWith({ name, userId });
        });

        it("should throw DuplicatedIrrigatonSettingName", async () => {
            const mockSetting = { name: 'Configuração 1', userId: 1, humidityValue: '50' };
            const { name, userId, humidityValue } = mockSetting;
        
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue({ id: 1 }); 
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));
        
            await expect(irrigationSettingService.createIrrigationSetting(name, userId, humidityValue))
                .rejects.toThrow(DuplicatedIrrigatonSettingName);
    
            expect(knex).toHaveBeenCalledWith('irrigationSetting');
            expect(selectKnexMock).toHaveBeenCalledWith('id');
            expect(whereKnexMock).toHaveBeenCalledWith({ name, userId });
            expect(firstKnexMock).toHaveBeenCalled();
        });

        it("should propagate error if knex insert fails", async () => {
            const mockSetting = { name: 'Configuração 1', userId: 1, humidityValue: '50' };
            const { name, userId, humidityValue } = mockSetting;
        
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);
            const insertKnexMock = jest.fn().mockRejectedValue(new Error("Database insert failed"));
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                insert: insertKnexMock
            }));
        
            irrigationSettingService.validadeHumidityValue = jest.fn().mockReturnValue(true);
        
            await expect(irrigationSettingService.createIrrigationSetting(name, userId, humidityValue))
                .rejects.toThrow("Database insert failed");
        });
    })

    describe("Update Irrigation Setting", () =>{
        let setting_id, user_id;
        let data = {};
        let updateKnexMock, firstKnexMock;
        
        beforeEach(()=>{
            //mocking perfect scenario
            setting_id = 2;
            user_id = 1;
            data = {
                name: "new name",
                humidityValue: "55"
            }

            const setting = { id: setting_id, name: "mocked current setting", userId: user_id, Umidade: "50"}
            irrigationSettingService.getOneSetting = jest.fn().mockResolvedValue(setting);

            irrigationSettingService.validadeHumidityValue = jest.fn().mockReturnValue(true);

            irrigationSettingService.verifyUpdateData = jest.fn().mockReturnValue(true);

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            firstKnexMock = jest.fn().mockResolvedValue(null); 
            updateKnexMock = jest.fn()
                .mockResolvedValueOnce([1]) 
                .mockResolvedValueOnce([1]) 

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                update: updateKnexMock
            }));
        })

        it("should update an irrigation setting successfully and return an OK message", async ()=>{
            const message = await irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data);

            expect(message).toBe("Configuração atualizada com sucesso!");
            expect(knex).toHaveBeenCalledTimes(3);
        });

        it("should return an error when tries to update the default setting", async ()=>{
            setting_id = 1;
            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new DefaultSettingNotEditable);
        });
        
        it("should return an error when tries to update a setting which not belongs to user", async ()=>{
            user_id = -1;
            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new UnauthorizedIrrigationSettingOperation);
        });

        it("should return an error when the parameter data object is empty", async ()=>{
            data = {};
            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new NoValuePassed);
        });

        it("should return an error when the parameter data object contains a new userId", async ()=>{
            data.userId = 999;
            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new UserIdNotEditable);
        });

        it("should return an error when data filds are invalid", async ()=>{
            irrigationSettingService.verifyUpdateData = jest.fn().mockReturnValue(false);

            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new InvalidUpdateFields);
        });

        it("should return an error when new irrigation name alredy exists", async ()=>{
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            firstKnexMock = jest.fn().mockResolvedValue({id: 3}) 
            updateKnexMock = jest.fn()
                .mockResolvedValueOnce([1]) 
                .mockResolvedValueOnce([1]) 

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                update: updateKnexMock
            }));

            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new IrrigationSettingAlreadyExists);
        });

        it("should return an error when update fails at finding the searched irrigation in database", async ()=>{
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            firstKnexMock = jest.fn().mockResolvedValue(null) 
            updateKnexMock = jest.fn()
                .mockResolvedValueOnce(null) 
                .mockResolvedValueOnce([1]) 

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                update: updateKnexMock
            }));

            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new IrrigationSettingNotFound);
        });

        it("should return an error when new humidity value are invalid", async ()=>{
            irrigationSettingService.validadeHumidityValue = jest.fn().mockReturnValue(false);

            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new InvalidHumidity);
        });

        it("should return an error when update fails at changing irrigation humidity in database", async ()=>{
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            firstKnexMock = jest.fn().mockResolvedValue(null) 
            updateKnexMock = jest.fn()
                .mockResolvedValueOnce([1]) 
                .mockResolvedValueOnce(null) 

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                update: updateKnexMock
            }));

            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new UpdateUmidityValueError);
        });
        
        it("should call database less when new name is not informed", async ()=>{
            data.name = undefined;
            
            const message = await irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data);

            expect(message).toBe("Configuração atualizada com sucesso!");
            expect(knex).toHaveBeenCalledTimes(1);
        });

        it("should call database less when new humidity value is not informed", async ()=>{
            data.humidityValue = undefined;
            
            const message = await irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data);

            expect(message).toBe("Configuração atualizada com sucesso!");
            expect(knex).toHaveBeenCalledTimes(2);
        });

        it("should return an Validation Error when new irrigation's new name is not in correct format", async ()=>{
            data.name = "a";
            await expect(irrigationSettingService.updateIrrigationSetting(user_id, setting_id, data)).rejects.toThrow(new ValidationError("O nome deve ter pelo menos 3 caracteres"));
        });

    });

    describe("Delete Irrigation Setting", () => {
        let setting_id, user_id;
    
        beforeEach(() => {
            setting_id = 1;
            user_id = 1;
    
            // Mock do Knex
            const deleteKnexMock = jest.fn().mockResolvedValue(1); // mock para deletar a configuração
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue({ id: setting_id, userId: user_id });
    
            knex.mockImplementation((table) => {
                if (table === 'irrigationSetting') {
                    return {
                        select: selectKnexMock,
                        where: whereKnexMock,
                        first: firstKnexMock,
                        delete: deleteKnexMock,
                    };
                } else if (table === 'garden') {
                    return { select: selectKnexMock, where: whereKnexMock }; // mocking for inUse check
                } 
                return {};
            });
        });
    
        it("should delete the irrigation setting successfully", async () => {
            const message = await irrigationSettingService.deleteIrrigationSetting(setting_id, user_id);
            expect(message).toBe("Configuração de irrigação deletada com sucesso!");
            expect(knex).toHaveBeenCalledWith('irrigationSetting');
            expect(knex).toHaveBeenCalledTimes(2);
        });
    
        it("should throw an error if the irrigation setting is not found", async () => {
            knex.mockImplementationOnce(() => ({ first: jest.fn().mockResolvedValue(null) }));
            await expect(irrigationSettingService.deleteIrrigationSetting(setting_id, user_id))
                .rejects
                .toThrow(new IrrigationSettingNotFound());
        });
    
        it("should throw an error if the user tries to delete a setting they do not own", async () => {
            knex.mockImplementationOnce(() => ({ first: jest.fn().mockResolvedValue({ id: setting_id, userId: -1 }) }));
            await expect(irrigationSettingService.deleteIrrigationSetting(setting_id, user_id))
                .rejects
                .toThrow(new UnauthorizedIrrigationSettingOperation());
        });
    
        it("should throw an error if the setting is in use by a garden", async () => {
            knex.mockImplementationOnce((table) => {
                if (table === 'garden') {
                    return { select: jest.fn().mockResolvedValue([{ id: 1 }]) }; // mock para garden em uso
                }
                return {};
            });
            await expect(irrigationSettingService.deleteIrrigationSetting(setting_id, user_id))
                .rejects
                .toThrow(new Error("Essa configuração de irrigação está em uso por um jardim"));
        });
    
        it("should propagate database errors", async () => {
            knex.mockImplementationOnce(() => ({ delete: jest.fn().mockRejectedValue(new Error("Database Error")) }));
            await expect(irrigationSettingService.deleteIrrigationSetting(setting_id, user_id))
                .rejects
                .toThrow("Database Error");
        });
    });    
});