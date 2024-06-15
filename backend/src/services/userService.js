const knex = require('../database');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const sendEmail = require('../utils/sendEmail');
const moment = require('moment/moment');
const { CodeExpired, InvalidCode, NoCode, PasswordMismatch, UserNotFound, AlreadyExists, NotAllowedChangeEmail } = require('../errors/userError');

module.exports = {
    // Método para obter todos os usuários
    async getAllUsers() {
        const users = await knex('user').select('id', 'name', 'email', 'code', 'expirationDate', 'humidityNotification');
        return users;
    },

    // Método para obter um usuário específico por ID
    async getUser(id) {
        const user = await knex('user').select('id', 'name', 'email', 'humidityNotification').where({ id }).first();
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    },

    // Método para criar um novo usuário
    async createUser(name, email, password, humidityNotification) {
        const userCreateSchema = yup.object({ // Define o esquema de validação para criar um usuário
            name: yup.string().min(3, 'O nome precisa ter pelo menos 3 caracteres').required('O campo nome é obrigatório.'),
            email: yup.string().email('O email precisa ser válido').required('O campo email é obrigatório.'),
            password: yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').required('O campo password é obrigatório.'),
            humidityNotification: yup.boolean()
        });
        await userCreateSchema.validate({ name, email, password, humidityNotification});

        const user = await knex('user').select('email').where({ email }).first();
        if (user) {
            throw new AlreadyExists();
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        await knex('user').insert({
            name,
            email,
            password: hash,
            humidityNotification,
            code: null // Define o código como nulo inicialmente
        });

        return "Usuário cadastrado!";
    },

    // Método para atualizar os dados de um usuário
    async updateUser(userId, userData) {
        const userUpdateSchema = yup.object({ // Define o esquema de validação para atualizar um usuário
            name: yup.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
            password: yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
            humidityNotification: yup.boolean()
        });

        if (userData.email) {
            throw new NotAllowedChangeEmail();
        }

        await userUpdateSchema.validate(userData);

        const user = await this.getUser(userId);
        if (!user) {
            throw new UserNotFound();
        }

        if (userData.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
        }

        return await knex('user').where({ id: userId }).update({
            name: userData.name,
            password: userData.password,
            humidityNotification: userData.humidityNotification
        });
    },

    // Método para deletar um usuário
    async deleteUser(userId) {
        const user = await this.getUser(userId);

        if (!user) {
            throw new UserNotFound();
        }

        return knex('user').where({ id: userId }).del();
    },

    async forgotPassword(email) {
		const user = await knex('user').select('*').where({ email }).first();
		if (!user){
			throw new UserNotFound();
		}

		const code = Math.round(Math.random() * 9999);
		const expirationDate = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
		
		await knex('user').where({email}).update({ code, expirationDate });

		// chamar a função que enviará o código para o email
		await sendEmail(email, code);

		return 'Código enviado para o seu email!'

    },

    async verifyCode(email, code) {
		const user = await knex('user').select('*').where({ email }).first();
		
		if (!user) {
			throw new UserNotFound();
		}
		if (typeof code != 'number' || user.code != code){
			throw new InvalidCode();
		}

		const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
		if (moment(currentDateTime).isAfter(user.expirationDate)) {
			await knex('user').where({email}).update({ code: null, expirationDate: null });
			throw new CodeExpired();
		}
		
		return true, 'Código válido! Você já pode recuperar sua senha!';
      
    },
    
    async resetPassword(email, password, confirmPassword) {
		const user = await knex('user').select('*').where({email}).first();
		const passwordSchema = yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres');
		if (!user) {
			throw new UserNotFound();
		}

		if (password != confirmPassword) {
			throw new PasswordMismatch();
		}

		await passwordSchema.validate(password)

		if (!user.code) {
			throw new NoCode();
		}
			
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, salt);
		
		await knex('user').where({email}).update({
			password: hash,
			code: null,
			expirationDate: null
		})

		return 'Senha alterada com sucesso!';
    },
    
    // usar cron jobs ou algo do tipo para rodar regularmente.
    async cleanExpiredCodes() {
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      await knex('user').where('expirationDate', '<', currentDateTime).update({code: null, expirationDate: null});
    }
};