const knex = require('../../src/database/index.js');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const { UserNotFound, AlreadyExists } = require('../../src/errors/userError.js');
const userService = require('../../src/services/userService.js');

jest.mock('../../src/database/index.js');
jest.mock('bcryptjs');

describe("User Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
    
    describe('Get All Users', () => {
        it('should return all users from the database', async () => {

            // mocking
            const mock_users = [
                { id: 1, name: "John", email: "john@example.com", code: null, expirationDate: null, humidityNotification: 1 },
                { id: 2, name: "Peter", email: "peter@example.com", code: 1234, expirationDate: new Date().toISOString(), humidityNotification: 0 }
            ];

            const selectKnexMock = jest.fn().mockResolvedValue(mock_users)
            knex.mockImplementation(() => ({
                select: selectKnexMock
            }));

            // execução
            const users = await userService.getAllUsers()

            // asserts
            expect(users).toEqual(mock_users)
            expect(knex).toHaveBeenCalledWith('user')
            expect(selectKnexMock).toHaveBeenCalledWith('id', 'name', 'email', 'code', 'expirationDate', 'humidityNotification')

        });
    });

    describe('Get One User', () => {
        it('should return a user when found', async () => {
            // mocking
            const mockUser = { id: 1, name: "John", email: "john@example.com", humidityNotification: 1 }

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(mockUser);

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));

            // execução
            const user = await userService.getUser(mockUser.id);

            // asserts
            expect(user).toEqual(mockUser);
            expect(knex).toHaveBeenCalledWith('user');
            expect(selectKnexMock).toHaveBeenCalledWith('id', 'name', 'email', 'humidityNotification');
            expect(whereKnexMock).toHaveBeenCalledWith({ id: mockUser.id });
            expect(firstKnexMock).toHaveBeenCalled();
        });

        it('should throw an error when user not found', async () => {
            
            // mocking
            knex.mockImplementation(() => ({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(undefined)
            }));

            // execução e asserts
            await expect(userService.getUser(-1)).rejects.toThrow(UserNotFound);
        })
    });

    describe("Create User", () => {
        it("should create a new user and return success message", async () => {
            const mockUser = { id: 1, name: 'Lucas Gael', email: 'gael@example.com', password: '123123123', humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            // Configure o mock do knex corretamente
            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);
            const insertKnexMock = jest.fn().mockResolvedValue([1]);

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                insert: insertKnexMock
            }));

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            const result = await userService.createUser(name, email, password, humidityNotification);

            expect(result).toBe('Usuário cadastrado!');
            expect(knex).toHaveBeenCalledWith('user');
            expect(selectKnexMock).toHaveBeenCalledWith('email');
            expect(whereKnexMock).toHaveBeenCalledWith({ email });
            expect(firstKnexMock).toHaveBeenCalled();
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
            expect(knex).toHaveBeenCalledWith('user');
            expect(insertKnexMock).toHaveBeenCalledWith({
                name,
                email,
                password: 'hashedPassword',
                humidityNotification,
                code: null
            });
        });

        it("should throw validation error if name is invalid", async () => {
            const mockUser = { name: 'Lu', email: 'gael@example.com', password: '123123123', humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(yup.ValidationError);
        });

        it("should throw validation error if email is invalid", async () => {
            const mockUser = { name: 'Luana', email: 'gael@', password: '123123123', humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(yup.ValidationError);
        });

        it("should throw validation error if password is invalid", async () => {
            const mockUser = { name: 'Luana', email: 'gael@example.com', password: '12312', humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(yup.ValidationError);
        });

        it("should throw validation error if humidityNotification is invalid", async () => {
            const mockUser = { name: 'Luana', email: 'gael@example.com', password: '123123123', humidityNotification: 'invalid' };
            const { name, email, password, humidityNotification } = mockUser;

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(yup.ValidationError);
        });
    });
});
