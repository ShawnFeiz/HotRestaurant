var express = require("express");
var mysql = require("mysql");
var Reservation = require("./resCon");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: "localhost",
    database: "reserve_db",
    user: "root",
    password: "Lollersk8!",
    port: 3306
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected.")
    }

    start();
});

function start() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../index.html"));
    });

    app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../reserve.html"));
    });

    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "../table.html"));
        });

    app.post("./../index", function (req, res) {
        // get the data from the post operation
        var name = req.body.name;

        var newRes = new Reservation(name, phone, email);
        newRes.save(function (name, phone, email) {
            connection.query("INSERT INTO reservations SET ?", {
                name: name,
                phone: phone,
                email: email
            }, function (err, data) {
                if (err) {
                    res.send("Something bad happened!");
                    throw err;
                } else {
                    res.send(data);
                }
            });
        });
        // save the data to the mysql database (puppy_roster table)
    });
}

// function viewRes () {
//     app.get("/:name?", function (req, res) {
//         if (req.params.name) {
//             // select where name == name
//             connection.query("SELECT * FROM reservations WHERE ?", {
//                 name: req.params.name
//             }, function (err, data) {
//                 if (err) {
//                     res.send(`Cannot find ${req.params.name}`);
//                     throw err;
//                 } else {
//                     if (data.length > 0) {
//                         res.send(data);
//                     } else {
//                         res.send(`Cannot find ${req.params.name}`);
//                     }
//                 }
//             });
//         } else {
//             connection.query("SELECT * FROM reservations", function (err, data) {
//                 if (err) {
//                     res.send("Something happened!!!");
//                     throw err;
//                 }
                
//                 res.send(data);
//             });
//         }
//     });
// }
