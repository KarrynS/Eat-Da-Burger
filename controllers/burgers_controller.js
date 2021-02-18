const express = require("express");
const burger = require("../models/burger");
const router = express.Router();

// Use Handlebars to render the main index.html page.
router.get('/', (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    //console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//ADD
router.post('/', (req, res) => {
  burger.create(["burger_name"], [req.body.name], (result) => {
    res.json({ id: result.insertId});
  })
})

//DEVOUR
router.put('/api/burgers/:id', (req, res) => {
  let condition = `id =` + req.params.id;
  //console.log('condition:', condition);
  burger.update(
    {
      devoured: req.body.devoured
    }, 
    condition, 
    (result) => {
      if(result.changedRows === 0){
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// Export routes to server.js file
module.exports = router;