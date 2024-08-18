const gardenController = require("../../src/controllers/gardenController");
const gardenService = require("../../src/services/gardenService");
const measurementService = require("../../src/services/measurementService");
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

    describe("Update Garden", () => {
        it("should update an existing garden and return 200 status code", async () => {
            const mockGardenId = 1;
            const mockUserId = 1;
            const mock_garden = {
                name: "Alface",
                description: "Minha horta de alface",
                identifier: "2024030801",
                irrigationId: 1
            };

            const req = {
                params: { id: mockGardenId },
                user_id: mockUserId,
                body: {
                    name: mock_garden.name,
                    description: mock_garden.description,
                    identifier: mock_garden.identifier,
                    irrigationId: mock_garden.irrigationId
                }
            };

            const res = {
                json: jest.fn().mockReturnThis()
            };

            gardenService.updateGarden.mockResolvedValue("Horta atualizada com sucesso!")
            await gardenController.updateGarden(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: "Horta atualizada com sucesso!" });
            expect(gardenService.updateGarden).toHaveBeenCalledWith(mockUserId, mockGardenId, mock_garden);
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
            gardenService.updateGarden.mockRejectedValue(error);

            await gardenController.updateGarden(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        })
    })

    describe("Delete Gardens", () => {
        it("should return a list of gardens with status OK", async () => {
            //mocking
            const req = { params: {user_id: 1} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const delete_message = "Horta deletada com sucesso"
            gardenService.deleteGarden.mockResolvedValue(delete_message)

            //execução
            await gardenController.deleteGarden(req, res)

            //asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith({message: delete_message});
        })

        it('should return a previst http error', async () => {
            // mocking
            const req = { params: {user_id: 1} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
            gardenService.deleteGarden.mockRejectedValue(httpError)

            //execução
            await gardenController.deleteGarden(req, res)
        
            // asserts
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode)
            expect(res.json).toHaveBeenCalledWith(httpError)
        });

        it('should return an error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = { params: {user_id: 1} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = new Error("mocked message")
            gardenService.deleteGarden.mockRejectedValue(error)
            
            //execução
            await gardenController.deleteGarden(req, res)
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR)
            expect(res.json).toHaveBeenCalledWith({ message: error.message })
        });
    })

    describe("getMeasuresAllGardens", () => {
        let req, res, next;
        let getUserGardensMock, lastMeasuresAllGardensMock;
    
        beforeEach(() => {
            req = {
                user_id: 1
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
    
            // Mock dos serviços
            getUserGardensMock = jest.fn();
            lastMeasuresAllGardensMock = jest.fn();
    
            gardenService.getUserGardens = getUserGardensMock;
            measurementService.lastMeasuresAllGardens = lastMeasuresAllGardensMock;
        });
    
        it("should return measurements for all gardens", async () => {
            const mockGardens = [{ id: 1 }, { id: 2 }];
            const mockMeasurements = [{ gardenId: 1, temp: 25 }, { gardenId: 2, temp: 26 }];
    
            getUserGardensMock.mockResolvedValue(mockGardens);
            lastMeasuresAllGardensMock.mockResolvedValue(mockMeasurements);
    
            await gardenController.getMeasuresAllGardens(req, res, next);
    
            expect(getUserGardensMock).toHaveBeenCalledWith(req.user_id);
            expect(lastMeasuresAllGardensMock).toHaveBeenCalledWith(mockGardens);
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith(mockMeasurements);
        });
    
        it("should handle HttpError and return the appropriate status and message", async () => {
            const error = new HttpError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                type: 'UnauthorizedError', 
                message: 'Unauthorized access' 
            });
    
            getUserGardensMock.mockRejectedValue(error);
    
            await gardenController.getMeasuresAllGardens(req, res);
    
            expect(getUserGardensMock).toHaveBeenCalledWith(req.user_id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    
        it("should handle unexpected errors and return 500 status", async () => {
            const error = new Error("Unexpected error");
    
            getUserGardensMock.mockRejectedValue(error);
    
            await gardenController.getMeasuresAllGardens(req, res, next);
    
            expect(getUserGardensMock).toHaveBeenCalledWith(req.user_id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });    

    describe("getMeasuresGarden", () => {
        let req, res;
        let getOneGardenMock, lastMeasuresMock;
    
        beforeEach(() => {
            req = {
                params: { id: 1 },
                user_id: 1
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            getOneGardenMock = jest.fn();
            lastMeasuresMock = jest.fn();
    
            gardenService.getOneGarden = getOneGardenMock;
            measurementService.lastMeasures = lastMeasuresMock;
        });
    
        it("should return measurements for one garden", async () => {
            const mockGarden = { id: 1, userId: 1, irrigationId: 2 };
            const mockMeasurements = [{ gardenId: 1, temp: 25 }, { gardenId: 1, temp: 26 }];
        
            getOneGardenMock.mockResolvedValue(mockGarden);
            lastMeasuresMock.mockResolvedValue(mockMeasurements);
        
            await gardenController.getMeasuresGarden(req, res);
        
            expect(getOneGardenMock).toHaveBeenCalledWith(req.params.id, req.user_id);
            expect(lastMeasuresMock).toHaveBeenCalledWith(req.user_id, mockGarden.userId, mockGarden.irrigationId, req.params.id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith({
                ...mockGarden,
                lastMeasures: mockMeasurements
            });
        });

        it("should handle HttpError and return the appropriate status and message", async () => {
            const error = new HttpError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                type: 'UnauthorizedError', 
                message: 'Unauthorized access' 
            });
    
            getOneGardenMock.mockRejectedValue(error);
    
            await gardenController.getMeasuresGarden(req, res);
    
            expect(getOneGardenMock).toHaveBeenCalledWith(req.params.id, req.user_id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    
        it("should handle unexpected errors and return 500 status", async () => {
            const error = new Error("Unexpected error");
    
            getOneGardenMock.mockRejectedValue(error);
    
            await gardenController.getMeasuresGarden(req, res);
    
            expect(getOneGardenMock).toHaveBeenCalledWith(req.params.id, req.user_id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
    
})
