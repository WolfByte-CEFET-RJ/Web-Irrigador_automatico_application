module.exports = {
    post: {
        summary: "Registering a user",
        parameters: [],
        tags: ["User"],
        requestBody: {
            description: "User's data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestCreateUser",
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
                                example: "Usuário cadastrado",
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