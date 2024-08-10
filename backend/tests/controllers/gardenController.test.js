const gardenController = require("../../src/controllers/gardenController");
const gardenService = require("../../src/services/gardenService");
const { HttpCode, HttpError } = require("../../src/utils/app.error");
const { ValidationError } = require('yup');

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
    });

    describe("createGarden", () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: {
                    name: "Alface",
                    description: "Minha horta de alface",
                    identifier: "2024030801"
                },
                user_id: 1
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it("should create a garden and return a success message with status CREATED", async () => {
            gardenService.createGarden.mockResolvedValue("Horta cadastrada!");

            await gardenController.createGarden(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
            expect(res.json).toHaveBeenCalledWith({ message: "Horta cadastrada!" });
        });

        it("should return a ValidationError with status BAD REQUEST", async () => {
            const validationError = new ValidationError("Erro de validação");

            gardenService.createGarden.mockRejectedValue(validationError);

            await gardenController.createGarden(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ message: validationError.message });
        });

        it("should return a HttpError with the corresponding status code", async () => {
            const httpError = new HttpError({ httpCode: -1, type: 'ERR_MOCKED', message: 'Erro HTTP' });

            gardenService.createGarden.mockRejectedValue(httpError);

            await gardenController.createGarden(req, res);

            expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
            expect(res.json).toHaveBeenCalledWith(httpError);
        });

        it("should return an error message with status INTERNAL SERVER ERROR", async () => {
            const error = new Error("Erro interno");

            gardenService.createGarden.mockRejectedValue(error);

            await gardenController.createGarden(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });

    describe("Get User Gardens", () => {
        it("should return a list of gardens with status OK", async () => {
            //mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const user_gardens = [
                { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 },
                { id: 1, name: "Tomate", description: "Minha horta de tomate", identifier: "2024030802", userId: 2, irrigationId: 2 }
            ]

            gardenService.getUserGardens.mockResolvedValue(user_gardens)

            //execução
            await gardenController.getUserGardens(req, res)

            //asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith(user_gardens);
        })

        it('should return a previst http error', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
            gardenService.getUserGardens.mockRejectedValue(httpError);

            // execução
            await gardenController.getUserGardens(req, res);
        
            // asserts
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode)
            expect(res.json).toHaveBeenCalledWith(httpError)
        });

        it('should return an error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = new Error("mocked message")
            gardenService.getUserGardens.mockRejectedValue(error)
            
            // execução
            await gardenController.getUserGardens(req, res)
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR)
            expect(res.json).toHaveBeenCalledWith({ message: error.message })
        });
    })
    
})