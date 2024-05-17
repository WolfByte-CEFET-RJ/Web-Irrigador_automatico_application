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
      example: "Horta com arroz de todos os tipos que produzo(incluindo arroz branco, arroz basmati, arroz jasmin, etc)."
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
    irrigationId: {
      type: "string",
      description: "Garden ID irrigation settings",
      example: "1",
    },
  },
}

const lastMeasurements = {
  type: "array",
  description: "Last measurements of the garden",
  items: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Measurement ID",
        example: "15"
      },
      measurement: {
        type: "string",
        description: "Measurement",
        example: "13"
      },
      date: {
        type: "string",
        description: "Measurement date",
        example: "2024-05-11T01:47:12.000Z"
      },
      sensorId: {
        type: "string",
        description: "Sensor ID",
        example: "1"
      },
      gardenId: {
        type: "string",
        description: "Garden ID",
        example: "10"
      },
    }
  }

}

const measuresGardens = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Garden ID",
      example: "10"
    },
    name: {
      type: "string",
      description: "Garden name",
      example: "Horta de Arroz"
    },
    description: {
      type: "string",
      description: "Description of the garden",
      example: "Horta com arroz de todos os tipos que produzo (incluindo arroz branco, arroz basmati, arroz jasmin, etc)."
    },
    identifier: {
      type: "string",
      description: "Garden identifier",
      example: "8954123647"
    },
    userId: {
      type: "string",
      description: "User belonging to the garden",
      example: "5"
    },
    irrigationId: {
      type: "string",
      description: "Irrigation ID",
      example: "1"
    },
    lastMeasures: lastMeasurements,
    message: {
      type: "string",
      description: "Warning message",
      example: "Nível de umidade baixo. Sua planta precisa ser irrigada!"
    },
    settingName: {
      type: "string",
      description: "Garden setup",
      example: "Default Setting"
    }
  }
}

const measuresGarden = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Garden ID",
      example: "10"
    },
    name: {
      type: "string",
      description: "Garden name",
      example: "Horta de Arroz"
    },
    description: {
      type: "string",
      description: "Description of the garden",
      example: "Horta com arroz de todos os tipos que produzo (incluindo arroz branco, arroz basmati, arroz jasmin, etc)."
    },
    identifier: {
      type: "string",
      description: "Garden identifier",
      example: "8954123647"
    },
    userId: {
      type: "string",
      description: "User belonging to the garden",
      example: "5"
    },
    irrigationId: {
      type: "string",
      description: "Irrigation ID",
      example: "1"
    },
    lastMeasures: lastMeasurements,
    message: {
      type: "string",
      description: "Warning message",
      example: "Nível de umidade baixo. Sua planta precisa ser irrigada!"
    }
  }
}

module.exports = {
  createGarden,
  getGarden,
  updateGarden,
  measuresGardens,
  measuresGarden
}