const userController = require("../../src/controllers/userController.js")
const userService = require("../../src/services/userService.js")
const { HttpCode, HttpError } = require("../../src/utils/app.error.js")

jest.mock("../../src/services/userService.js")

describe("User Controller", () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
    
    describe("Get All Users", () => {
        it('should return a list of users with status OK', async () => {
            // mocking
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const users = [
                { id: 1, name: "John", email: "john@example.com", code: null, expirationDate: null, humidityNotification: 1 },
                { id: 2, name: "Peter", email: "peter@example.com", code: 1234, expirationDate: new Date().toISOString(), humidityNotification: 0 }
            ];
            userService.getAllUsers.mockResolvedValue(users);
            
            // execução
            await userController.getAllUsers(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith(users);
        });
    
        it('should return a error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const errorMessage = "mocked message";
            userService.getAllUsers.mockRejectedValue(new Error(errorMessage));
            
            // execução
            await userController.getAllUsers(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    })

    describe("Get One User", () => {
        it('should return a user with status OK', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            
            const user = { id: 1, name: "John", email: "john@example.com", code: null, expirationDate: null, humidityNotification: 1 }
            userService.getUser.mockResolvedValue(user)
            
            // execução
            await userController.getUser(req, res)
            
            // assert
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK)
            expect(res.json).toHaveBeenCalledWith(user)
        });
        
        it('should return a previst http error', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const httpError = new HttpError({httpCode: 999, type: 'ERR_MOCKED', message: 'any previst erro message'})
            userService.getUser.mockRejectedValue(httpError)
            
            // execução
            await userController.getUser(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(999)
            expect(res.json).toHaveBeenCalledWith(httpError)
        });

        it('should return an error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const errorMessage = "mocked message"
            userService.getUser.mockRejectedValue(new Error(errorMessage));
            
            // execução
            await userController.getUser(req, res)
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
        });

    });

    describe("Create User", () => {
        it("should create a new user and return 201 status code", async () => {
            const mockUser = { id: 1, name: 'Lucas Gael', email: 'gael@example.com', password: '123123123',humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            const req = {
                body: mockUser
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            userService.createUser.mockResolvedValue(mockUser);

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
            expect(res.json).toHaveBeenCalledWith({ message: mockUser });
            expect(userService.createUser).toHaveBeenCalledWith(name, email, password, humidityNotification);
        })
    })
})