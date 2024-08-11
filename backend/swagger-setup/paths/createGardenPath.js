module.exports = {
    post: {
        summary: "Create a garden for user to manage",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Garden"],
        requestBody: {
            description: "Garden's data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestCreateGarden",
                    }
                }
            }
        },
        responses: {
            "201": {
                description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                type: "string",
                                example: "Horta cadastrada!",
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                description: "Validaton Error",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties:{
                                message:{
                                    type: "string",
                                    description: "Validation error message",
                                    example: "Some of the information provided is poorly formatted"
                                }
                            }
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