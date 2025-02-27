const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./userRoutes.js');
const auth = require('./authRoutes.js');
const garden = require('./gardenRoutes.js');
const irrigationSetting = require('./irrigationSettingRoutes.js');
const irrigationHistory = require('./irrigationHistoryRoutes.js');
const swagger = require("../../swagger-setup/swaggerSetup.js"); 

module.exports = (app) => {
  app
    .use(bodyParser.json())
    .use(cors())
    .use(user)
    .use(auth)
    .use(garden)
    .use(irrigationSetting)
    .use(irrigationHistory)
    .use(swagger);

  app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'Hello World' });
  });
};
