require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

const expressRoutes = require("./api/routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", expressRoutes);

app.listen(process.env.PORT, ()=>{
  console.log(`Server starting on ${process.env.PORT}`);
});