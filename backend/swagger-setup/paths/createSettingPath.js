module.exports = {
    post: {
        summary: "Create a irrigation setting",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Irrigation Settings"],
        requestBody: {
            description: "Irrigation setting data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestCreateSetting",
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
                                example: "Configuração cadastrada!",
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