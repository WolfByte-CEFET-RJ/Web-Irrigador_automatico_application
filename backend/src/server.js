const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const scheduleTasks =  require('./utils/scheduleTasks');
const app = express();

app.use(cors());
app.use(express.json());
routes(app);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port || 5000, host, () => {
  console.log(`App listening on port ${port}`);
})