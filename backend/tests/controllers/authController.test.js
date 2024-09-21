const authController = require('../../src/controllers/authController');
const authService = require('../../src/services/authService');
const { HttpCode, HttpError } = require("../../src/utils/app.error");

jest.mock("../../src/services/authService");

describe("Auth Controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it("should return a token with status Ok", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockToken = "mock-token";

        authService.login = jest.fn().mockResolvedValue(mockToken);

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
        expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it("should handle an HttpError", async () => {
        const req = {
            body: {
                email: "unauthorized@example.com",
                password: "password123"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockError = new HttpError({httpCode: HttpCode.UNAUTHORIZED, type: 'ERR_MOCKED', message: 'unauhorized'});

        authService.login = jest.fn().mockRejectedValue(mockError);

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith(mockError);
    });

});