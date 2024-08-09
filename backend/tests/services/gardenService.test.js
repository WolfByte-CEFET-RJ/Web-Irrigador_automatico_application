const gardenService = require("../../src/services/gardenService");
const knex = require('../../src/database');
const { GardenNotFound, UnauthorizedGardenReturn } = require("../../src/errors/gardenError");
const { ValidationError } = require('yup');

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
})