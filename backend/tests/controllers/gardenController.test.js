const gardenController = require("../../src/controllers/gardenController");
const gardenService = require("../../src/services/gardenService");
const { HttpCode, HttpError } = require("../../src/utils/app.error");

jest.mock("../../src/services/gardenService");

describe("Garden Controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All or One Gardens", () => {
        describe("Get All Gardens", () => {
            it("should return a list of gardens with status OK", async () => {
                const req = {
                    params: {}
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
    
                const gardens = [
                    { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 },
                    { id: 2, name: "Tomate", description: "Minha horta de tomate", identifier: "2024030802", userId: 2, irrigationId: 2 }
                ]
    
                gardenService.getAllGardens.mockResolvedValue(gardens);
    
                await gardenController.getGardens(req, res);
    
                expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
                expect(res.json).toHaveBeenCalledWith(gardens);
            })

            it("should return an error message with status INTERNAL SERVER ERROR", async () => {
                const req = {
                    params: {}
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }

                const error = new Error("mocked message");
                gardenService.getAllGardens.mockRejectedValue(error);
                
                await gardenController.getGardens(req, res);
                
                // asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
            })
        })

        describe("Get One Gardens", () => {
            it("should return a garden with status OK", async () => {
                const req = {
                    params: { id: 1 },
                    user_id: 1
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
    
                const garden = { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 }
                gardenService.getOneGarden.mockResolvedValue(garden);
                
                await gardenController.getGardens(req, res);
    
                expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
                expect(res.json).toHaveBeenCalledWith(garden);
            })

            it("should return a previst http error", async () => {
                const req = { 
                    params: { id: 1 },
                    user_id: 1 
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
    
                const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
                gardenService.getOneGarden.mockRejectedValue(httpError)
                
                // execução
                await gardenController.getGardens(req, res);
                
                // asserts
                expect(res.status).toHaveBeenCalledWith(httpError.httpCode)
                expect(res.json).toHaveBeenCalledWith(httpError)
            })

            it("should return an error message with status INTERNAL SERVER ERROR", async () => {
                const req = {
                    params: { id: 1 },
                    user_id: 1
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }

                const error = new Error("mocked message");
                gardenService.getOneGarden.mockRejectedValue(error);
                
                await gardenController.getGardens(req, res);
                
                // asserts
                expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
            })
        })
    })
})