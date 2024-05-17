module.exports = {
    get: {
        summary: "View data from the user's latest garden measurements",
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Garden's ID (if not informed, route should behaves like /measures/garden)",
                required: false,
                schema: {
                    type: "string",
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
                            $ref: "#/components/schemas/ResponseGetMeasuresGarden",
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