module.exports = {
    post: {
        summary: "Cadastro de um usuário",
        parameters: [],
        tags: ["Usuário"],
        requestBody: {
            description: "Dados do usuário",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RequestUser",
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Resultado esperado",
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
                description: "Requisição Inválida",
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