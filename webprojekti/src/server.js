/**
 * Muuttuja joka mahdollistaa express-ominaisuuden käytön
 * @type {require}
 */
let express = require('express');
/**
 * Muuttuja joka käyttää express-ominaisuutta
 */
let app = express();
/**
 * Muuttuja joka mahdollistaa url-ominaisuuden käytön
 * @type {require}
 */
let url = require('url');
/**
 * Muuttuja joka mahdollistaa cors-ominaisuuden käytön
 * @type {require}
 */
let cors = require('cors');
/**
 * Muuttuja joka mahdollistaa bodyParser-ominaisuuden käytön
 * @type {require}
 */
let bodyParser = require('body-parser');
/**
 * Muuttuja joka mahdollistaa mysql-ominaisuuden käytön
 * @type {require}
 */
let mysql = require('mysql');
/**
 * Muuttuja joka mahdollistaa path-ominaisuuden käytön
 * @type {require}
 */
let path = require('path');
/**
 * Muuttuja joka mahdollistaa util-ominaisuuden käytön
 * @type {require}
 */
let util = require('util');
/**
 * Muuttuja joka mahdollistaa request-ominaisuuden käytön
 * @type {require}
 */
let request = require('request');

/**
 * Muuttuja joka määrittää tietokantayhteyden
 * @type {object}
 */
let con = mysql.createConnection({
  host: 'localhost',
  user: 'olso',
  password: 'olso',
  database: 'mokkivaraus',
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

/**
 * Muuttuja joka määrittää tietokantahaun yhteyden tietokantaan
 *
 */
const query = util.promisify(con.query).bind(con);

/**
 * GET-kutsu: Hakee kaikkien mokkien tiedot tietokannasta
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/mokit', function(req, res) {
  let sql = 'SELECT * FROM mokki';
  let string;
  let alteredResult;

  (async () => {
    try {
      const rows = await query(sql);
      string = JSON.stringify(rows);
      alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
      console.log(rows);
      res.send(alteredResult);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Hakee yksittäisen mökin tiedot tietokannasta id-numeron perusteella
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/mokit/id', function(req, res) {
  let q = url.parse(req.url, true).query;
  let id = q.id;
  let sql = 'SELECT * FROM mokki WHERE id = ?';
  let string;

  (async () => {
    try {
      const rows = await query(sql, id);
      string = JSON.stringify(rows);
      //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
      console.log(rows);
      res.send(string);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Hakee kaikkien asiakkaiden tiedot tietokannasta
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/asiakkaat', function(req, res) {
  let sql = 'SELECT * FROM asiakas';
  let string;
  let alteredResult;

  (async () => {
    try {
      const rows = await query(sql);
      string = JSON.stringify(rows);
      alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
      console.log(rows);
      res.send(alteredResult);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Hakee yksittäisen asiakkaan tiedot tietokannasta id-numeron perusteella
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/asiakkaat/id', function(req, res) {
  let q = url.parse(req.url, true).query;
  let id = q.id;
  let sql = 'SELECT * FROM asiakas WHERE id = ?';
  let string;

  (async () => {
    try {
      const rows = await query(sql, id);
      string = JSON.stringify(rows);
      //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
      console.log(rows);
      res.send(string);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Hakee kaikkien varausten tiedot tietokannasta
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/varaukset', function(req, res) {
  let sql = 'SELECT * FROM varaus';
  let string;
  let alteredResult;

  (async () => {
    try {
      const rows = await query(sql);
      string = JSON.stringify(rows);
      alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
      console.log(rows);
      res.send(alteredResult);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Hakee yksittäisen varauksen tiedot tietokannasta id-numeron perusteella
 *
 * Palauttaa tiedot JSON-muodossa
 *
 * @async
 */
app.get('/api/varaukset/id', function(req, res) {
  let q = url.parse(req.url, true).query;
  let id = q.id;
  let sql = 'SELECT * FROM varaus WHERE id = ?';
  let string;

  (async () => {
    try {
      const rows = await query(sql, id);
      string = JSON.stringify(rows);
      //alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
      console.log(rows);
      res.send(string);
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();
});

/**
 * GET-kutsu: Tarkastaa onko pyydetyllä mökillä pyydetyille päivämäärille jo varausta tietokannassa
 *
 * Palauttaa true tai tietokannan vastauksen varatusta mökistä
 *
 * @async
 */
app.get('/api/varaukset/pvm', function(req, res) {
  //Parsitaan osoitteesta id, alkuaika ja loppuaika
  let q = url.parse(req.url, true).query;
  let id = q.id;
  let startDate = q.start;
  let endDate = q.end;
  console.log('Kysely mökistä: ' + id + ', aikaväliltä: ' + startDate + ' -> ' +
      endDate);

  let sql = 'SELECT * FROM varaus WHERE mokkiid = ? AND ((alkupvm <=  ? AND loppupvm >=  ?) OR  ' +
      '(alkupvm <= ? AND loppupvm >= ?) OR (alkupvm >= ? AND loppupvm <= ?)) ';

  (async () => {
    try {
      const rows = await query(sql,
          [id, startDate, startDate, endDate, endDate, startDate, endDate]);
      console.log(rows);
      if (rows.length > 0) {
        res.send(JSON.stringify(rows));
        console.log('res: false');
      } else {
        res.send(true);
        console.log('res: true');
      }
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();

});

/**
 * POST-kutsu: Lisää tietokantaan uuden asiakkaan ja luo asiakkaasta + mökistä uuden varauksen
 *
 * Palauttaa käyttäjälle varaus-taulukon kyselyn tuloksen JSON-stringinä.
 *
 * @async
 */
app.post('/api/asiakkaat/uusi', function(req, res) {
  console.log('POST-pyyntö');
  let jsonObj = req.body;
  //javascript ottaa suoraan varaushetken; menee sellaisenaan tietokantaan
  let varauspvm = new Date();
  let apvm = new Date(jsonObj.alkupvm);
  let lpvm = new Date(jsonObj.loppupvm);
  //laskee varattujen päivien määrän millisekuntien kautta
  let paivat = (lpvm.getTime() - apvm.getTime()) / 1000 / 60 / 60 / 24;
  let kokhinta = jsonObj.hinta * paivat;

  console.log('body: %j', req.body);
  console.log(apvm);
  console.log(lpvm);
  console.log(paivat);
  console.log(kokhinta);

  let sql = 'INSERT INTO asiakas (ETUNIMI, SUKUNIMI, KATUOSOITE, POSTINRO, KAUPUNKI, EMAIL, PUHNRO)'
      + ' values (?, ?, ?, ?, ?, ?, ?)';

  (async () => {
    try {
      const result = await query(sql, [
        jsonObj.etunimi,
        jsonObj.sukunimi,
        jsonObj.katuosoite,
        jsonObj.postinro,
        jsonObj.kaupunki,
        jsonObj.email,
        jsonObj.puhnro]);
      let insertedId = result.insertId; //Luodun asiakkaan id
      let sql2 = 'INSERT INTO varaus (MOKKIID, ASIAKASID, VARAUSPVM, ALKUPVM, LOPPUPVM, KOKHINTA)'
          + ' values (?, ?, ?, ?, ?, ?)';
      const result2 = await query(sql2, [
        jsonObj.mokkiid,
        insertedId,
        varauspvm,
        jsonObj.alkupvm,
        jsonObj.loppupvm,
        kokhinta]);
      //Lähetetään käyttäjälle vastauksena viimeisimmän kyselyn tulos, josta saa varausIdn
      res.send(JSON.stringify(result2));
    } catch (err) {
      console.log('Database error!' + err);
    }
  })();

});

/**
 * Funktio käynnistää paikallisen serverin
 */
let server = app.listen(8081, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
