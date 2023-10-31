const { compareSync } = require("bcrypt");
const knex = require("../database/");
const jwt = require("jsonwebtoken");
const yup = require("yup");

module.exports = {
    async login(email, password){
        const userValidation = yup.object({
            email: yup.string().email("O email inserido não está em um formato válido.").required(),
            password: yup.string().required()
        });

        await userValidation.validate({email, password});

        const user = (await knex("user").select("email", "password").where({email}).first());

        if (!user){
            throw new Error("O email informado não foi cadastrado!");
        }

        if (!(compareSync(password, user.password))){
            throw new Error("Senha incorreta!");
        }
    }
}