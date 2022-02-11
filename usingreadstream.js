const fs = require("fs");


var rs = fs.createReadStream("../day1/test.txt");
var data = "";
rs.on("data", function(chunk) {
    data += chunk
    console.log("data event occured" + chunk.length)

});
rs.on("end", function() {
    console.log(data);
});
rs.on("error", function(err) {
    console.log("error occured" + err)
});