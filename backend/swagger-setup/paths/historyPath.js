module.exports = {
    get: {
        summary: "Returns the irrigation history of all user's gardens",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Irrigation History"],
        responses: {
            "200": {
                description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/ResponseGetHistory",
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
            },
            "401": {
                description: "Invalid credential",
                    content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ResponseError401",
                        }
                    }
                }
            }
        }
    }
}
