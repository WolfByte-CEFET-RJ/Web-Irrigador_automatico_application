module.exports = {
    post: {
        summary: "Register a user",
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
            "201": {
                description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                type: "string",
                                example: "Usuário cadastrado!",
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

    get: {
    summary: "View data of one registered user",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["User"],
        responses: {
            "200": {
                description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                                $ref: "#/components/schemas/ResponseGetUser"
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

    patch: {
        summary: "Update data of a registered user",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["User"],
        requestBody: {
            description: "User's new data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestUpdateUser",
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
                                example: "Usuário atualizado com sucesso",
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
            "409": {
                description: "Conflict in change email adress",
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
            },
        }
    },

    delete: {
        summary: "Detele a user (cannot be undone)",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["User"],
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
                                example: "Usuário deletado com sucesso!",
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
    }
    
}