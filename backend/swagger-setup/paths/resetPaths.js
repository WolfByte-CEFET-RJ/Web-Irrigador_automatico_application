module.exports = {
  post: {
    summary: "Reset password",
    security: [
      {
        Token_Autenticação: [],
      }
    ],
    tags: ["User"],
    requestBody: {
      description: "User's new password",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: {
                type: "string",
                description: "User's new password",
              },
              confirmPassword: {
                type: "string",
                description: "User's new password confirmation",
              },
            },
            required: ["password", "confirmPassword"],
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Expected response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Senha alterada com sucesso!",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResponseError400",
            },
          },
        },
      },
      "500": {
        description: "Intern server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResponseError500",
            },
          },
        },
      },
    },
  },
}