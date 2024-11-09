const irrigationHistoryController = require("../../src/controllers/irrigationHistoryController");
const { GardenNotInformed } = require("../../src/errors/irrigationHistoryError");
const irrigationHistoryService = require("../../src/services/irrigationHistoryService");
const { HttpCode, HttpError } = require("../../src/utils/app.error");


jest.mock("../../src/services/irrigationHistoryService");

describe("Irrigation History Controller",()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Get All Irrigations Histories of ALL User's Garden", ()=>{

        it("should return a list of all irrigation histories of all user's gardens with status OK", async () => {
            const req = {
                user_id: 1
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const histories = [
                { gardenName: "Horta de Milho Verde", date: "18:57:45 de 20/06/2024" },
                { gardenName: "Horta de Arroz", date: "18:57:45 de 21/06/2024" },
                { gardenName: "Horta de Milho Verde", date: "19:00:10 de 20/06/2024" },
                { gardenName: "Horta de Feijão", date: "18:57:45 de 21/06/2024" },
            ]

            irrigationHistoryService.getAllUserGardensHistory.mockResolvedValue(histories);

            await irrigationHistoryController.getAllUserGardensHistory(req, res)

            expect(irrigationHistoryService.getAllUserGardensHistory).toHaveBeenCalledWith(req.user_id);
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith(histories);

        })

        it("should return a previst http error", async () => {
            const req = {
                user_id: 1
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'});
            irrigationHistoryService.getAllUserGardensHistory.mockRejectedValue(httpError);

            await irrigationHistoryController.getAllUserGardensHistory(req, res)

            expect(irrigationHistoryService.getAllUserGardensHistory).toHaveBeenCalledWith(req.user_id);
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
            expect(res.json).toHaveBeenCalledWith(httpError);

        })

        it("should return an unexpected internal server error", async () => {
            const req = {
                user_id: 1
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const erro = new Error("mocked message");
            irrigationHistoryService.getAllUserGardensHistory.mockRejectedValue(erro);

            await irrigationHistoryController.getAllUserGardensHistory(req, res)

            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({message: erro.message});

        });
    });

    describe("Get All Irrigation Histories of ONE User's Garden", ()=>{

        it("should return a list of user's irrigation histories of one garden with status OK", async () => {
            const req = {
                user_id: 1,
                query: {name: "Horta de Milho Verde"}
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const histories = [
                { gardenName: "Horta de Milho Verde", date: "18:57:45 de 20/06/2024" },
                { gardenName: "Horta de Milho Verde", date: "19:00:10 de 20/06/2024" }
            ]

            irrigationHistoryService.getOneGardenHistory.mockResolvedValue(histories);

            await irrigationHistoryController.getOneGardenHistory(req, res);

            expect(irrigationHistoryService.getOneGardenHistory).toHaveBeenCalledWith(req.user_id, req.query.name);
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith(histories);
            histories.forEach(history=>{
                expect(history.gardenName).toEqual(req.query.name);
            })

        })

        it("should return a previst http error throwed by called services", async () => {
            const req = {
                user_id: 1,
                query: {name: "Horta de Milho Verde"}
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'});
            irrigationHistoryService.getOneGardenHistory.mockRejectedValue(httpError);

            await irrigationHistoryController.getOneGardenHistory(req, res);

            expect(irrigationHistoryService.getOneGardenHistory).toHaveBeenCalledWith(req.user_id, req.query.name);
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
            expect(res.json).toHaveBeenCalledWith(httpError);

        })

        it("should throw a GardenNotInformed error if query params name is not informed", async () => { // já testado implicitamente no teste de http
            const req = {
                user_id: 1,
                query: {name: null}
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const throwed = new GardenNotInformed();

            await irrigationHistoryController.getOneGardenHistory(req, res);

            expect(req.query.name).toEqual(null);
            expect(irrigationHistoryService.getOneGardenHistory).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledWith(throwed.httpCode);
            expect(res.json).toHaveBeenCalledWith(throwed);

        })

        it("should return an unexpected internal server error", async () => {
            const req = {
                user_id: 1,
                query: {name: "Horta de Milho Verde"}
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const erro = new Error("mocked message");
            irrigationHistoryService.getOneGardenHistory.mockRejectedValue(erro);

            await irrigationHistoryController.getOneGardenHistory(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({message: erro.message});

        });

    });

})