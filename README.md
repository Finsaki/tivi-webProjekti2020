# tivi-webProjekti2020
This is the repository for university web-project group assignment

*************************************

Project instructions in Finnish:

Tavoite
Toteutetaan ”Web-sovelluskehitys” -kurssilla projektityönä pieni web-projekti, jossa on
sekä asiakaspään että palvelinpään toteutus. Asiakas toteutetaan html5-, css-, ja javascriptyhdistelmällä. Vue-kirjastoa käytetään, mikäli mahdollista.
Palvelin toteutetaan Node.js/Express-pohjaisesti niin, että tiedot talletetaan tietokantaan
(mysql, mongodb tms.) ja julkaistaan käyttäen REST-apia. Rajapinta palauttaa tulokset
JSON-formaattina, mutta muitakin formaatteja voi halutessaan tukea. Asiakkaan ja
palvelimen kommunikointi toteutetaan asynkronisesti.
Projektityö toteutetaan 2-3 opiskelijan ryhmätyönä.

Huomioitavia seikkoja
REST-apin tulee toimia molempiin suuntiin. Kyselyjen muodot ja päivitettävät tiedot tulee
validoida. Yksikkötestit ovat suotavia. Suunnitteludokumenttia ei tehdä, mutta esim. JSDoc
kannattaa ottaa käyttöön.

**************************************
About the finished Project

The commits, comments and data in the project is in Finnish.

This project contains a Vue based website that allows the user to book cabins.
The cabins are fetched from mySQL database and the results are shown in the browser
through localhost server. When the user makes a booking, the information
about the user and the booking gets saved into the same database.

The code can be found in the directory webprojekti.
Screenshots about the working project are found in the directory screenshots.
The layout of the mySQL database can be found in mvtietokanta.sql.
Documentation for the vue components is found in webprojekti/VueDoc. The documentation is made with vuese.
