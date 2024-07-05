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
        description: "Incorrect format request",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ResponseError",
                }
            }
        }
      },
      "401": {
        description: "Authorization not received",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ResponseError",
                }
            }
        }
      },
      "404": {
          description: "User not found",
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/ResponseError",
                  }
              }
          }
      },
      "500": {
          description: "Internal server error",
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties:{
                          message:{
                              type: "string",
                              description: "Error message",
                              example: "Internal error while processing the request"
                          }
                      }
                  }
              }
          }
      }
    }
  },
}