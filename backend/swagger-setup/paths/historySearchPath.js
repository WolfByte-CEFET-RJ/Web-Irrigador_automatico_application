module.exports = {
    get: {
        summary: "Returns the irrigation history of a user's garden",
        parameters: [
            {
                name: "name",
                in: "query",
                required: true,
                description: "The name of the garden to search for",
                schema: {
                    type: "string",
                    example: "Horta2"
                }
            }
        ],
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
                            $ref: "#/components/schemas/ResponseError400History",
                        }
                    }
                }
            },
            "401": {
                description: "Invalid credential",
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
    }
}
