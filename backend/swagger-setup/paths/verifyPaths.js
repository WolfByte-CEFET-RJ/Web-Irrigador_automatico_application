module.exports = {
    post: {
        summary: "Verificação do código de validação da senha",
        tags: ["Usuário"],
        parameters: [
            {
                name:"email",
                in: "path",
                description: "Email do usuário",
                required: true,
                schema: {
                    type:"string",
                    format:"email",
                    example: "user@email.com"
                }
            }
        ],
        responses: {
            "200":{
                description: "Resultado esperado",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                description: "Token para validação temporária",
                                type: "string",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" 
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
            },
            "500":{
                description: "Erro interno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ResponseError500"
                        }
                    }
                }
            }
        }
    }
}