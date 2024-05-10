const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.js');

const swaggerRoute = require("express").Router();

//console.log(swaggerDocument);

swaggerRoute.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = swaggerRoute;