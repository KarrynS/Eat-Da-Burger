const express = require("express");
const burger = require("../models/burger");


//TO DO: 4. Create the `router` for the app, 
//and export the `router` at the end of your file.

// Use Handlebars to render the main index.html page.
router.get('/', (req, res) => {
    connection.query('SELECT * FROM burgers;', (err, data) => {
      if (err) {
        return res.status(500).end();
      }
  
      res.render('index', { burger_name: data });
    });
  });








// Export routes to server.js file
module.exports = router;