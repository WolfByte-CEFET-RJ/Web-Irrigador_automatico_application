module.exports = {
    get: {
        summary: "View data of one or all user's gardens",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Garden's ID (if not informed, route should behaves like /myGardens)",
                required: false,
                schema: {
                    type:"string",
                    example: "5"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Garden"],
        responses: {
            "200": {
            description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                                $ref: "#/components/schemas/ResponseGetGarden"
                        }
                    }
                }
            },"401": {
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
                description: "Garden not found",
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
        summary: "Update data of one garden",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Garden's ID",
                required: false,
                schema: {
                    type:"string",
                    example: "5"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Garden"],
        requestBody: {
            description: "Garden's new data",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestUpdateGarden",
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
                                example: "Horta atualizada com sucesso!",
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
                description: "Resource not found",
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
        summary: "Detele a garden (cannot be undone)",
        parameters: [
            {
                name:"id",
                in: "path",
                description: "Garden's ID",
                required: false,
                schema: {
                    type:"string",
                    example: "5"
                }
            }
        ],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Garden"],
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
                                example: "Horta deletada com sucesso!",
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