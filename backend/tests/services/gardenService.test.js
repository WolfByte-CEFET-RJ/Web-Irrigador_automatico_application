const gardenService = require("../../src/services/gardenService");
const knex = require('../../src/database');
const { GardenNotFound, UnauthorizedGardenReturn } = require("../../src/errors/gardenError");

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
    })
})