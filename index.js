const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

const expressLayout = require('express-ejs-layouts');
// importing the mongoose
const db = require('./config/mongoose');



app.use(express.urlencoded());
app.use(expressLayout);
app.use(express.static(env.asset_path));


app.use(logger(env.morgan.mode, env.morgan.options));

// to extract the style and js from different layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)



// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views')

// use express router
app.use('/', require("./routes"));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`The server is up and running on port ${port}`);
})

