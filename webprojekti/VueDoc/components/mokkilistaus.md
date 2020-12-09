# mokkilistaus

## Props

<!-- @vuese:mokkilistaus:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|mokit|Taulukko johon haetaan näkymään siirryttäessä tietokannasta mökkien tiedot|`Array`|`false`|-|

<!-- @vuese:mokkilistaus:props:end -->


## Events

<!-- @vuese:mokkilistaus:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|valitse:mokki|Välitetään App.vueen tieto valitusta mokista|-|
|valitse:aloitusPvm|Välitetetään App.vueen tieto valitusta alkupäivämäärästä|-|
|valitse:lopetusPvm|Välitetetään App.vueen tieto valitusta lopetuspäivämäärästä|-|
|valitseMokkiAjalleNappi|Välitetään App.vueen tieto napin painamisesta|-|

<!-- @vuese:mokkilistaus:events:end -->


## Methods

<!-- @vuese:mokkilistaus:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|valitseRivi|Tätä funktiota kutsutaan kun kayttaja klikkaa tiettya rivia mökkilistauksesta.|-|
|valitseMokkiAjalle|ValitseMokkiAjalle-napin toiminta Tarkastetaan valintojen oikeellisuus ja siirrytään tarkastaVaraustilanne funktioon jos kaikki on ok|-|
|nollaaVirheilmoitukset|Nollaa kaikki virheilmoitukset|-|
|haeMokinVaraustilanne|Funktio hakee kaikkien mokkien varaustilanteet tietokannasta ja vertaa niitä valittuun mökkiin Tämän jälkeen funktio asettaa mokkiVapaa muuttujalle arvoksi true jos mökille ei ole muita varauksia valitulle ajanjaksolle|-|
|tarkastaVaraustilanne|Funktio hakee kaikkien mokkien varaustilanteet haeMokinVaraustilanne funktiolla ja vertaa niitä valittuun mökkiin Tämän jälkeen jos mökki todettiin olevan vapaa, viedään valitun mökin tiedot ja ajanjakson tiedot ylemmälle tasolle App.vueen Myös tieto napinpainalluksesta viedään App.vueen ja tämä saa aikaan näkymän vaihtumisen App.vuen kautta.|-|
|alustaKalenterinPaivat|Alustaa molempien kalentereiden päivämäärät nykyhetki ja nykyhetki + 1pv|-|
|muunnaPaivamaarat|Muuntaa päivämäärät YYYY-MM-dd -muodosta dd.MM.YYYY -muotoon|-|

<!-- @vuese:mokkilistaus:methods:end -->


