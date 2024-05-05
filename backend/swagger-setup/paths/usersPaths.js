module.exports = {
    get: {
        summary: "Visualização de todos os usuários do sistema",
        parameters: [],
        security: [
            {
                Token_Autenticação: [],
            },
        ],
        tags: ["Usuário"],
        responses: {
            "200": {
                description: "Resultado esperado",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/ResponseUser",
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
            },
            "401": {
                description: "Token inválido.",
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