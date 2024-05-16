module.exports = {
  post: {
    summary: "Request a password reset",
    parameters: [],
    security: [],
    tags: ["User"],
    requestBody: {
        description: "User's email",
        content: {
            "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "User's e-mail",
                      format: "email",
                    }
                  },
                  required: ["email"],
                }
            }
        }
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
                            example: "Código enviado para o e-mail!",
                            }
                        }
                    }
                }
            }
        },
        "400": {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseError400",
                    }
                }
            }
        }
    }
  }
}