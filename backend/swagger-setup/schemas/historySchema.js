const getHistory = {
    type: "object",
    properties: {
      gardenName: {
        type: "string",
        description: "name of the garden that was irrigated",
        example: "Horta1"
      },
      date: {
        type: "date",
        description: "irrigation date",
        example: "15:05:38 de 13/04/2024",
      }
    }
}

module.exports = {
    getHistory,
}
