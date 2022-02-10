var express = require("express");
var app = express();
//var cookieparser=require("cookie-parser")
//for setiing to specify path
var path = require("path");
var bodyparser = require("body-parser");
var routes = require("./routes/routers");

/*mongodb connectivity*/
var mongoose = require("mongoose");
//to assign native promise object to mongoose
mongoose.Promise = global.Promise;
// Connection URL
const url = 'mongodb://localhost:27017/test';

//to make connection asynchronously

mongoose.connect(url, {
        useMongoClient: true,
        connectTimeoutMS: 1000
    },
    function(err, result) {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection done with test database");
        }

    });


///configure the application
app.set("views", path.join(__dirname, "views")); // "./views"
app.set("view engine", 'jade');

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
//these are for static includes to add folder containing css, javascript and images
app.use(express.static(path.join(__dirname, "public")));
//app.use(cookieParser());

//routing will be handled by router.js file
app.use('/', routes);

//start the server

app.listen(3000);
console.log("server started at port 3000");
module.exports = app;