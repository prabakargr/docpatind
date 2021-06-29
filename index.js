const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const routes = require("./routes/index"); //new addition
var cors = require('cors')
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors())

app.use("/", (req, res) => {
  res.json({ message: "API Working" });
});

// app.use("/api",routes,
// swaggerUi.serve, 
//   swaggerUi.setup(swaggerDocument));
app.use('/api',routes)


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
