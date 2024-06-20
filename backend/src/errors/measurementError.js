const { HttpCode, HttpError } = require('../utils/app.error');

class MeasurementsError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Measurement entity'}) {
        super({
            httpCode: httpCode,
            type: type,
            message: message
        });
    }
}

class SensorConfigurationNotFound extends MeasurementsError{
    constructor(){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Configuração do sensor não encontrada',
            type: 'ERR_SERVICE_MEASURES-SENSOR_CONFIG_NOT_FOUND'
        });
    }
}

module.exports = {
    MeasurementsError, 
    SensorConfigurationNotFound
}