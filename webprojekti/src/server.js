let express = require('express');
let app = express();
let url = require('url');
let cors = require('cors');
let bodyParser = require('body-parser');
let mysql = require('mysql');
let path = require('path');
let util = require('util');
let request = require('request');

let con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "mokkivaraus"
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./public')));

const query = util.promisify(con.query).bind(con);

app.get('/', function (req, res) {

        res.send("Hello WOrlds!");

});

app.get('/api/mokit', function (req, res) {

    con.query("SELECT * FROM mokki", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    console.log("Got a GET request for the homepage");

});

app.get('/api/asiakkaat', function (req, res) {

    con.query("SELECT * FROM asiakas", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    console.log("Got a GET request for the homepage");

});

app.get('/api/varaukset', function (req, res) {

    con.query("SELECT * FROM varaus", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    console.log("Got a GET request for the homepage");

});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
