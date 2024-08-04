const knex = require('../../src/database/index.js');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const { UserNotFound, AlreadyExists, NotAllowedChangeEmail, PasswordMismatch, NoCode, InvalidCode, CodeExpired } = require('../../src/errors/userError.js');
const userService = require('../../src/services/userService.js');
const moment = require('moment');

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
            const mockUserId = 1;
            const mockUser = { id: mockUserId, name: 'Lucas Gael', email: 'gael@example.com', humidityNotification: 1 };
            const mockUserData = { name: 'Updated Name', password: 'newpassword123', humidityNotification: 1 };

            userService.getUser = jest.fn().mockResolvedValue(mockUser);
            
            const whereKnexMock = jest.fn().mockReturnThis();
            const updateKnexMock = jest.fn().mockResolvedValue(1);
            knex.mockImplementation(() => ({
                where: whereKnexMock,
                update: updateKnexMock
            }));
            
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            const result = await userService.updateUser(mockUserId, mockUserData);

            expect(result).toBe(1);
            expect(knex).toHaveBeenCalledWith('user');
            expect(knex().where).toHaveBeenCalledWith({ id: mockUserId });
            expect(knex().update).toHaveBeenCalledWith({
                name: mockUserData.name,
                password: 'hashedPassword',
                humidityNotification: mockUserData.humidityNotification
            });
        });

        it('should throw error if email is being updated', async () => {
            const mockUserId = 1;
            const mockUserData = { email: 'newemail@example.com' };

            await expect(userService.updateUser(mockUserId, mockUserData)).rejects.toThrow(NotAllowedChangeEmail);
        });

        it('should throw validation error if data is invalid', async () => {
            const mockUserData = { name: 'Lu', password: '123', humidityNotification: 'invalid' };

            await expect(userService.updateUser(1, mockUserData)).rejects.toThrow(yup.ValidationError);
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
    
    describe("resetPassword", () => {
        const email = 'test@example.com';
        const password = 'newpassword123';
        const confirmPassword = 'newpassword123';

        it('should reset password successfully', async () => {
            const mockUser = { email, code: '123456' };
            knex.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockUser),
                update: jest.fn().mockResolvedValue(1)
            });
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            const response = await userService.resetPassword(email, password, confirmPassword);

            expect(knex().select).toHaveBeenCalledWith('*');
            expect(knex().where).toHaveBeenCalledWith({ email });
            expect(knex().first).toHaveBeenCalled();
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
            expect(knex().update).toHaveBeenCalledWith({ 
                password: 'hashedPassword', 
                code: null,
                expirationDate: null
            });
            expect(response).toBe('Senha alterada com sucesso!');
        });

        it('should throw UserNotFound error if user does not exist', async () => {
            knex.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(null)
            });

            await expect(userService.resetPassword(email, password, confirmPassword))
            .rejects
            .toThrow(UserNotFound);

            expect(knex().select).toHaveBeenCalledWith('*');
            expect(knex().where).toHaveBeenCalledWith({ email });
            expect(knex().first).toHaveBeenCalled();
        });

        it('should throw PasswordMismatch error if passwords do not match', async () => {
            const mockUser = { email, code: '123456' };
            knex.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockUser)
            });

            await expect(userService.resetPassword(email, password, 'differentpassword'))
            .rejects
            .toThrow(PasswordMismatch);

            expect(knex().select).toHaveBeenCalledWith('*');
            expect(knex().where).toHaveBeenCalledWith({ email });
            expect(knex().first).toHaveBeenCalled();
        });

        it('should throw ValidationError if password is invalid', async () => {
            const invalidPassword = 'short';
            const mockUser = { email, code: '123456' };
            knex.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockUser)
            });

            await expect(userService.resetPassword(email, invalidPassword, invalidPassword))
            .rejects
            .toThrow(yup.ValidationError);

            expect(knex().select).toHaveBeenCalledWith('*');
            expect(knex().where).toHaveBeenCalledWith({ email });
            expect(knex().first).toHaveBeenCalled();
        });

        it('should throw NoCode error if user code is null', async () => {
            const mockUser = { email, code: null };
            knex.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockUser)
            });

            await expect(userService.resetPassword(email, password, confirmPassword))
            .rejects
            .toThrow(NoCode);

            expect(knex().select).toHaveBeenCalledWith('*');
            expect(knex().where).toHaveBeenCalledWith({ email });
            expect(knex().first).toHaveBeenCalled();
        });
    });

    describe("Verify Code", () => {

        it("should return a success message if the code is valid", async () => {
            // mocking
            const email = "test@example.com"
            const code = 999
            const relevantMockUser = { email, code }

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(relevantMockUser);
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));

            jest.spyOn(moment.fn, 'isAfter').mockReturnValue(false);

            //execução
            const result = await userService.verifyCode(email, code);
            
            //asserts
            expect(result).toEqual('Código válido! Você já pode recuperar sua senha!');
            expect(whereKnexMock).toHaveBeenCalledWith({ email })
        });

        it("should throw UserNotFound if user does not exist", async () => {
            
            //mocking
            const email = "no@fail.com"
            const code = -1

            const selectKnexMock = jest.fn().mockReturnThis();
            const whereKnexMock = jest.fn().mockReturnThis();
            const firstKnexMock = jest.fn().mockResolvedValue(null);
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }));

            //execução e asserts
            await expect(userService.verifyCode(email, code)).rejects.toThrow(UserNotFound);
        });

        it("should throw InvalidCode if code is not a number or does not match", async () => {
            // mocking
            const invalid_code = "-1" //diferente do registered_code e typeof != number
            
            const email = "test@example.com"
            const registered_code = 999
            const relevantMockUser = { email, registered_code }
    
            const selectKnexMock = jest.fn().mockReturnThis()
            const whereKnexMock = jest.fn().mockReturnThis()
            const firstKnexMock = jest.fn().mockResolvedValue(relevantMockUser)
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock
            }))
            
            //execução e asserts
            expect(invalid_code).not.toBe(registered_code)
            await expect(userService.verifyCode(email, invalid_code)).rejects.toThrow(InvalidCode)
        });
    
        it("should throw CodeExpired if the code is expired", async () => {
            // mocking
            const email = "test@example.com"
            const code = 999
            const relevantMockUser = { email, code }

            const selectKnexMock = jest.fn().mockReturnThis()
            const whereKnexMock = jest.fn().mockReturnThis()
            const firstKnexMock = jest.fn().mockResolvedValue(relevantMockUser)
            const updateKnexMock = jest.fn().mockResolvedValue(1)
            knex.mockImplementation(() => ({
                select: selectKnexMock,
                where: whereKnexMock,
                first: firstKnexMock,
                update: updateKnexMock
            }));

            jest.spyOn(moment.fn, 'isAfter').mockReturnValue(true);
    
            //execução e asserts
            await expect(userService.verifyCode(email, code)).rejects.toThrow(CodeExpired);
            expect(updateKnexMock).toHaveBeenCalledWith({ code: null, expirationDate: null });
            expect(whereKnexMock).toHaveBeenCalledWith({ email });
        });
    
    })
});
