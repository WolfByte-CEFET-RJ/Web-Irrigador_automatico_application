module.exports = {
    get: {
        summary: "View specifications of one irrigation setting",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Irrigation ID (if not informed, route should behaves like /userSettings)",
                required: false,
                schema: {
                    type:"string",
                    example: "2"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Irrigation Settings"],
        responses: {
            "200": {
            description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                                $ref: "#/components/schemas/ResponseGetSetting"
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
    },
    patch: {
        summary: "Update specifications of one irrigation setting",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Irrigation Setting ID",
                required: true,
                schema: {
                    type:"string",
                    example: "2"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Irrigation Settings"],
        requestBody: {
            description: "Irrigation Setting data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestUpdateSetting",
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
                                example: "Configuração atualizada com sucesso!",
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
                description: "Token Inválido",
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

    delete: {
        summary: "Detele a irrigation setting (cannot be undone)",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Irrigation Setting ID",
                required: true,
                schema: {
                    type:"string",
                    example: "2"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Irrigation Settings"],
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
                                example: "Configuração deletada com sucesso!",
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