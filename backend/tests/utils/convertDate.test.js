const convertDate = require("../../src/utils/convertDate");

describe("UTILS - Convert Date", () => {
    
    beforeEach(() => { // mockando console.warn para não mostar o warn do moment sobre formatação em 'npm test' 
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    
    afterEach(() => {
        console.warn.mockRestore();
    });

    it("should convert any date format to HH:mm:ss [de] DD/MM/YYYY (pt timezone)", () => {
        const datas = [
            "09/21/2024 10:00:00",           
            "September 21, 2024 10:00:00",   
            "21 September 2024 10:00:00",    
            "2024.09.21 10:00:00",           
            "2024/09/21 10:00:00",          
            "Sat, 21 Sep 2024 13:00:00 GMT", 
            "2024-09-21T13:00:00Z",          
            "2024-09-21 10:00:00.000",       
            "10:00:00 2024-09-21",           
        ];

        const expectedFormat = "10:00:00 de 21/09/2024";

        datas.forEach(date => {
            const format = convertDate(date);
            expect(format).toBe(expectedFormat);
        });
    });

    it("should return a Invalid Date message when input date is invalid", () => {
        const datas = [
            "21/09/2024 10:00:00",
            "21092024100000",
            "qualquer texto",
            "21.09.2024 10:00:00"
        ];

        datas.forEach(date => {
            const format = convertDate(date);
            expect(format).toBe("Invalid date");
        });
    });
});

