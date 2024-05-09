module.exports = {
    post: {
        summary: "Password validation code check",
        tags: ["User"],
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
                description: "Bad request",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ResponseError400",
                        }
                    }
                }
            },
            "500":{
                description: "Intern server error",
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