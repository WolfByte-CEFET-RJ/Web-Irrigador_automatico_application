module.exports = {
    get: {
        summary: "View specifications of all user's irrigation settings",
        parameters: [],
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
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/ResponseGetSetting",
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
}