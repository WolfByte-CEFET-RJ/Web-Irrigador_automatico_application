const userController = require("../../src/controllers/userController.js")
const userService = require("../../src/services/userService.js")
const jwt = require('jsonwebtoken');
const { HttpCode, HttpError } = require("../../src/utils/app.error.js")
const { ValidationError } = require('yup');

jest.mock("../../src/services/userService.js")
jest.mock("jsonwebtoken")

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

            const error = new Error("mocked message");
            userService.getAllUsers.mockRejectedValue(error);
            
            // execução
            await userController.getAllUsers(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
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

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
            userService.getUser.mockRejectedValue(httpError)
            
            // execução
            await userController.getUser(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode)
            expect(res.json).toHaveBeenCalledWith(httpError)
        });

        it('should return an error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = new Error("mocked message")
            userService.getUser.mockRejectedValue(error);
            
            // execução
            await userController.getUser(req, res)
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR)
            expect(res.json).toHaveBeenCalledWith({ message: error.message })
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

        it("should return 400 status code on validation error", async () => {
            const mockUser = { name: 'Lucas Gael', email: 'invalid-email', password: '123123123', humidityNotification: 1 };

            const req = {
                body: mockUser
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const validationError = new ValidationError('Validation failed');
            userService.createUser.mockRejectedValue(validationError);

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ message: validationError.message });
        })

        it("should return an error message with status INTERNAL SERVER ERROR on failure", async () => {
            const mockUser = { name: 'Lucas Gael', email: 'gael@example.com', password: '123123123', humidityNotification: 1 };

            const req = {
                body: mockUser
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const internalServerError = new Error('Internal server error');
            userService.createUser.mockRejectedValue(internalServerError);

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: internalServerError.message });
        });
    });

    describe("Update User", () => {
        it("should update an existing user and return 200 status code", async () => {
            const mockUser = { id: 1, name: 'Lucas Gael', humidityNotification: 0 };
            const { id, name, humidityNotification } = mockUser;
    
            userService.updateUser = jest.fn().mockResolvedValue(1);
            
            const req = {
                user_id: mockUser.id,
                body: { name: mockUser.name, humidityNotification: mockUser.humidityNotification }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
    
    
            await userController.updateUser(req, res);
    
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso' });
            expect(userService.updateUser).toHaveBeenCalledWith(id, { name, humidityNotification });
        });
    
        it("should return an error message with status INTERNAL SERVER ERROR on failure", async () => {
            const req = {
                user_id: 1,
                body: { name: 'John', email: 'john@example.com', humidityNotification: 1 }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            const errorMessage = "mocked error message";
            userService.updateUser.mockRejectedValue(new Error(errorMessage));
    
            await userController.updateUser(req, res);
    
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe("Delete User", () => {
        it("should delete 1 (one) user and and return status OK", async () =>{
            // mocking 
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            userService.deleteUser.mockResolvedValue(1)

            // execução
            await userController.deleteUser(req, res)

            // asserts
            expect(userService.deleteUser).toHaveBeenCalledTimes(1)
            expect(userService.deleteUser).toHaveBeenCalledWith(req.user_id)
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK)
            expect(res.json).toHaveBeenCalledWith({message: 'Usuário deletado com sucesso!'})
        })

        it("should return a previst http error", async () =>{
            // mocking 
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
            userService.deleteUser.mockRejectedValue(httpError)

            // execução
            await userController.deleteUser(req, res)

            // asserts
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode)
            expect(res.json).toHaveBeenCalledWith(httpError)
        })

        it('should return an error message with status INTERNAL SERVER ERROR', async () => {
            // mocking
            const req = { user_id: 1 }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = new Error("mocked message")
            userService.deleteUser.mockRejectedValue(error);
            
            // execução
            await userController.deleteUser(req, res)
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR)
            expect(res.json).toHaveBeenCalledWith({ message: error.message })
        });
    });

    describe("Reset Password", () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: { 
                    password: 'newpassword123',
                    confirmPassword: 'newpassword123'
                },
                email: 'test@example.com'
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.clearAllMocks();
        });

        it('should reset password successfully', async () => {
            userService.resetPassword.mockResolvedValue('Password reset successful');

            await userController.resetPassword(req, res);

            expect(userService.resetPassword).toHaveBeenCalledWith(req.email, req.body.password, req.body.confirmPassword);
            expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
            expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successful' });
        });

        it('should handle validation error', async () => {
            const validationError = new ValidationError('Validation failed');
            userService.resetPassword.mockRejectedValue(validationError);

            await userController.resetPassword(req, res);

            expect(userService.resetPassword).toHaveBeenCalledWith(req.email, req.body.password, req.body.confirmPassword);
            expect(res.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
        });

        it('should handle unexpected error', async () => {
            const unexpectedError = new Error('Unexpected error');
            userService.resetPassword.mockRejectedValue(unexpectedError);

            await userController.resetPassword(req, res);

            expect(userService.resetPassword).toHaveBeenCalledWith(req.email, req.body.password, req.body.confirmPassword);
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected error' });
        });
    });

    describe("Verify Code", () => {

        it("should return a temporary token and status OK when code is valid", async () => {
        // mocking
        const req = {
            params: {
                email: 'test@example.com'
            },
            body: {
                code: 999
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        userService.verifyCode.mockResolvedValue("Código válido! Você já pode recuperar sua senha!");
        
        const mockToken = "----"
        jwt.sign.mockReturnValue(mockToken)

        // execução
        await userController.verifyCodeAndGenerateToken(req, res);

        // asserts
        expect(userService.verifyCode).toHaveBeenCalledWith(req.params.email, req.body.code);
        expect(jwt.sign).toHaveBeenCalledWith({ email: req.params.email, type: 'reset' }, process.env.TOKEN_KEY, { expiresIn: '15m' });
        expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
        expect(res.json).toHaveBeenCalledWith({ resetToken: mockToken });

        })

        it("should return a previst http error", async () => {
            // mocking
            const req = {
                body: {
                    code: 999
                },
                params: {
                    email: 'test@example.com'
                }
            }
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
    
            const httpError = new HttpError({httpCode: -1, type: 'ERR_MOCKED', message: 'any previst erro message'})
            userService.verifyCode.mockRejectedValue(httpError)
            
            // execução
            await userController.verifyCodeAndGenerateToken(req, res);
    
            // asserts
            expect(userService.verifyCode).toHaveBeenCalledWith(req.params.email, req.body.code);
            expect(res.status).toHaveBeenCalledWith(httpError.httpCode);
            expect(res.json).toHaveBeenCalledWith(httpError);
    
        })

        it("should return an error message with status INTERNAL SERVER ERROR", async () => {
                // mocking
                const req = {
                    body: {
                        code: 999
                    },
                    params: {
                        email: 'test@example.com'
                    }
                }
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }
        
                const error = new Error("mocked message")
                userService.verifyCode.mockRejectedValue(error)
                
                // execução
                await userController.verifyCodeAndGenerateToken(req, res);
        
                // asserts
                expect(userService.verifyCode).toHaveBeenCalledWith(req.params.email, req.body.code);
                expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
                expect(res.json).toHaveBeenCalledWith({message: error.message});
        
        })
    });
})