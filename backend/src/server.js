const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use("/", routes);

const port = 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})