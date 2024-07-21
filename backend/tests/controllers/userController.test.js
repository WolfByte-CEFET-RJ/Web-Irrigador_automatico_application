const userController = require("../../src/controllers/userController.js")
const userService = require("../../src/services/userService.js")
const { HttpCode } = require("../../src/utils/app.error.js")

jest.mock("../../src/services/userService.js")

describe("User Controller", () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe("Get All Users", () => {
        it('should return a list of users with status OK', async () => {

            // mocking
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const users =[
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

            const errorMessage = "";
            userService.getAllUsers.mockRejectedValue(new Error(""));
            
            // execução
            await userController.getAllUsers(req, res);
            
            // asserts
            expect(res.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    })

    // describe("Get One User", () => {
    //     it("...", () => {

    //     })
        
    // })

    
})