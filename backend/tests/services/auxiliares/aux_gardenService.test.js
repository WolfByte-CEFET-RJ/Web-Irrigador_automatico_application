const gardenService = require("../../../src/services/gardenService");
const knex = require('../../../src/database');
const { IdentifierNotFound, IdentifierAlreadyAssociated } = require("../../../src/errors/gardenError");

jest.mock('../../../src/database');

describe("Garden Utils", ()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Verify Identifier", ()=>{
        it("should verify identifiers and return user_id and garden_id ", async ()=>{
            //mocking
            const identifier = 12345;
    
            const data = { id: 1, gardenId: null }
    
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(data);
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));
    
            //execução
            const response = await gardenService.verifyIdentifer(identifier);

            //asserts
            expect(response).toEqual(data)
            expect(knex).toHaveBeenCalledWith("identifier")
            expect(selectKnexMock).toHaveBeenCalledWith("id", "gardenId")
            expect(whereKnexMock).toHaveBeenCalledWith({ value: identifier })
            expect(firstKnexMock).toHaveBeenCalled();
        });

        it("should thrown an error when identifier not registered ", async ()=>{
            //mocking
            const identifier = 12345;
    
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));
    
            //execução e asserts
            await expect(gardenService.verifyIdentifer(identifier)).rejects.toThrow(IdentifierNotFound);
            expect(knex).toHaveBeenCalledWith("identifier")
            expect(selectKnexMock).toHaveBeenCalledWith("id", "gardenId")
            expect(whereKnexMock).toHaveBeenCalledWith({ value: identifier })
            expect(firstKnexMock).toHaveBeenCalled();

        });

        it("should thrown an error when identifier is alredy associated to one garden ", async ()=>{
            //mocking
            const identifier = 12345;
            const data = { id: 1, gardenId: 999 }
    
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(data);
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));
    
            //execução e asserts
            await expect(gardenService.verifyIdentifer(identifier)).rejects.toThrow(IdentifierAlreadyAssociated);
            expect(knex).toHaveBeenCalledWith("identifier")
            expect(selectKnexMock).toHaveBeenCalledWith("id", "gardenId")
            expect(whereKnexMock).toHaveBeenCalledWith({ value: identifier })
            expect(firstKnexMock).toHaveBeenCalled();

        });
    });
});