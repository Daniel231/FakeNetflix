const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const app = express();
const showsRoute = require('./routes/shows');

// Requiring dotenv package for using environment variables from .env file while development
require("dotenv").config()

// Using body parser to support parsing of application/json type post data and parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing for the shows api
app.use('/shows', showsRoute);

// Running the app on specified port with express.
app.listen(port, () => console.log(`Listening on port ${port}`));