require("./dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./routers");

const crossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    next();
}


const app = express();

if (process.env.NODE_ENV !== "production") {
    app.use(express.static("./"));
}

app.use(bodyParser.json());


app.use(routers);
app.use(crossDomain);


module.exports = {
    app
}