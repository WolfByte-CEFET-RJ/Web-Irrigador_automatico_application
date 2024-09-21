const irrigationHistoryService = require("../../src/services/irrigationHistoryService");
const knex = require('../../src/database');
const convertDate = require("../../src/utils/convertDate");
const { IrrigationHistoryNotFound } = require("../../src/errors/irrigationHistoryError");

jest.mock('../../src/database');
jest.mock('../../src/utils/convertDate');


describe("Irrigation History Service", ()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All Irrigation Histories of ALL User's Garden", ()=>{

        it("should return a list of all irrigation histories of all user's gardens existent on database", async ()=>{
            const user_id = 1;

            const histories_database = [
                { gardenName: "Horta de Milho Verde", date: "2024-09-20T23:55:44+00:00" },
                { gardenName: "Horta de Feijão", date: "Friday, 20-Sep-24 23:55:44 UTC" },
                { gardenName: "Horta de Milho Verde", date: "any format of date" }
            ]

            const selectKnexMock = jest.fn().mockReturnThis();
            const joinKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const orderByKnexMock = jest.fn().mockReturnValue(histories_database);
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                join: joinKnexMock,
                where: whereKnexMock,
                orderBy: orderByKnexMock,
            }));

            const final_histories = await irrigationHistoryService.getAllUserGardensHistory(user_id);

            expect(final_histories.length).toEqual(histories_database.length);
            expect(convertDate).toHaveBeenCalledTimes(histories_database.length);
            histories_database.forEach(history =>{
                expect(convertDate).toHaveBeenCalledWith(history.date);
            })
        });

        it("should return an error when not found any irrigation history", async ()=>{
            const user_id = 1

            const selectKnexMock = jest.fn().mockReturnThis();
            const joinKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const orderByKnexMock = jest.fn().mockReturnValue([]);
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                join: joinKnexMock,
                where: whereKnexMock,
                orderBy: orderByKnexMock,
            }));

            await expect(irrigationHistoryService.getAllUserGardensHistory(user_id)).rejects.toThrow(new IrrigationHistoryNotFound());
        });
    });

    describe("Get All Irrigation Histories of ONE User's Garden", ()=>{
        it("should return a list of all irrigation histories existent on database of one user's garden", async ()=>{
            const user_id = 1;
            const gardenName = "Horta de Milho Verde";

            const histories_database = [
                { gardenName: "Horta de Milho Verde", date: "2024-09-20T23:55:44+00:00" },
                { gardenName: "Horta de Milho Verde", date: "any format of date" }
            ]

            const selectKnexMock = jest.fn().mockReturnThis();
            const joinKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const andWhereKnexMock = jest.fn().mockReturnThis();
            const orderByKnexMock = jest.fn().mockReturnValue(histories_database);
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                join: joinKnexMock,
                where: whereKnexMock,
                andWhere: andWhereKnexMock,
                orderBy: orderByKnexMock,
            }));

            const final_histories = await irrigationHistoryService.getOneGardenHistory(user_id, gardenName);

            expect(final_histories.length).toEqual(histories_database.length);
            expect(convertDate).toHaveBeenCalledTimes(histories_database.length);
            histories_database.forEach(history =>{
                expect(gardenName).toEqual(history.gardenName);
                expect(convertDate).toHaveBeenCalledWith(history.date);
            })
        });

        it("should return an error when not found any irrigation history", async ()=>{
            const user_id = 1;            
            const gardenName = "Horta de Milho Verde";

            const selectKnexMock = jest.fn().mockReturnThis();
            const joinKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const andWhereKnexMock = jest.fn().mockReturnThis();
            const orderByKnexMock = jest.fn().mockReturnValue([]);
        
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                join: joinKnexMock,
                where: whereKnexMock,
                andWhere: andWhereKnexMock,
                orderBy: orderByKnexMock,
            }));

            await expect(irrigationHistoryService.getOneGardenHistory(user_id, gardenName)).rejects.toThrow(new IrrigationHistoryNotFound());
        });
    })
})