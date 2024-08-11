const { request } = require("express");

module.exports = {
    post: {
        summary: "Reset password validation code check",
        tags: ["User"],
        /*security: [
            {
                Token_Autenticação: [],
            }
        ],*/
        parameters: [
            {
                name:"email",
                in: "path",
                description: "User's email",
                required: true,
                schema: {
                    type:"string",
                    format:"email",
                    example: "user@email.com"
                }
            }
        ],
        requestBody: {
            description: "User's validation code",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            code: {
                                type: "integer",
                                description: "User's validation code",
                                example: 1234
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200":{
                description: "Expected response",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                description: "Token for temporary validation",
                                type: "string",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" 
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                description: "Incorrect code format in request",
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