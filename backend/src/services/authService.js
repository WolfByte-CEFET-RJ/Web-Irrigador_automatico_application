const { compareSync } = require("bcryptjs");
const knex = require("../database/");
const jwt = require("jsonwebtoken");
const yup = require("yup");
require("dotenv").config();

module.exports = {
    async login(email, password){
        const userValidation = yup.object({
            email: yup.string().email("O email inserido não está em um formato válido.").required(),
            password: yup.string().required()
        });

        await userValidation.validate({email, password}); // Valida os dados de entrada (email e senha)

        const user = (await knex("user").select("id", "name", "email", "password").where({email}).first());

        if (!user){
            throw new Error("O email informado não foi cadastrado!");
        }

        if (!(compareSync(password, user.password))){ // Compara a senha informada com a senha no banco de dados usando bcrypt
            throw new Error("Senha incorreta!");
        }

        const token = jwt.sign( // Cria um token de autenticação com as informações do usuário
            {id: user.id, name: user.name, email: user.email}, 
            process.env.TOKEN_KEY, // Chave secreta para assinar o token, obtida do arquivo .env
            {expiresIn: '48h'} // Define o tempo de expiração do token
        );

        return token;
    }
}