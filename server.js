const express = require("express");

//Set up express app
const app = express();
const PORT = process.env.PORT || 3060;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app
app.use(express.static("public"));


// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require('./controllers/burgers_controller.js');

app.use(routes);

app.listen(PORT, () => console.log(`App now listening at localhost:${PORT}`));
