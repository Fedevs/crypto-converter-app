const express = require("express");
const cors = require("cors");
const app = express();

// settings
app.set("port", process.env.PORT || 8080);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
app.use("/", require("./routes/index"));

module.exports = app;
