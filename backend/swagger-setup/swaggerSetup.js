const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

const swaggerRoute = require("express").Router();

swaggerRoute.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = swaggerRoute;