const irrigationSettingController = require("../../src/controllers/irrigationSettingController");
const irrigationSettingService = require("../../src/services/irrigationSettingService");
const { HttpCode, HttpError } = require("../../src/utils/app.error");

jest.mock("../../src/services/irrigationSettingService");

describe("Irrigation Setting Controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All or One Irrigations Settings", ()=>{
        const setting_id = 1, user_id = 1;
        let req, res;

        describe("Get All Setting", ()=>{
            it("should return a list of all irrigations settings with status OK when ID is omited", async ()=>{
                //mocking
                req = {
                    params: { id: null, user_id: user_id }
                };
    
                res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
                
                const mocked_settings = [
                    { id: setting_id, name: "Mocked Setting", userId: user_id, Umidade: "50" }, 
                    { id: 999, name: "Other Mocked Setting", userId: 999, Umidade: "20" }
                ];
    
                irrigationSettingService.getSettings.mockResolvedValue(mocked_settings);
                
                //execução
                await irrigationSettingController.getSettings(req, res);
    
                //asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
                expect(res.json).toHaveBeenCalledWith(mocked_settings);
                expect(irrigationSettingService.getSettings).toHaveBeenCalled();
            });
    
            it('should return an error message with status INTERNAL SERVER ERROR', async () => {
                // mocking
                req = {
                    params: { id: null, user_id: user_id }
                };
    
                res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
                const error = new Error("mocked message");
                irrigationSettingService.getSettings.mockRejectedValue(error);
                
                //execução
                await irrigationSettingController.getSettings(req, res);
                
                // asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                expect(irrigationSettingService.getSettings).toHaveBeenCalled();
            });
            
        })

        describe("Get One Setting", ()=>{
            it("should return one specified irrigation setting with status OK when ID is provided", async ()=>{
                //mocking
                req = {
                    params: { id: setting_id, user_id: user_id }
                };
    
                res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
                
                const mocked_setting = { id: setting_id, name: "Mocked Setting", userId: user_id, Umidade: "50" };
                irrigationSettingService.getOneSetting.mockResolvedValue(mocked_setting);
                
                //execução
                await irrigationSettingController.getSettings(req, res);
    
                //asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
                expect(res.json).toHaveBeenCalledWith(mocked_setting);
                expect(irrigationSettingService.getOneSetting).toHaveBeenCalled();
            });

            it('should return a previst http error', async () => {
                // mocking
                req = {
                    params: { id: setting_id, user_id: user_id }
                };
    
                res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
                
                const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'});
                irrigationSettingService.getOneSetting.mockRejectedValue(httpError);
    
                //execução
                await irrigationSettingController.getSettings(req, res);
            
                // asserts
                expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
                expect(res.json).toHaveBeenCalledWith(httpError);
                expect(irrigationSettingService.getOneSetting).toHaveBeenCalled();
            });
    
            it('should return an error message with status INTERNAL SERVER ERROR', async () => {
                req = {
                    params: { id: setting_id, user_id: user_id }
                };
    
                res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
                
                const error = new Error("mocked message");
                irrigationSettingService.getOneSetting.mockRejectedValue(error);
    
                //execução
                await irrigationSettingController.getSettings(req, res);
            
                // asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                expect(irrigationSettingService.getOneSetting).toHaveBeenCalled();
            });
            
        });  
    });
});