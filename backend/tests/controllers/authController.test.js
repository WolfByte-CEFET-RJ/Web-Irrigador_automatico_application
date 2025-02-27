const authController = require('../../src/controllers/authController');
const authService = require('../../src/services/authService');
const { HttpCode, HttpError } = require("../../src/utils/app.error");
const { ValidationError } = require('yup');

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

    it("should handle an Internal Server Error", async () => {
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

        const mockError = new HttpError({httpCode: HttpCode.INTERNAL_SERVER_ERROR, type: 'ERR_MOCKED', message: 'Internal Server Error'});

        authService.login = jest.fn().mockRejectedValue(mockError);
        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith(mockError);
    });

    it("should return 400 status code on validation error", async () => {
        const mockUser = {  email: "wrogemail", password: "password123" };

        const req = {
            body: mockUser
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const validationError = new ValidationError('Validation failed');

        authService.login = jest.fn().mockRejectedValue(validationError);
        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ message: validationError.message });
    })
});