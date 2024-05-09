
const getUsers = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "User identification code",
        format: "int64",
      },
      name: {
        type: "string",
        description: "User's name",
        example: "João Pedro",
      },
      email: {
        type: "string",
        description: "User's email",
        format: "email",
      },
      code: {
        type: "integer",
        description: "Password verification code (null if not '/forgot_password') ",
        example: 12335,
      },
      expirationDate: {
        type: "string",
        description: "Expiration date of the verification code (null if not '/forgot_password')",
        format: "date-time",
      },
      humidityNotification: {
        type: "int8",
        description: "Humidity notification permission - Default: 1",
        enum: [0, 1],
        example: 1,
      },
      waterNotification: {
        type: "int8",
        description: "Water notification permission - Default: 1",
        enum: [0, 1],
        example: 1,
      }
    }
}

const getUser = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      description: "User identification code",
      format: "int64",
    },
    name: {
      type: "string",
      description: "User's name",
      example: "João Pedro",
    },
    email: {
      type: "string",
      description: "User's email",
      format: "email",
    },
    humidityNotification: {
      type: "int8",
      description: "Humidity notification permission - Default: 1",
      enum: [0, 1],
      example: 1,
    },
    waterNotification: {
      type: "int8",
      description: "Water notification permission - Default: 1",
      enum: [0, 1],
      example: 1,
    }
  }
}

const createUser = {
    type: "object",
    properties: {
        name: {
          type: "string",
          description: "User's name",
          example: "João Pedro",
        },
        email: {
          type: "string",
          description: "User's e-mail",
          format: "email",
        },
        password: {
          type: "string",
          description: "User's password",
          example: "HuP.45##",
        },
        humidityNotification: {
          type: "boolean",
          description: "Humidity notification permission - Default: true",
          example: true,
        },
        waterNotification: {
          type: "boolean",
          description: "Water notification permission - Default: true",
          example: false,
        }
    },
    required: ["name", "email", "password"],
}   

const updateUser = {
  type: "object",
  properties: {
      name: {
        type: "string",
        description: "User's name",
        example: "João Pedro",
      },
      password: {
        type: "string",
        description: "User's password",
        example: "HuP.45##",
      },
      humidityNotification: {
        type: "boolean",
        description: "Humidity notification permission - Default: true",
        example: true,
      },
      waterNotification: {
        type: "boolean",
        description: "Water notification permission - Default: true",
        example: false,
      }
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser
}