const knex = require('../database');
const bcrypt = require('bcryptjs');
const yup = require('yup');


module.exports = {
    async getAllUsers() {
        const users = await knex('user').select('id', 'name', 'email', 'humidityNotification', 'waterNotification');
        return users;
    },

    async getUser(id) {
        const user = await knex('user').select('id', 'name', 'email', 'humidityNotification', 'waterNotification').where({id}).first();
        if (!user) {
            throw new Error('Usuário não existe!');
        }
        return user;
    },

    async createUser(name, email, password, humidityNotification, waterNotification) {
        const userCreateSchema = yup.object({
            name: yup.string().min(3,'O nome precisa ter pelo menos 3 caracteres').required('O campo nome é obrigatório.'),
            email: yup.string().email('O email precisa ser válido').required('O campo email é obrigatório.'),
            password: yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').required('O campo password é obrigatório.'),
            humidityNotification: yup.boolean(),
            waterNotification: yup.boolean()
        })
        await userCreateSchema.validate({name, email, password, humidityNotification, waterNotification})

        const user = await knex('user').select('email').where({email}).first();
        if (user) {
          throw new Error('Usuário já existe!');
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        await knex('user').insert({
          name,
          email,
          password: hash,
          humidityNotification,
          waterNotification
        })

        return "Usuário cadastrado!"
    },

    async updateUser(userId, userData) {
        const userUpdateSchema = yup.object({
            name: yup.string().min(3,'O nome precisa ter pelo menos 3 caracteres'),
            password: yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
            humidityNotification: yup.boolean(),
            waterNotification: yup.boolean()
        })

        if (userData.email){
            throw new Error('Não é permitido alterar o email');
        }

        await userUpdateSchema.validate(userData);

        const user = await this.getUser(userId); 
        if (!user){
            throw new Error('Este usuário não existe!')
        }

        if (userData.password){
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
        }

        return await knex('user').where({ id: userId }).update({name: userData.name, password: userData.password, humidityNotification: userData.humidityNotification, 
        waterNotification: userData.waterNotification});
      },

      async deleteUser(userId) {
        const user = await this.getUser(userId); 

        if (!user){
            throw new Error('Este usuário não existe!')
        }

        return knex('user').where({ id: userId }).del();
      }
};