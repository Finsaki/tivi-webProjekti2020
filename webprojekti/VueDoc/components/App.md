# App

## Methods

<!-- @vuese:App:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getMokit|Funktio hakee kaikkien mokkien tiedot tietokannasta ja tallentaa ne mokit lista-muuttujaan. Listaa kayttaa Mokkilistaus.vue|-|
|valitseMokki|Funktio tallettaa Mokkilistaus.vue:sta tulevan mökin tiedot valittuMokki muuttujaan|-|
|valitseAloitusPvm|Funktio tallettaa Mokkilistaus.vue:sta tulevan aloituspäivämäärän aloitusPvm muuttujaan|-|
|valitseLopetusPvm|Funktio tallettaa Mokkilistaus.vue:sta tulevan lopetuspäivämäärän lopetusPvm muuttujaan|-|
|uusiVarausNappi|Navipalkin 'uusi varaus'-napin toiminto, siirtää näkymän takaisin mökkinäkymään.|-|
|omaVarausNappi|Navipalkin 'oma varaus'-napin toiminto, siirtää näkymän Varauksen tarkastelu näkymään|-|
|valitseMokkiAjalleNappi|Mökkilistauksen 'valitse mökki'-napin toiminto, siirtää näkymän Asiakasnäkymään|-|
|peruutaNappi|Asiakasnäkymän peruuta-napin toiminto, siirtää näkymän takaisin Mökkinäkymään|-|
|varausOnnistunut|Asettaa Varaus onnistui -näkymän nykyiseksi näkymäksi kun varaus viedään loppuun onnistuneesti Asiakasnäkymässä|-|
|lisaaVarausnro|Funktio ottaa vastaan Asiakastietolomakkeesta välitetyn muuttujan omaan muuttujaan App.vuessa|-|

<!-- @vuese:App:methods:end -->


