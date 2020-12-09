<template>
    <div id="asiakastiedot">
        <h2>Asiakastiedot</h2>
        <p class="lihavoitu">Olet varaamassa mökkiä:</p>
        <p class="korostettu">{{valittuMokki.nimi}}, {{valittuMokki.osoite}}, max. {{valittuMokki.hlomaara}} hlö,
            {{valittuMokki.hinta}} €/päivä</p>
        <p class="lihavoitu">Ajanjaksolle {{korjattuAloituspvm}} - {{korjattuLopetuspvm}}</p>
        <p>Syötä tietosi alla oleviin kenttiin. Täytäthän kaikki kentät.</p>
        <form v-on:submit.prevent="teeVaraus">
            <label>Etunimi</label>
            <input v-model="asiakas.etunimi" type="text" pattern="[a-zA-ZÅÄÖåäö]+" ref="kohdista"/>
            <label>Sukunimi</label>
            <input v-model="asiakas.sukunimi" type="text" pattern="[a-zA-ZÅÄÖåäö]+"/>
            <label>Katuosoite</label>
            <input v-model="asiakas.katuosoite" type="text" pattern="[a-zA-ZÅÄÖåäö 0-9-]+"/>
            <label>Postinumero</label>
            <input v-model="asiakas.postinro" type="text" pattern="[0-9]{5}" maxlength="5" minlength="5"/>
            <label>Kaupunki</label>
            <input v-model="asiakas.kaupunki" type="text" pattern="[a-zA-ZÅÄÖåäö]+"/>
            <label>Puhelinnumero </label>
            <input v-model="asiakas.puhnro" type="text" placeholder="esim. 0501234567" pattern="[0-9]{10}"
                   maxlength="10" minlength="10"/>
            <label>Sähköpostiosoite</label>
            <input v-model="asiakas.email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
            <p class="korostettu" v-if="virhe">❗Täytä kaikki kentät</p>
            <button>Tee varaus</button>
        </form>
        <button v-on:click="peruutaVaraus">Peruuta</button>
    </div>
</template>

<script>
  export default {
    name: 'asiakastietolomake',
    data() {
      return {
        /**
         * Asiakas-olio, johon asetetaan sekä käyttäjän lomakkeelle syöttämiä tietoja, että App.vuesta haettuja tietoja.
         * @type {Object}
         */
        asiakas: {
          etunimi: null,
          sukunimi: null,
          katuosoite: null,
          postinro: null,
          kaupunki: null,
          puhnro: null,
          email: null,
          alkupvm: this.valittuAloitusPvm,
          loppupvm: this.valittuLopetusPvm,
          hinta: this.valittuMokki.hinta,
          mokkiid: this.valittuMokki.id,
        },
        /**
         * Virheilmoituksen näkyvyyden muuttuja, esiasetus false
         * @type Boolean
         */
        virhe: false,
        /**
         * Muodollisesti korjatun päivämäärän muuttuja
         * @type String
         */
        korjattuAloituspvm: String,
        /**
         * Muodollisesti korjatun päivämäärän muuttuja
         * @type String
         */
        korjattuLopetuspvm: String,
      };
    },
    mounted() {
      //Heti kun sivu latautuu muunnetaan päivämäärät oikeaan muotoon ja kohdistetaan näkymä ekaan inputtiin
      this.muunnaPaivamaarat();
      this.$refs.kohdista.focus();
    },
    props: {
      /**
       * Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema mökki
       * @type {Object}
       */
      valittuMokki: Object,
      /**
       * Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema aloituspäivämäärä
       * @type {Object}
       */
      valittuAloitusPvm: String,
      /**
       * Muuttuja johon haetaan näkymään siirryttäessä käyttäjän valitsema lopetuspäivämäärä
       * @type {Object}
       */
      valittuLopetusPvm: String,
    },
    methods: {
      /**
       * Suoritetaan, kun käyttäjä painaa 'Tee varaus'-nappia
       * @async
       * @function teeVaraus
       *
       * Funktio tarkastaa että kaikki tiedot on syötetty ja ovat validissa muodossa, erityisesti päivämäärät ovat oikein.
       * Tekee POST-pyynnön tietokantaan ja välittää asiakkaan ja mökin tiedot sekä syötetyt päivämäärät.
       * POST-pyynnön onnistuessa välittää varausnumeron App.vueen.
       */
      async teeVaraus() {
        this.virhe = false;
        //console.log(this.asiakas);

        //Tarkastetaan että inputit eivät ole tyhjät
        if (!this.asiakas.etunimi || !this.asiakas.sukunimi || !this.asiakas.katuosoite || !this.asiakas.postinro ||
            !this.asiakas.kaupunki || !this.asiakas.puhnro || !this.asiakas.email) {
          //console.log('virhe');
          this.virhe = true;
          return;

        } else {
          //Tehdään POST-pyyntö palvelimelle
          try {
            const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(this.asiakas),
            };
            const response = await fetch(' http://localhost:8081/api/asiakkaat/uusi', requestOptions);
            const data = await response.json();

            //Välitetään App.vuelle juuri tehdyn varauksen varausnumero
            this.$emit('lisaa:varausnro', data.insertId);
            this.$emit('varausOnnistunut');
            console.log('Varaus onnistui');
            console.log('Varausnumero on ' + data.insertId);

          } catch (error) {
            console.log('Varaus epäonnistui');
            console.error(error);
          }

          //Nollataan inputit ja asiakas-muuttuja
          this.asiakas = {
            etunimi: '',
            sukunimi: '',
            katuosoite: '',
            postinro: '',
            kaupunki: '',
            puhnro: '',
            email: '',
          };
        }
      },
      /**
       * Suoritetaan kun käyttäjä painaa Peruuta-nappia.
       * Välittää App.vueen eventin 'peruutaNappi'
       */
      peruutaVaraus() {
        console.log('Varaus epäonnistui');
        this.$emit('peruutaNappi');
      },
      /**
       * Muuttaa päivämäärien muodon YYYY-MM-dd -> dd.MM.YYYY ja asettaa ne muuttujiin
       */
      muunnaPaivamaarat() {
        let dateFormat = require('dateformat');
        this.korjattuAloituspvm = dateFormat(this.valittuAloitusPvm, 'dd.mm.yyyy');
        this.korjattuLopetuspvm = dateFormat(this.valittuLopetusPvm, 'dd.mm.yyyy');
      },
    },
  };
</script>

<style scoped>
    .korostettu {
        font-weight: bold;
        color: blue;
    }
    .lihavoitu {
        font-weight: bold;
    }
    input {
        margin: auto;
        margin-bottom: 1em;
        max-width: 20em;
    }
</style>