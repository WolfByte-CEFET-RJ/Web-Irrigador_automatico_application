const authService = require("../../src/services/authService");
const { InvalidEmail, InvalidPassword } = require("../../src/errors/loginError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const knex = require('../../src/database');

jest.mock('../../src/database');
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("Auth Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

      it("should log in a user and return a token", async () => {
        const email = "test@example.com";
        const password = "password123";
        const mockUser = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: "hashedPassword"
        };
        const mockToken = "mock-jwt-token";

        const selectMock = jest.fn().mockReturnThis();
        const whereMock = jest.fn().mockReturnThis();
        const firstMock = jest.fn().mockResolvedValue(mockUser);

        knex.mockImplementation(() => ({
            select: selectMock,
            where: whereMock,
            first: firstMock
        }));

        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue(mockToken);

        const result = await authService.login(email, password);

        expect(result).toBe(mockToken);
        expect(knex).toHaveBeenCalledWith('user');
        expect(selectMock).toHaveBeenCalledWith('id', 'name', 'email', 'password');
        expect(whereMock).toHaveBeenCalledWith({ email });
        expect(firstMock).toHaveBeenCalled();
        expect(bcrypt.compareSync).toHaveBeenCalledWith(password, mockUser.password);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: mockUser.id, name: mockUser.name, email: mockUser.email },
            process.env.TOKEN_KEY,
            { expiresIn: '48h' }
        );
    });

    it("should throw InvalidEmail if the user does not exist", async () => {
        const email = "notfound@example.com";
        const password = "password123";
    
        const selectMock = jest.fn().mockReturnThis();
        const whereMock = jest.fn().mockReturnThis();
        const firstMock = jest.fn().mockResolvedValue(null); // Simula um usuário não encontrado
    
        knex.mockImplementation(() => ({
            select: selectMock,
            where: whereMock,
            first: firstMock
        }));
    
        await expect(authService.login(email, password)).rejects.toThrow(InvalidEmail);
    
        expect(knex).toHaveBeenCalledWith('user');
        expect(selectMock).toHaveBeenCalledWith('id', 'name', 'email', 'password');
        expect(whereMock).toHaveBeenCalledWith({ email });
        expect(firstMock).toHaveBeenCalled();
    });

    it("should throw InvalidPassword if the password is incorrect", async () => {
        const email = "test@example.com";
        const password = "wrongpassword";
        const mockUser = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: "hashedPassword"
        };
    
        // Configuração correta do mock do knex para retornar um usuário
        const selectMock = jest.fn().mockReturnThis();
        const whereMock = jest.fn().mockReturnThis();
        const firstMock = jest.fn().mockResolvedValue(mockUser);
    
        knex.mockImplementation(() => ({
            select: selectMock,
            where: whereMock,
            first: firstMock
        }));

        bcrypt.compareSync.mockReturnValue(false);
    
        await expect(authService.login(email, password)).rejects.toThrow(InvalidPassword);

        expect(bcrypt.compareSync).toHaveBeenCalledWith(password, mockUser.password);
        expect(selectMock).toHaveBeenCalledWith('id', 'name', 'email', 'password');
        expect(whereMock).toHaveBeenCalledWith({ email });
        expect(firstMock).toHaveBeenCalled();
    });
})