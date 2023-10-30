const { compareSync } = require("bcrypt");
const knex = require("../database/");
const jwt = require("jsonwebtoken");
const yup = require("yup");

module.exports = {
    async login(email, password){
        const userValidation = yup.object({
            email: yup.string().email("O email inserido não está em um formato válido."),
            password: yup.string()
        });
    }
}