const verifyResetToken = require("../../src/middleware/verifyResetToken");
const jwt = require("jsonwebtoken");
const { ValidationError } = require('yup');
const { HttpCode, HttpError } = require("../../src/utils/app.error");
const { InvalidToken, TokenNotFound } = require('../../src/errors/resetTokenError');

jest.mock("jsonwebtoken");

describe("Verify Reset Token Middleware", () => {
    let req, res, next;
    beforeEach(()=> {
        req = {
            headers: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()
    })

    it("should throw TokenNotFound error if resetToken is missing", () => {
        expect(() => verifyResetToken(req, res, next)).toThrow(TokenNotFound);
        expect(next).not.toHaveBeenCalled();
    })

    it("should throw InvalidToken error if decodedToken type is not reset", () => {
        req.headers['x-reset-token'] = "validToken";

        jwt.verify.mockReturnValue({type: "invalid", email: "teste@teste.com"});
        verifyResetToken(req, res, next);

        const mockError = new InvalidToken();

        expect(res.status).toHaveBeenCalledWith(mockError.httpCode);
        expect(res.json).toHaveBeenCalledWith(mockError);
        expect(next).not.toHaveBeenCalled();
    })

    it("should return an error message with status INTERNAL SERVER ERROR", () => {
        req.headers['x-reset-token'] = "validToken";

        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid jwt");
        });

        verifyResetToken(req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({message: "Invalid jwt"});
        expect(next).not.toHaveBeenCalled();
    })

    it("should return BAD_REQUEST if a ValidationError occurs", () => {
        req.headers['x-reset-token'] = "validToken";

        jwt.verify.mockImplementation(() => {
            throw new ValidationError("Validation Error");
        });

        verifyResetToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({message: "Validation Error"});
        expect(next).not.toHaveBeenCalled();
    })

    it("should return a previst http error", () => {
        req.headers['x-reset-token'] = "validToken";

        const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
        
        jwt.verify.mockImplementation(() => {
            throw httpError;
        });

        verifyResetToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
        expect(res.json).toHaveBeenCalledWith(httpError);
        expect(next).not.toHaveBeenCalled();
    })

    it("must set email in request and call next when resetToken is valid", () => {
        const mockDecodedToken = {type: "reset", email: "teste@teste.com"}
        req.headers['x-reset-token'] = "validToken";


        jwt.verify.mockReturnValue(mockDecodedToken);
        verifyResetToken(req, res, next);

        expect(req.email).toBe(mockDecodedToken.email);
        expect(next).toHaveBeenCalled();
    })
})

