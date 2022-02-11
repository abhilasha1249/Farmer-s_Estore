const fs = require("fs");

var ws = fs.createWriteStream("outfile.txt");

var data = "this is testing of writeStream";
var data1 = "testing of writeStream with 2 lines";
ws.write(data, 'UTF8');
ws.write(data1, 'UTF8');
////mark the end of file
ws.end();
ws.on("finish", function() {
    console.log("writing completed");
});

ws.on("error", function(err) {
    console.error("error occured" + err);
})
console.log("end of program")