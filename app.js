const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

// Requiring dotenv package for using environment variables from .env file while development
require("dotenv").config()

// Using body parser to support parsing of application/json type post data and parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy root api for init commit
app.use('/', (req, res) => {
    res.send("Sup my brother from another mother?!")
});

app.listen(port, () => console.log(`Listening on port ${port}`));