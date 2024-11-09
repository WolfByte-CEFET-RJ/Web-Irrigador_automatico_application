const { havingWrapped } = require('../database');
const { HttpCode, HttpError } = require('../utils/app.error');

class GardenError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Garden entity'}) {
        super({
            httpCode: httpCode,
            type: type,
            message: message
        });
    }
}

class IdentifierNotFound extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.NOT_FOUND,
            type: 'ERR_SERVICE_GARDEN-IDENTIFIER_NOT_FOUND',
            message: 'O identificador inserido não pertence a uma horta existente!',
        });
    }
}

class GardenNotFound extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Esta horta não existe',
            type: 'ERR_SERVICE_GARDEN-GARDEN_NOT_FOUND'
        });
    }
}

class NoGardenRegistered extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'O usuário não possui hortas criadas',
            type: 'ERR_SERVICE_GARDEN-NO_GARDENS_CREATED'
        });
    }
}

class IdentifierAlreadyAssociated extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.CONFLICT,
            message: 'O identificador inserido já pertence a uma horta!',
            type: 'ERR_SERVICE_GARDEN-IDENTIFIER_ALREADY'
        });
    }
}
class UnauthorizedGardenUpdate extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você só pode atualizar sua própria horta',
            type: 'ERR_SERVICE_GARDEN-UNAUTHORIZED_GARDEN_UPDATE'
        });
    }
}

class UnauthorizedUserIdUpdate extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você não pode alterar o userId',
            type: 'ERR_SERVICE_GARDEN-UNAUTHORIZED_USERID_UPDATE'
        });
    }
}

class UnauthorizedGardenDelete extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você só pode deletar sua própria horta',
            type: 'ERR_SERVICE_GARDEN-UNAUTHORIZED_USERID_UPDATE'
        });
    }
}

class UnauthorizedGardenReturn extends GardenError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Esta horta não pertence a você!',
            type: 'ERR_SERVICE_GARDEN-UNAUTHORIZED_GARDEN_RETURN'
        });
    }
}


module.exports = {
    GardenError,
    IdentifierNotFound,
    IdentifierAlreadyAssociated,
    UnauthorizedGardenUpdate,
    UnauthorizedUserIdUpdate,
    GardenNotFound,
    NoGardenRegistered,
    UnauthorizedGardenDelete,
    UnauthorizedGardenReturn
}