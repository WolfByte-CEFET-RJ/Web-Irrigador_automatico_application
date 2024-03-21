const knex = require('../database');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const sendEmail = require('../utils/sendEmail');
const moment = require('moment/moment');


module.exports = {
    async getAllUsers() {
        const users = await knex('user').select('id', 'name', 'email','code', 'expirationDate', 'humidityNotification', 'waterNotification');
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
          waterNotification,
          code: null
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
      
      },
      async fogotPassword(email) {
        const user = await knex('user').select('*').where({email}).first();
        if (!user){
            throw new Error('Este usuário não existe!')
        }

        const code = Math.round(Math.random() * 9999);
        const expirationDate = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
       
        await knex('user').where({email}).update({code, expirationDate});
    
        // chamar a função que enviará o código para o email
        await sendEmail(email, code);

        return 'Código enviado para o seu email!'

      },
      async verifyCode(email, code) {
        const user = await knex('user').select('*').where({email}).first();
        
        if (!user) {
            throw new Error('Este usuário não existe!')
        }
        if (typeof code != 'number' || user.code != code){
            throw new Error('Código inválido');
        }

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        if (moment(currentDateTime).isAfter(user.expirationDate)) {
            await knex('user').where({email}).update({code: null, expirationDate: null});
            throw new Error('Código expirado! Por favor, solicite um novo código!');
        }
        
        return true, 'Código válido! Você já pode recuperar sua senha!';
        
      },
      async resetPassword(email, password, confirmPassword) {
        const user = await knex('user').select('*').where({email}).first();
        const passwordSchema = yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres');
        if (!user) {
            throw new Error('Este usuário não existe!')
        }

        if (password != confirmPassword) {
            throw new Error('As senhas são diferentes!')
        }

        await passwordSchema.validate(password)
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        
        await knex('user').where({email}).update({
            password: hash,
            code: null,
            expirationDate: null
        })

        return 'Senha alterada com sucesso!';
      },
      
      // usar cron jobs ou alçgo do tipo para rodar regularmente.
      async cleanExpiredCodes() {
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await knex('user').where('expirationDate', '<', currentDateTime).update({code: null, expirationDate: null});
      }
};