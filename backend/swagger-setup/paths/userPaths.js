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