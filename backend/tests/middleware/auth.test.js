const auth = require("../../src/middleware/auth");
const jwt = require("jsonwebtoken");
const { TokenNotFound } = require("../../src/errors/authError");
const { HttpCode, HttpError } = require("../../src/utils/app.error");


jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
    let req, res, next;
    class mockResponse {
        _status;
        _json;
        status(value){
            this._status = value;
            return this;
        }
        json(value) {
            this._json = value;
        }
    }
    beforeEach(()=> {
        req = {
            headers: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()
        jest.spyOn(console, 'log').mockImplementation(() => {});
    })


    it("should return an unauthorized error", () => {
        res = new mockResponse();
        auth(req, res, next);
        const mockError = new TokenNotFound();
        expect(res._status).toBe(mockError.httpCode);
        expect(res._json).toEqual(mockError);
        expect(next).not.toHaveBeenCalled();
    })

    it("should return an error message with status INTERNAL SERVER ERROR", () => {
        req.headers.authorization = "Bearer invalidToken";
           
        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid jwt");
        })
        
        res = new mockResponse();
        
        auth(req, res, next);
        
        expect(res._status).toBe(HttpCode.INTERNAL_SERVER_ERROR);
        expect(res._json).toEqual({message: "Invalid jwt"});
        expect(next).not.toHaveBeenCalled();
    })

    it("should return a previst http error", () => {
        req.headers.authorization = "Bearer validToken";

        const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
        
        jwt.verify.mockImplementation(() => {
            throw httpError;
        })
        
        res = new mockResponse();
        
        auth(req, res, next);

        expect(res._status).toBe(httpError.httpCode);
        expect(res._json).toEqual(httpError);
        expect(next).not.toHaveBeenCalled();

    })

    it("should set user_id and token in request and call next when token is valid", () => {
        const mockDecodedToken = { id: "user_test"};
        req.headers.authorization = "Bearer validToken";

        jwt.verify.mockReturnValue(mockDecodedToken);
        auth(req, res, next);

        expect(req.user_id).toBe(mockDecodedToken.id);
        expect(req.token).toEqual("validToken");
        expect(next).toHaveBeenCalled();
        expect(res._status).toBeUndefined();
        expect(res._json).toBeUndefined();
    })
})