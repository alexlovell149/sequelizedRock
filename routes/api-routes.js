// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the bands
    app.get("/", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Rock.findAll({
            include: [db.Genre]
        }).then(function(dbbands) {
            var hbsObject = { band_name: dbbands };
            res.render("index", hbsObject);

        }).catch(function(err) {
            console.log(err);
        });
    });

    // POST route for saving a new band
    app.post("/index/create", function(req, res) {
        console.log(req.body);

        db.Rock.create({
            band_name: req.body.band_name,
            hall_of_fame: req.body.hall_of_fame
        }).then(function(dbbands) {
            console.log("Added band!");
            res.redirect("/");
            // We have access to the new band as an argument inside of the callback function
            // res.json(dbbands);
        });
    });

    app.put('/index/update/:id', function(req, res) {
        //update Temperatures table and burgers table
        db.Genre.create({
            genre: req.body.genre,
            band_id: req.params.id
        }, {
            where: { id: req.params.id }
        }).then(function(dbbands) {
            console.log("Genre updated: " + req.body.genre);
            res.json(dbbands);
        });

        db.Rock.update({
            // project_name: req.body.project_name,
            band_name: req.body.band_name,
            hall_of_fame: req.body.hall_of_fame
        }, {
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.redirect("/");
        });
    });



    // DELETE route for deleting bands. We can get the id of the band to be deleted from
    // req.params.id
    app.delete("/index/delete/:id", function(req, res) {
        var id = req.params.id;
        // We just have to specify which band we want to destroy with "where"
        db.Rock.destroy({
            where: { id: id }
        }).then(function(dbbands) {
            res.json(dbbands);
        });

    });

}
