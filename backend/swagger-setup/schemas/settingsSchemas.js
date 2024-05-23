
const createSetting = {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Irrigations name",
        example: "Configuração de Arroz",
        required: true
      },
      humidityValue: {
        type: "int8",
        description: "Humidity value to be consider",
        example: 50,
        required: true
      }
    },
}

const getSetting = {
    type: "object",
    properties: {
      id:{
        type: "int32",
        description: "Irrigation ID",
        example: 3
      },
      name:{
        type: "string",
        description: "Irrigations name",
        example: "Configuração de Arroz",
      },
      userId:{
        type: "int64",
        description: "Irrigation ID",
        example: 1598
      },
      sensorData_1: {
        type: "string",
        description: "Value obtained from sensor 1 (attempt to variable property name)",
        example: "60",
      },
      sensorData_2: {
        type: "string",
        description: "Value obtained from sensor 2 (attempt to variable property name)",
        example: "45",
      }
    },
    required: true
}


module.exports = {
    createSetting,
    getSetting
}