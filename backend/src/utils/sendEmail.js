const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


async function sendEmail(email, code) {
  const msg = {
    to: email,
    from: 'wolfbytegames@gmail.com', 
    subject: 'Código de recuperação de senha',
    text: `Seu código de recuperação de senha é: ${code}`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail', error);
    throw new Error('Erro ao enviar e-mail');
  }
}

module.exports = sendEmail;