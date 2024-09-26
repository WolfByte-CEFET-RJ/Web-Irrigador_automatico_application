const sendEmail = require("../../src/utils/sendEmail");
const sgMail = require("@sendgrid/mail");

jest.mock("@sendgrid/mail");

describe("Send Email", () => {
    const email = "teste@teste.com";
    const code = "1234";
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {})
        jest.spyOn(console, "error").mockImplementation(() => {})

    });

    it("should send an email successfully", async () => {
        sgMail.send.mockResolvedValue({});

        await sendEmail(email, code);

        expect(sgMail.send).toHaveBeenCalledWith({
            to: email,
            from: "wolfbytegames@gmail.com",
            subject: "Código de recuperação de senha",
            text: "Seu código de recuperação de senha é: 1234",
        });
        expect(console.log).toHaveBeenCalledWith("Email enviado com sucesso!");
    })

    it("should throw an error if email sending fails", async () => {
        const mockError = new Error("Erro ao enviar e-mail");
        sgMail.send.mockRejectedValue(mockError);

        await expect(sendEmail(email, code)).rejects.toThrow("Erro ao enviar e-mail");

        expect(console.error).toHaveBeenCalledWith("Erro ao enviar e-mail", mockError);
    })

})
