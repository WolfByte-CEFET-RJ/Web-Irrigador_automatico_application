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
            const mockUser = { name: 'Luana', email: 'gael@example.com', password: '123123123', humidityNotification: '5' };
            const { name, email, password, humidityNotification } = mockUser;

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(yup.ValidationError);
        });

        it("should throw AlreadyExists error if the user already exists", async () => {
            const mockUser = { id: 1, name: 'Lucas Gael', email: 'gael@example.com', password: '123123123', humidityNotification: 1 };
            const { name, email, password, humidityNotification } = mockUser;

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue({ email: 'gael@example.com' });

            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                insert: jest.fn().mockResolvedValue([1])
            }));

            await expect(userService.createUser(name, email, password, humidityNotification)).rejects.toThrow(AlreadyExists);
            expect(knex).toHaveBeenCalledWith('user');
            expect(selectKnexMock).toHaveBeenCalledWith('email');
            expect(whereKnexMock).toHaveBeenCalledWith({ email });
            expect(firstKnexMock).toHaveBeenCalled();
        });
    });

    describe('Update User', () => {
        it('should update user data and return success', async () => {
            const mockUser = { id: 1, name: 'Lucas Gael', email: 'gael@example.com', password: '123123123', humidityNotification: 1 };
            const { id, name, password, humidityNotification } = mockUser;

            userService.getUser = jest.fn().mockResolvedValue(mockUser);

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            const updateKnexMock = jest.fn().mockResolvedValue(1);
            knex.mockImplementation(() => ({
                update: updateKnexMock,
                where: jest.fn().mockReturnThis()
            }));

            const result = await userService.updateUser(id, { name, password, humidityNotification });

            expect(result).toEqual(1);
            expect(userService.getUser).toHaveBeenCalledWith(id);
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
            expect(knex).toHaveBeenCalledWith('user');
            expect(updateKnexMock).toHaveBeenCalledWith({
                name,
                password: 'hashedPassword',
                humidityNotification
            });
        });

        it('should throw error if email is being updated', async () => {
            await expect(userService.updateUser(1, { email: 'newemail@example.com' })).rejects.toThrow(NotAllowedChangeEmail);
        });

        it('should throw validation error if data is invalid', async () => {
            const mockUser = { name: 'Lu', password: '123', humidityNotification: 'invalid' };

            await expect(userService.updateUser(1, mockUser)).rejects.toThrow(yup.ValidationError);
        });

        it('should throw UserNotFound error if user does not exist', async () => {
            userService.getUser = jest.fn().mockResolvedValue(null);

            await expect(userService.updateUser(1, { name: 'New Name' })).rejects.toThrow(UserNotFound);
        });
    });

    describe("Delete User", () => {
        it("should delete one user and return 1", async () =>{
            // mocking
            const user_id = 1
            const searchedMockUser = { id: user_id, name: "John", email: "john@example.com", humidityNotification: 1 }

            userService.getUser = jest.fn().mockResolvedValue(searchedMockUser)

            const whereKnexMock = jest.fn().mockReturnThis();
            const delKnexMock = jest.fn().mockResolvedValue(1);

            knex.mockImplementation(() => ({
                where: whereKnexMock,
                del: delKnexMock
            }));

            // execução
            const deletions = await userService.deleteUser(user_id);

            // asserts
            expect(deletions).toEqual(1)
            expect(userService.getUser).toHaveBeenCalledWith(user_id)
            expect(knex).toHaveBeenCalledWith('user');
            expect(whereKnexMock).toHaveBeenCalledWith({ id: user_id });
            expect(delKnexMock).toHaveBeenCalled();
        })

        it("should throw an error when user not found", async () =>{
            // mocking
            const user_id = -1
            userService.getUser = jest.fn().mockRejectedValue(new UserNotFound());

            // execução e asserts
            await expect(userService.deleteUser(user_id)).rejects.toThrow(UserNotFound);
            expect(userService.getUser).toHaveBeenCalledWith(user_id)
        })
    });
    
});
