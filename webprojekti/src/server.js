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


app.get('/api/varaukset/pvm', function (req, res) {
    let q = url.parse(req.url, true).query;
    let id = q.id;
    let startDate = q.start;
    let endDate = q.end;
    let alteredResult;
    let string;
    console.log(startDate);
    console.log(endDate);
    let sql = "SELECT * FROM varaus WHERE mokkiid = ? AND ((alkupvm <=  ? AND loppupvm >=  ?) OR  " +
        "(alkupvm <= ? AND loppupvm >= ?) OR (alkupvm >= ? AND loppupvm <= ?)) ";

    (async () => {
        try {
            const rows = await query(sql,[id, startDate, startDate, endDate, endDate, startDate, endDate]);
            string = JSON.stringify(rows);
            alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
            console.log(rows);
            if (rows.length > 0){
                res.send("Mökki on varattu halutulla ajalla!")
            }else{
                res.send("Varaus onnistuu!");
            }

        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});


app.post('/api/asiakkaat/uusi', function (req, res) {
    console.log("Got a POST request for the homepage");
    let string;
    let jsonObj = req.body;
    //javascript ottaa suoraan varaushetken; menee sellaisenaan tietokantaan
    let varauspvm = new Date();
    let apvm = new Date(jsonObj.alkupvm);
    let lpvm = new Date(jsonObj.loppupvm);
    //laskee varattujen päivien määrän millisekuntien kautta
    let paivat = (lpvm.getTime() - apvm.getTime()) / 1000 / 60 / 60 / 24;
    let kokhinta = jsonObj.hinta * paivat;

    console.log('receiving data ...');
    console.log("body: %j", req.body);
    console.log(apvm);
    console.log(lpvm);
    console.log(paivat);
    console.log(kokhinta);
    //res.send(req.body);

    let sql = "INSERT INTO asiakas (ETUNIMI, SUKUNIMI, KATUOSOITE, POSTINRO, KAUPUNKI, EMAIL, PUHNRO)"
        + " values (?, ?, ?, ?, ?, ?, ?)";

    (async () => {
        try {
            const result = await query(sql,[jsonObj.etunimi, jsonObj.sukunimi, jsonObj.katuosoite, jsonObj.postinro, jsonObj.kaupunki, jsonObj.email, jsonObj.puhnro]);
            let insertedId = result.insertId;
            let sql2 = "INSERT INTO varaus (MOKKIID, ASIAKASID, VARAUSPVM, ALKUPVM, LOPPUPVM, KOKHINTA)"
            + " values (?, ?, ?, ?, ?, ?)";
            const result2 = await query(sql2, [jsonObj.mokkiid, insertedId, varauspvm, jsonObj.alkupvm, jsonObj.loppupvm, kokhinta]);
            /*string = JSON.stringify(result2);
            console.log('joku stringi' + string);*/
            res.send(JSON.stringify(result2));

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
