<template>
    <div id="mokkitiedot">
        <h2>Mökkitiedot</h2>
        <p :class="{'selite': true}">Valitse mökki listalta</p>
        <table>
            <thead>
            <tr>
                <th>Kuva</th>
                <th>Nimi</th>
                <th>Osoite</th>
                <th>Hinta/Päivä</th>
                <th>Henkilömäärä</th>
                <th>Kuvaus</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="mokki in mokit" @click="valitseRivi(mokki.id)" :key="mokki.id"
                :class="{'highlight': (mokki === valittuMokki)}">
                <td><img :src="mokki.kuva" alt="Kuva mökistä" height="100"></td>
                <td>{{mokki.nimi}}</td>
                <td>{{mokki.osoite}}</td>
                <td>{{mokki.hinta}}</td>
                <td>{{mokki.hlomaara}}</td>
                <td>{{mokki.kuvaus}}</td>
            </tr>
            </tbody>
        </table>
        <strong>Valittu mökki:</strong>
        <div :class="{'tulos ': true}" v-if="this.valittuMokki === null">Mökkiä ei valittu</div>
        <div :class="{'tulos ': true}" v-else>{{this.valittuMokki.nimi}}<br><br>
            <img :src="valittuMokki.kuva" alt="Kuva mökistä" height="500"></div>

        <h2>Varauksen kesto</h2>
        <p :class="{'selite': true}">Anna varauksen alkupäivämäärä </p>
        <input type="date" v-model="aloitusPvm" v-on:change="muunnaPaivamaarat" v-bind:min="this.kalenterin1EkaPaiva">
        <p :class="{'selite': true}">Anna varauksen loppupäivämäärä </p>
        <input type="date" v-model="lopetusPvm" v-on:change="muunnaPaivamaarat" v-bind:min="this.kalenterin2EkaPaiva">
        <strong>Valittu ajanjakso:</strong>
        <div :class="{'tulos': true}" v-if="!this.aloitusPvm || !this.lopetusPvm">Päivämääriä ei valittu</div>
        <div :class="{'tulos': true}" v-else>{{this.korjattuAloituspvm}} - {{this.korjattuLopetuspvm}}</div>
        <div :class="{'virhe': true}" v-if="this.kaikkiOk === false">Varmista että mökki ja varauksen aloituspäivämäärä sekä varauksen
            lopetuspäivämäärä ovat valittu</div>
        <div :class="{'virhe': true}" v-if="this.virheellinenAikavaliIlmoitus === true">Varauksen loppumispäivä ei voi olla samana päivänä tai ennen
            alkamispäivää!</div>
        <div :class="{'virhe': true}" v-if="this.mokkiVarattuIlmoitus === true">Mökki on jo varattuna aikavälillä {{this.varattuAlkupvm}} - {{this.varattuLoppupvm}}!</div>
        <button v-on:click="valitseMokkiAjalle">Varaa mökki valitulle ajanjaksolle</button>

    </div>
</template>

<script>
  export default {
    name: 'mokkilistaus',
    props: {
      /**
       * Taulukko johon haetaan näkymään siirryttäessä tietokannasta mökkien tiedot
       * @type {Object}
       */
      mokit: Array,
    },
    data() {
      return {
        /**
         * Muuttuja jossa on käyttäjän valitsema mokki
         * @type {Object}
         */
        valittuMokki: null,
        /**
         * Muuttuja jossa on varauksen aloitus päivämäärä muodossa YYYY-MM-dd
         * @type {Object}
         */
        aloitusPvm: null,
        /**
         * Muuttuja jossa on varauksen lopetus päivämäärä muodossa YYYY-MM-dd
         * @type {Object}
         */
        lopetusPvm: null,
        /**
         * Muuttuja jossa on varauksen aloitus päivämäärä vaihdettu muotoon dd.MM.YYYY
         * @type {Object}
         */
        korjattuAloituspvm: null,
        /**
         * Muuttuja jossa on varauksen lopetus päivämäärä vaihdettu muotoon dd.MM.YYYY
         * @type {Object}
         */
        korjattuLopetuspvm: null,
        /**
         * Muuttuja kertoo voidaanko varauksessa edetä Asiakastietojen antamiseen
         * @type {boolean}
         */
        kaikkiOk: true,
        /**
         * Muuttuja kertoo näytetäänkö ilmoitus virheellisestä aikavälistä
         * @type {Object}
         */
        virheellinenAikavaliIlmoitus: Boolean,
        /**
         * Muuttuja kertoo näytetäänkö mökki varattu ilmoitus viesti
         * @type {Object}
         */
        mokkiVarattuIlmoitus: Boolean,
        /**
         * Muuttuja kertoo onko mökki varattu/vapaa
         * @type {Object}
         */
        mokkiVapaa: Boolean,
        /**
         * Muuttuja kertoo ensimmäisen päivän aloituspäivälle joka on mahdollista valita kalenterista
         * @type {Object}
         */
        kalenterin1EkaPaiva: Date,
        /**
         * Muuttuja kertoo ensimmäisen päivän lopetuspäivälle joka on mahdollista valita kalenterista
         * @type {Object}
         */
        kalenterin2EkaPaiva: Date,
        varattuAlkupvm: null,
        varattuLoppupvm: null,
      };
    },
    mounted() {
      this.alustaKalenterinPaivat();
    },
    methods: {
      /**
       * Tätä funktiota kutsutaan kun kayttaja klikkaa tiettya rivia mökkilistauksesta.
       * @param {number} mokkiID - Mökin ID jonka avulla Funktio tallettaa klikatun mökin omaan sisaiseen muuttujaan
       */
      valitseRivi(mokkiID) {
        for (let i = 0; i < this.mokit.length; i++) {
          if (mokkiID === this.mokit[i].id) {
            this.valittuMokki = this.mokit[i];
            break;
          }
        }
      },
      /**
       * ValitseMokkiAjalle-napin toiminta
       * Tarkastetaan valintojen oikeellisuus ja siirrytään tarkastaVaraustilanne funktioon jos kaikki on ok
       */
      valitseMokkiAjalle() {
        //Nollataan virheilmoitukset
        this.nollaaVirheilmoitukset();
        //Tarkastetaan että käyttäjä on valinnut mökin sekä syöttänyt päivämäärät
        if (this.valittuMokki != null && this.aloitusPvm != null && this.lopetusPvm != null) {
          console.log('Valinnat ok');
          //Tarkastetaan että aloituspvm ennen lopetuspvm
          if (this.aloitusPvm < this.lopetusPvm) {
            console.log('aikaväli ok');
            //Tarkastetaan onko haluttu mökki vapaa kys. ajanjaksolle
            this.tarkastaVaraustilanne();
          } else { //Aikaväli virheellinen
            this.virheellinenAikavaliIlmoitus = true;
          }
        } else { //Päivämäärä-/mökkivalinta puuttuu
          this.kaikkiOk = false;
        }
      },
      /**
       * Nollaa kaikki virheilmoitukset
       */
      nollaaVirheilmoitukset() {
        this.kaikkiOk = true;
        this.virheellinenAikavaliIlmoitus = false;
        this.mokkiVarattuIlmoitus = false;
      },
      /**
       * Funktio hakee kaikkien mokkien varaustilanteet tietokannasta ja vertaa niitä valittuun mökkiin
       * Tämän jälkeen funktio asettaa mokkiVapaa muuttujalle arvoksi true jos mökille ei ole muita varauksia valitulle ajanjaksolle
       *
       * @async
       * @function haeMokinVaraustilanne
       */
      async haeMokinVaraustilanne() {
        try {
          const response = await fetch(
              'http://localhost:8081/api/varaukset/pvm?id=' + this.valittuMokki.id + '&start=' + this.aloitusPvm +
              '&end=' + this.lopetusPvm);
          const data = await response.json();
          console.log('tietokantahaun vastaus: ' + JSON.stringify(data));
          if (data === true) {
            this.mokkiVapaa = true;
            console.log('asetettu mokin arvoksi true');
          } else {
            this.mokkiVapaa = false;
            let dateFormat = require('dateformat');
            this.varattuAlkupvm = dateFormat(data[0].ALKUPVM, 'dd.mm.yyyy');
            this.varattuLoppupvm = dateFormat(data[0].LOPPUPVM, 'dd.mm.yyyy');
            console.log('asetettu mokin arvoksi false');
          }
        } catch (error) {
          console.error(error);
        }
      },
      /**
       * Funktio hakee kaikkien mokkien varaustilanteet haeMokinVaraustilanne funktiolla ja vertaa niitä valittuun mökkiin
       * Tämän jälkeen jos mökki todettiin olevan vapaa, viedään valitun mökin tiedot ja ajanjakson tiedot ylemmälle tasolle App.vueen
       * Myös tieto napinpainalluksesta viedään App.vueen ja tämä saa aikaan näkymän vaihtumisen App.vuen kautta.
       *
       * @async
       * @function tarkastaVaraustilanne
       */
      async tarkastaVaraustilanne() {
        //Kutsutaan ensin funktiota joka hakee varaustilanteen tietokannasta ja asettaa tuloksen muuttujaan mokkiVapaa
        await this.haeMokinVaraustilanne();
        if (this.mokkiVapaa === true) {
          //Välitetään App.vueen tieto valitusta mokista
          this.$emit('valitse:mokki', this.valittuMokki);
          //Välitetetään App.vueen tieto valitusta alkupäivämäärästä
          this.$emit('valitse:aloitusPvm', this.aloitusPvm);
          //Välitetetään App.vueen tieto valitusta lopetuspäivämäärästä
          this.$emit('valitse:lopetusPvm', this.lopetusPvm);
          //Välitetään App.vueen tieto napin painamisesta
          this.$emit('valitseMokkiAjalleNappi');
          console.log('Mökki varmistettu vapaaksi');
        } else {
          this.mokkiVarattuIlmoitus = true;
          console.log('Mökki varmistettu varatuksi');
        }
      },
      /**
       * Alustaa molempien kalentereiden päivämäärät nykyhetki ja nykyhetki + 1pv
       */
      alustaKalenterinPaivat() {
        //Luodaan päivämuuttuja
        let paiva = new Date();
        //Asetetaan nykyhetki eka kalenterin muuttujaan muodossa yyyy-mm-dd
        this.kalenterin1EkaPaiva = paiva.toISOString().split('T')[0];
        //Siirretään päivää yhdellä eteenpäin ja lisätään toka kalenterin muuttujaksi
        paiva.setDate(paiva.getDate() + 1);
        this.kalenterin2EkaPaiva = paiva.toISOString().split('T')[0];
      },
      /**
       * Muuntaa päivämäärät YYYY-MM-dd -muodosta dd.MM.YYYY -muotoon
       */
      muunnaPaivamaarat() {
        let dateFormat = require('dateformat');
        this.korjattuAloituspvm = dateFormat(this.aloitusPvm, 'dd.mm.yyyy');
        this.korjattuLopetuspvm = dateFormat(this.lopetusPvm, 'dd.mm.yyyy');
      },
    },
  };
</script>

<style scoped>
    .highlight {
      background-color: rgba(3, 102, 238, 0.11);
    }
    .virhe{
      color: red;
      border-bottom: red dashed;
      border-top:red dashed;
      margin-top: 1em;
    }
    .tulos{
      color: blue;
    }
    .selite{
      font-size: 1em;
      margin-bottom: 0.5em;
      color: gray;
    }
    tr {
      margin: auto;
    }
    td {
      min-width: 2em;
    }

    tr:hover {
        cursor: pointer;
    }

    input {
        margin: auto;
        margin-bottom: 1em;
        max-width: 20em;
    }
    table {
      margin-left: 5%;
      margin-right: 5%;
      max-width: 90%;
      border-top: solid black 2px;
      border-bottom: solid black 2px;
    }
    thead {
      border-left: solid black 2px;
      border-right: solid black 2px;
      background-color: darkgray;
    }
    button {
      height: 4em;
      width: 25em;
      margin-top: 2em;
    }
</style>