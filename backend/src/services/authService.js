const { compareSync } = require("bcrypt");
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

        await userValidation.validate({email, password});

        const user = (await knex("user").select("id", "name", "email", "password").where({email}).first());

        if (!user){
            throw new Error("O email informado não foi cadastrado!");
        }

        if (!(compareSync(password, user.password))){
            throw new Error("Senha incorreta!");
        }

        const token = jwt.sign(
            {id: user.id, name: user.name, email: user.email}, 
            process.env.TOKEN_KEY,
            {expiresIn: '48h'}
        );

        return token;
    }
}