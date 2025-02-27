module.exports = {
    type: "object",
    properties: {
        code: {
            type: "number",
            description: "Status code of the http response",
            example: "Status Code",
        },
        message: {
            type: "string",
            description: "Description of the error",
            example: "Detailed message",
        },
        type: {
            type: "string",
            description: "Information about code and the entity that sended the error response",
            example: "ERR_LAYER_ENTITY_ERROR-NAME",
        }
    }
}