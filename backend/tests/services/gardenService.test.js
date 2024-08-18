const gardenService = require("../../src/services/gardenService");
const knex = require('../../src/database');
const { GardenNotFound, UnauthorizedGardenReturn, NoGardenRegistered, UnauthorizedGardenUpdate, UnauthorizedUserIdUpdate } = require("../../src/errors/gardenError");
const { ValidationError } = require('yup');
const { IrrigationSettingNotFound, UnauthorizedIrrigationSettingOperation } = require("../../src/errors/irrigationSettingError");

jest.mock('../../src/database');

describe("Garden Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All or One Gardens", () => {
        describe("Get All Gardens", () => {
            it("should return all gardens from the database", async () => {
                const mock_gardens = [
                    { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 },
                    { id: 2, name: "Tomate", description: "Minha horta de tomate", identifier: "2024030802", userId: 2, irrigationId: 2 }
                ]

                const selectKnexMock = jest.fn().mockResolvedValue(mock_gardens)
                knex.mockImplementation(() => ({
                    select: selectKnexMock
                }));

                const gardens = await gardenService.getAllGardens()

                expect(gardens).toEqual(mock_gardens)
                expect(knex).toHaveBeenCalledWith("garden")
                expect(selectKnexMock).toHaveBeenCalledWith("*")
            })
        })

        describe("Get One Garden", () => {
            it("should return a garden when found", async () => {
                const mock_params = { id: 1, userId: 1 }
                const mock_garden = { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 }

                const whereKnexMock = jest.fn().mockReturnThis();
                const firstKnexMock = jest.fn().mockResolvedValue(mock_garden);

                knex.mockImplementation(() => ({
                    where: whereKnexMock,
                    first: firstKnexMock
                }));

                const garden = await gardenService.getOneGarden(mock_params.id, mock_params.userId);

                expect(garden).toEqual(mock_garden);
                expect(knex).toHaveBeenCalledWith("garden");
                expect(whereKnexMock).toHaveBeenCalledWith({ id: mock_garden.id });
                expect(firstKnexMock).toHaveBeenCalled();
            })

            it("should throw an error when garden not found", async () => {

                knex.mockImplementation(() => ({
                    where: jest.fn().mockReturnThis(),
                    first: jest.fn().mockResolvedValue(undefined)
                }));

                await expect(gardenService.getOneGarden(-1, 1)).rejects.toThrow(new GardenNotFound("Esta horta não existe"));

            })

            it("should throw an error when the garden does not belong to the user", async () => {
                const mockUserId = 1;       // ID do usuário autenticado
                const mockGardenId = 1;     // ID da horta que está sendo acessada
                const mockGarden = { id: mockGardenId, userId: 2 };     // Simulação da horta pertencendo a outro usuário

                const whereKnexMock = jest.fn().mockReturnThis()
                const firstKnexMock = jest.fn().mockResolvedValue(mockGarden)
                knex.mockImplementation(() => ({
                    where: whereKnexMock,
                    first: firstKnexMock
                }));

                await expect(gardenService.getOneGarden(mockGardenId, mockUserId)).rejects.toThrow(new UnauthorizedGardenReturn("Esta horta não pertence a você!"));

                expect(knex).toHaveBeenCalledWith("garden");
                expect(whereKnexMock).toHaveBeenCalledWith({ id: mockGardenId });
                expect(firstKnexMock).toHaveBeenCalled();
            })
        })
    });

    describe("createGarden", () => {
        let mockGarden;
        let insertKnexMock, firstKnexMock;
        
        beforeEach(() => {
            mockGarden = {
                name: "Alface",
                description: "Minha horta de alface",
                identifier: "2024030801",
                userId: 1
            };
            
            insertKnexMock = jest.fn().mockResolvedValue([1]); // Simula a inserção da horta
            firstKnexMock = jest.fn().mockResolvedValue({ id: 1 }); // Simula o retorno do primeiro resultado
            selectKnexMock = jest.fn().mockReturnThis(); // Simula o retorno de `select` com encadeamento
            whereKnexMock = jest.fn().mockReturnThis(); // Simula o retorno de `where` com encadeamento
            updateKnexMock = jest.fn().mockReturnThis();

            knex.mockImplementation((table) => {
                if (table === 'identifier') {
                    return {
                        select: selectKnexMock,
                        where: whereKnexMock,
                        first: firstKnexMock,
                        update: updateKnexMock
                    };
                } else if (table === 'garden') {
                    return {
                        insert: insertKnexMock,
                        select: selectKnexMock,
                        where: whereKnexMock,
                        first: firstKnexMock,
                    };
                }
                return {
                    insert: insertKnexMock,
                    update: updateKnexMock,
                    where: whereKnexMock
                };
            });
        });

        it("should create a garden successfully", async () => {
            const response = await gardenService.createGarden(
                mockGarden.name,
                mockGarden.description,
                mockGarden.identifier,
                mockGarden.userId
            );
    
            expect(knex).toHaveBeenCalledWith('garden');
            expect(selectKnexMock).toHaveBeenCalledWith('id');
            expect(whereKnexMock).toHaveBeenCalledWith({ value: mockGarden.identifier });
            expect(firstKnexMock).toHaveBeenCalled();
            expect(knex).toHaveBeenCalledWith('identifier');
            expect(updateKnexMock).toHaveBeenCalledWith({ gardenId: expect.any(Number) }); 
            expect(response).toBe("Horta cadastrada!");
        });
    
        it("should throw a validation error if the garden name is too short", async () => {
            mockGarden.name = "Al";
    
            await expect(gardenService.createGarden(
                mockGarden.name,
                mockGarden.description,
                mockGarden.identifier,
                mockGarden.userId
            )).rejects.toThrow(new ValidationError("O nome deve ter pelo menos 3 caracteres"));
        });
    
        it("should throw a validation error if the identifier is invalid", async () => {
            mockGarden.identifier = "2024";
    
            await expect(gardenService.createGarden(
                mockGarden.name,
                mockGarden.description,
                mockGarden.identifier,
                mockGarden.userId
            )).rejects.toThrow(new ValidationError("O identificar deve ter 10 caracteres."));
        });
    
        it("should throw an error if knex fails to insert the garden", async () => {
            insertKnexMock.mockRejectedValue(new Error("Insert failed"));
    
            await expect(
                gardenService.createGarden(
                    mockGarden.name,
                    mockGarden.description,
                    mockGarden.identifier,
                    mockGarden.userId
                )
            ).rejects.toThrow("Insert failed");
        });
    });

    describe("Get User Gardens", ()=>{
        it("should return all user gardens from database", async () => {
            //mocking
            const userId = 1
            const mock_gardens = [
                { id: 1, name: "Alface", description: "Minha horta de alface", identifier: "2024030801", userId: 1, irrigationId: 1 },
                { id: 1, name: "Tomate", description: "Minha horta de tomate", identifier: "2024030802", userId: 2, irrigationId: 2 }
            ]

            const whereKnexMock = jest.fn().mockResolvedValue(mock_gardens)

            knex.mockImplementation(() => ({
                where:  whereKnexMock
            }));

            //execução
            const user_gardens = await gardenService.getUserGardens(userId)

            //asserts
            expect(user_gardens).toEqual(mock_gardens)
            expect(whereKnexMock).toHaveBeenCalledWith({userId})
            expect(knex).toHaveBeenCalledWith("garden")
        })

        it("should throw an error when user has no associated gardens", async () => {
            //mocking
            const userId = 1
            const mock_gardens = []

            const whereKnexMock = jest.fn().mockResolvedValue(mock_gardens)
            knex.mockImplementation(() => ({
                where:  whereKnexMock
            }));

            //execução e asserts
            await expect(gardenService.getUserGardens(userId)).rejects.toThrow(NoGardenRegistered);
            expect(mock_gardens.length).toEqual(0);
        })
    });
    
    describe("Update Garden", ()=>{
        let user_id, garden_id, garden_data;
        let id_user_owner, identifier, irrigation_setting;

        beforeEach(() => {
            // mocking perfect scenario
            user_id = 1;
            garden_id = 1;
            id_user_owner = 1;
        
            garden_data = { 
                id: 1, 
                name: "Alface", 
                description: "Minha horta de alface", 
                identifier: "2024030801", 
                irrigationId: 1 
            };
        
            irrigation_setting = {
                id: 1, 
                name: "Mocked Setting", 
                userId: user_id, 
                Umidade: "50"
            };
        
            identifier = { id: 1, gardenId: null };
        
            gardenService.verifyIdentifer = jest.fn().mockResolvedValue({ id: user_id, gardenId: garden_id });
            gardenService.getOneGarden = jest.fn().mockResolvedValue({ userId: id_user_owner });
        
            // Mock knex implementation
            selectKnexMock = jest.fn().mockReturnThis();
            whereKnexMock = jest.fn().mockReturnThis();
            updateKnexMock = jest.fn().mockResolvedValue(1);
            firstKnexMockIrrigation = jest.fn().mockResolvedValue(irrigation_setting);

            knex.mockImplementation((table) => {
                if (table === 'irrigationSetting') {
                    return {
                        select: selectKnexMock,
                        where: whereKnexMock,
                        first: firstKnexMockIrrigation,
                    };
                } else if (table === 'identifier') {
                    return {
                        where: whereKnexMock,
                        update: updateKnexMock,
                    };
                } else if(table === 'garden'){
                    return {
                        where: whereKnexMock,
                        update: updateKnexMock,
                    };
                } 
                else return {};
            });
        });
        
        it("should update garden's data successfully", async () => {
            // execução
            const response = await gardenService.updateGarden(user_id, garden_id, garden_data);
            
            // asserts
            expect(knex).toHaveBeenCalledTimes(4)
            expect(whereKnexMock).toHaveBeenCalledTimes(4); 
            expect(updateKnexMock).toHaveBeenCalledTimes(3);

            expect(knex).toHaveBeenCalledWith('irrigationSetting');
            expect(selectKnexMock).toHaveBeenCalledWith("*");
            expect(whereKnexMock).toHaveBeenCalledWith({ id: garden_data.irrigationId });
            expect(firstKnexMockIrrigation).toHaveBeenCalled();
            
            expect(knex).toHaveBeenCalledWith('identifier');
            expect(whereKnexMock).toHaveBeenCalledWith({gardenId: garden_id});
            expect(whereKnexMock).toHaveBeenCalledWith({id: identifier.id});
            expect(updateKnexMock).toHaveBeenCalledWith({gardenId: garden_id});
            expect(updateKnexMock).toHaveBeenCalledWith({gardenId: null});

            expect(knex).toHaveBeenCalledWith('garden');
            expect(whereKnexMock).toHaveBeenCalledWith({ id: garden_id });
            expect(updateKnexMock).toHaveBeenCalledWith(garden_data);
            
            expect(gardenService.getOneGarden).toHaveBeenCalledWith(user_id, garden_id);            
            expect(gardenService.verifyIdentifer).toHaveBeenCalledWith(garden_data.identifier);
            
            expect(response).toBe("Horta atualizada com sucesso!");
        });

        it("should throw an error when new garden name has less than 3 chars", async () => {
            garden_data.name = 'ab';
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new ValidationError('O nome deve ter pelo menos 3 caracteres'));
        });

        it("should throw an error when new garden identifier is invalid", async () => {
            garden_data.identifier = '123';
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new ValidationError('O identificar deve ter 10 caracteres.'));
        });

        it("should throw an error when new garden identifier is invalid", async () => {
            garden_data.identifier = '@123456789';
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new ValidationError('O identificador deve conter apenas números.'));
        });

        it("should throw an error when irrigation id is invalid", async () => {
            garden_data.irrigationId = -1;
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new ValidationError("irrigationId must be a positive number"));
        });

        it("should throw an error when new user id is invalid", async () => {
            garden_data.userId = -1;
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new ValidationError("userId must be a positive number"));
        });

        it("should throw an error when client is not the owner of the garden", async () => {
            user_id = -1;
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new UnauthorizedGardenUpdate());
        });

        it("should throw an error when irrigaton setting not found", async () => {
            firstKnexMockIrrigation = jest.fn().mockResolvedValue(null);
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new IrrigationSettingNotFound('ERR_SERVICE_GARDEN-IRRIGATION_SETTING_NOT_FOUND'));
        });

        it("should throw an error when the user owner of the garden is being changed", async () => {
            firstKnexMockIrrigation = jest.fn().mockResolvedValue({userId: -1});
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new UnauthorizedIrrigationSettingOperation('ERR_SERVICE_GARDEN-UNAUTHORIZED_IRRIGATION_SETTING_OPERATION'));
        });

        it("should throw an error when garden not found", async () => {
            updateKnexMock = jest.fn().mockResolvedValue(null);
            await expect(gardenService.updateGarden(user_id, garden_id, garden_data)).rejects.toThrow(new GardenNotFound());
        });

    });   
})