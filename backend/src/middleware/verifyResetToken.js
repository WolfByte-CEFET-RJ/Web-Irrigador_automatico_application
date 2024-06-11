const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const resetToken = req.headers['x-reset-token'];

  if (!resetToken) {
    return res.status(400).json({ message: 'Token não encontrado nos cabeçalhos da requisição' });
  }

  try {
    const decodedToken = jwt.verify(resetToken, process.env.TOKEN_KEY);

    if (decodedToken.type !== 'reset') {
      throw new Error('Token inválido para redefinição de senha');
    }

    req.email = decodedToken.email;
    next();
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
};