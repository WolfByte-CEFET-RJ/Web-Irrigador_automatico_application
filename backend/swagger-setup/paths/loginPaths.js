module.exports = {
  post: {
    summary: "Login",
    parameters: [],
    security: [],
    tags: ["User"],
    requestBody: {
        description: "User's e-mail and password",
        content: {
            "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "User's e-mail",
                      format: "email",
                    },
                    password: {
                      type: "string",
                      description: "User's password",
                    }
                  },
                  required: ["email", "password"],
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
                            token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
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