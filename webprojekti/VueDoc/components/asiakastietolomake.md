# asiakastietolomake

## Props

<!-- @vuese:asiakastietolomake:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|valittuMokki|Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema mökki|`Object`|`false`|-|
|valittuAloitusPvm|Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema aloituspäivämäärä|`String`|`false`|-|
|valittuLopetusPvm|Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema lopetuspäivämäärä|`String`|`false`|-|

<!-- @vuese:asiakastietolomake:props:end -->


## Events

<!-- @vuese:asiakastietolomake:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|lisaa:varausnro|Välitetään App.vuelle juuri tehdyn varauksen varausnumero|-|
|varausOnnistunut|-|-|
|peruutaNappi|-|-|

<!-- @vuese:asiakastietolomake:events:end -->


## Methods

<!-- @vuese:asiakastietolomake:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|teeVaraus|Suoritetaan, kun käyttäjä painaa 'Tee varaus'-nappia Funktio tarkastaa että kaikki tiedot on syötetty ja ovat validissa muodossa, erityisesti päivämäärät ovat oikein. Tekee POST-pyynnön tietokantaan ja välittää asiakkaan ja mökin tiedot sekä syötetyt päivämäärät. POST-pyynnön onnistuessa välittää varausnumeron App.vueen.|-|
|peruutaVaraus|Suoritetaan kun käyttäjä painaa Peruuta-nappia. Välittää App.vueen eventin 'peruutaNappi'|-|
|muunnaPaivamaarat|Muuttaa päivämäärien muodon YYYY-MM-dd -> dd.MM.YYYY ja asettaa ne muuttujiin|-|

<!-- @vuese:asiakastietolomake:methods:end -->


