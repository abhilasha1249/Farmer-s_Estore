const { response } = require("express");
var express = require("express");
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var router = express.Router();

var empschema = new schema({
    _id: Number,
    empid: String,
    ename: { type: String, trim: true, required: true },
    sal: String
        //sal:{type:Number,validate:/[0-9]*/}
});

//retrieve data from emptab collection and its schema is defined 
//using empschema
//Emp is constructor function which is used to create object to store data
//if only model name is given then it adds s at the end of model name and 
//assign it collection, but to avoid that give 3 rd parameter which forces to keep the name given
//var Emp = mongoose.model('emptab', empschema, 'emptab');
var Emp = mongoose.model('emptab', empschema);
/* to retrieve all records from mongodb and displya it in the browser in table format
using index.jade file*/

router.get("/", function(req, res) {
    Emp.find().exec(function(err, data) {
        if (err) {
            res.status(500).send("no data found");
        }
        //console.log(data);

        //this will display index.jade file on the screen
        res.render('index', { title: 'Employee Data', empdata: data })
            // res.send(data);
    });
});
// to display selected object in the form for modification
router.get("/edit/:id", (req, res) => {

    Emp.findOne({ empid: req.params.id }, function(err, doc) {
        if (err) {
            res.status(500).send("no data found");
        }
        res.render("update", { title: 'Employee Data', empob: doc })
    });
});
//to modify the values in database
router.post("/update", function(req, res) {
    Emp.findOne({ empid: req.body.empid }, (err, doc) => {
        doc.empid = req.body.empid;
        doc.ename = req.body.ename;
        doc.sal = req.body.sal
        doc.save(function(err) {
            if (err) {
                res.status(500).send("not updated");
            }
            res.redirect("/");
        });
    });

});
//to delete the document with given id
router.get("/delete/:id", (req, res) => {
    Emp.remove({ empid: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).send("not updated");
        }
        res.redirect("/");
    });

});
router.get("/create", function(req, res) {

    //this will display create.jade file on the screen
    res.render('create', { title: 'Add Employee' })

});

router.post("/create", function(req, res) {
    var emp = new Emp({ _id: req.body.keyid, empid: req.body.eid, ename: req.body.ename, sal: req.body.sal })
        //save model in  mongodb
    emp.save(function(err) {
        if (err) {
            res.status(500).send("no data found");
        }
        //it will go to browser and immediatly come back to sever
        //with new url "/"
        res.redirect("/");
    });
    /* emp.save()
        .then((data)=>{res.redirect("/");})
        .catch((err)=>{  res.status(500).send("no data found");});
        */

})

module.exports = router;