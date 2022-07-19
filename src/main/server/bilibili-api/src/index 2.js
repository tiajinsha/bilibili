require("./dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./routers");


const app = express();

if (process.env.NODE_ENV !== "production") {
    app.use(express.static("./"));
}

app.use(bodyParser.json());


app.use(routers);


module.exports = {
    app
}