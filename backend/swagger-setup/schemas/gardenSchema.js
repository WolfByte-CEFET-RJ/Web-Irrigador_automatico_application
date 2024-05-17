const createGarden = {
    type: "object",
    properties: {
        name: {
          type: "string",
          description: "Garden's name",
          example: "Horta de Arroz",
        },
        description: {
          type: "string",
          description: "Garden's description",
          example: "Horta com arroz de todos os tipos que produzo (incluindo arroz branco, arroz basmati, arroz jasmin, etc)."
        },
        identifier: {
          type: "string",
          description: "Garden's numeric identifier",
          example: "8954123647",
        }
    },
    required: ["identifier", "name"]
}  

const getGarden = {
  type: "object",
    properties: {
        id: {
          type: "string",
          description: "Garden's system generated ID",
          example: "10",
        },
        name: {
          type: "string",
          description: "Garden's name",
          example: "Horta de Arroz",
        },
        description: {
          type: "string",
          description: "Garden's description",
          example: "Horta com arroz de todos os tipos que produzo (incluindo arroz branco, arroz basmati, arroz jasmin, etc)."
        },
        identifier: {
          type: "string",
          description: "Garden's numeric identifier",
          example: "8954123647",
        },
        userId: {
          type: "string",
          description: "User who owns the garden",
          example: "945",
        },
        irrigationId: {
          type: "string",
          description: "Garden ID irrigation settings",
          example: "1",
        },  
    },
}

const updateGarden = {
  type: "object",
    properties: {
        name: {
          type: "string",
          description: "Garden's name",
          example: "Horta de Feijão",
        },
        description: {
          type: "string",
          description: "Garden's description",
          example: "Horta com feijões brancos"
        },
        identifier: {
          type: "string",
          description: "Garden's numeric identifier",
          example: "7458961247",
        },
        irrigationId: {
          type: "string",
          description: "Garden ID irrigation settings",
          example: "3",
        },  
    },
}

module.exports = {
    createGarden,
    getGarden,
    updateGarden
}