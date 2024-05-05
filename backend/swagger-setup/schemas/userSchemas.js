
const ResponseUser = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "Código de Identificação do Usuário",
        format: "int64",
      },
      name: {
        type: "string",
        description: "Nome do usuário",
        example: "João Pedro",
      },
      email: {
        type: "string",
        description: "E-mail do usuário",
        format: "email",
      },
      code: {
        type: "integer",
        description: "Código de verificação da senha",
        example: 12335,
      },
      expirationDate: {
        type: "string",
        description: "Data de validade do código de verificação",
        format: "date-time",
      },
      humidityNotification: {
        type: "int8",
        description: "Permissão de notificação de humidade - Default: 1",
        enum: [0, 1],
        example: 1,
      },
      waterNotification: {
        type: "int8",
        description: "Permissão de notificação de humidade - Default: 1",
        enum: [0, 1],
        example: 1,
      }
    }
}

const RequestUser = {
    type: "object",
    properties: {
        name: {
          type: "string",
          description: "Nome do usuário",
          example: "João Pedro",
        },
        email: {
          type: "string",
          description: "E-mail do usuário",
          format: "email",
        },
        password: {
          type: "string",
          description: "Senha do usuário",
          example: "HuP.45##",
        },
        humidityNotification: {
          type: "boolean",
          description: "Permissão de notificação de humidade - Default: true",
          example: true,
        },
        waterNotification: {
          type: "boolean",
          description: "Permissão de notificação de humidade - Default: true",
          example: false,
        }
    },
    required: ["name", "email", "password"],
}   

module.exports = {
    RequestUser,
    ResponseUser
}