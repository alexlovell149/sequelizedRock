
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the bands
  app.get("/api/rock", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Rock.findAll({}).then(function(dbbands) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbbands);
    });
  });

  // POST route for saving a new todo
  app.post("/api/rock", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Rock.create({
      band_name: req.body.band_name,
      hall_of_fame: req.body.hall_of_fame
    }).then(function(dbbands) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbbands);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/rock/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Rock.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbbands) {
      res.json(dbbands);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/rock", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Rock.update({
      band_name: req.body.band_name,
      hall_of_fame: req.body.hall_of_fame
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbbands) {
      res.json(dbbands);
    });
  });
};
