module.exports = {
  Token_Autenticação: {
    in: "header",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  }
}