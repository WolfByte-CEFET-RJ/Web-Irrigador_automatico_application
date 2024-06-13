//Enumeração dos status code
const HttpCode = {
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    TOO_MANY_REQUESTS: 429,
    UNPROCESSABLE_CONTENT: 422,
    INTERNAL_SERVER_ERROR: 500,
}


class HttpError extends Error {
    constructor({ httpCode, type, message = 'An error ocurred while processing the request'}) {
        // A superclasse Error já define 'this.message = message'
        super(message); 

        this.httpCode = httpCode;
        
        //formato de 'type': ERR_<TIPO DE ARQUIVO>_<ENTIDADE>_<PROBLEMA ENCONTRADO>
        this.type = type; 
        
        if (Error.captureStackTrace) {
            //Salva pilha de execução até o momemto em que o erro foi lançado
            Error.captureStackTrace(this, this.constructor);
        }
      }
}

module.exports = { HttpCode, HttpError };