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
    let sql = "SELECT * FROM mokki";
    let string;
    let alteredResult;

    (async () => {
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(alteredResult);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get('/api/mokit/id', function (req, res) {
    let q = url.parse(req.url, true).query;
    let id = q.id;
    let sql = "SELECT * FROM mokki WHERE id = ?";
    let string;

    (async () => {
        try {
            const rows = await query(sql, id);
            string = JSON.stringify(rows);
            //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(string);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get('/api/asiakkaat', function (req, res) {
    let sql = "SELECT * FROM asiakas";
    let string;
    let alteredResult;

    (async () => {
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(alteredResult);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get('/api/asiakkaat/id', function (req, res) {
    let q = url.parse(req.url, true).query;
    let id = q.id;
    let sql = "SELECT * FROM asiakas WHERE id = ?";
    let string;

    (async () => {
        try {
            const rows = await query(sql, id);
            string = JSON.stringify(rows);
           //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(string);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get('/api/varaukset', function (req, res) {
    let sql = "SELECT * FROM varaus";
    let string;
    let alteredResult;

    (async () => {
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(alteredResult);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.get('/api/varaukset/id', function (req, res) {
    let q = url.parse(req.url, true).query;
    let id = q.id;
    let sql = "SELECT * FROM varaus WHERE id = ?";
    let string;

    (async () => {
        try {
            const rows = await query(sql, id);
            string = JSON.stringify(rows);
            //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            res.send(string);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

app.post('/api/asiakkaat/add', function (req, res) {
    console.log("Got a POST request for the homepage");
    //let q = url.parse(req.url, true).query;
    let string;
    let jsonObj = req.body;

    console.log('receiving data ...');
    console.log("body: %j", req.body);
    res.send(req.body);

    let sql = "INSERT INTO asiakas (ETUNIMI, SUKUNIMI, KATUOSOITE, POSTINRO, KAUPUNKI, EMAIL, PUHNRO)"
        + " values (?, ?, ?, ?, ?, ?, ?)";

    (async () => {
        try {
            const result = await query(sql,[jsonObj.etunimi, jsonObj.sukunimi, jsonObj.katuosoite, jsonObj.postinro, jsonObj.kaupunki, jsonObj.email, jsonObj.puhnro]);
            //let insertedId = result.insertId;
            //let sql2 = "INSERT INTO event_date (Date, Event_id) values (?, ?)";
            //const result2 = await query(sql2, [jsonObj.EventDate, insertedId]);
            string = JSON.stringify(result);
            //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(string);
            //res.send(result);

        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
