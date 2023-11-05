const knex = require('../database');
const bcrypt = require('bcryptjs');
const yup = require('yup');

userSchema = yup.object({
    name: yup.string().min(3,'O nome precisa ter pelo menos 3 caracteres'),
    email: yup.string().email('O email precisa ser válido'),
    password: yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    humidityNotification: yup.boolean(),
    waterNotification: yup.boolean()
})


module.exports = {
    async getAllUsers() {
        const users = await knex('user').select('id', 'name', 'email', 'humidityNotification', 'waterNotification');
        return users;
    },

    async getOneUser(id) {
        const user = await knex('user').select('id', 'name', 'email', 'humidityNotification', 'waterNotification').where({id}).first();
        if (!user) {
            throw new Error('Usuário não existe!');
        }
        return user;
    },

    async createUser(name, email, password, humidityNotification, waterNotification) {
        await userSchema.validate({name, email, password, humidityNotification, waterNotification})
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
        await userSchema.validate(userData, {abortEarly: false});
        const user = await this.getOneUser(userId); 
        if (!user){
            throw new Error('Este usuário não existe!')
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(userData.password, salt);

        return await knex('user').where({ id: userId }).update({name: userData.name, email: userData.email, password: hash, humidityNotification: userData.humidityNotification, waterNotification: userData.waterNotification} );
        
       
      },
      async deleteUser(userId) {
        
        const user = await this.getOneUser(userId); 
        if (!user){
            throw new Error('Este usuário não existe!')
        }
        return knex('user').where({ id: userId }).del();
      
      }
};