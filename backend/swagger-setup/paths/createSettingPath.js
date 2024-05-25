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
                            $ref: "#/components/schemas/ResponseError400",
                        }
                    }
                }
            },
            "401": {
                description: "Token Inválido",
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