<template>
    <div id="asiakastiedot">
        <h2>Asiakastiedot</h2>
        <p class="lihavoitu">Olet varaamassa mökkiä:</p>
        <p class="korostettu">{{valittuMokki.nimi}}, {{valittuMokki.osoite}}, max. {{valittuMokki.hlomaara}} hlö,
            {{valittuMokki.hinta}} €/päivä</p>
        <p><b>Ajanjaksolle</b> {{korjattuAloituspvm}} - {{korjattuLopetuspvm}}</p>
        <p>Syötä tietosi alla oleviin kenttiin. Täytäthän kaikki kentät.</p>
        <form v-on:submit.prevent="teeVaraus">
            <label>Etunimi</label>
            <input v-model="asiakas.etunimi" type="text" pattern="[a-zA-Z]+"/>
            <label>Sukunimi</label>
            <input v-model="asiakas.sukunimi" type="text" pattern="[a-zA-Z]+"/>
            <label>Katuosoite</label>
            <input v-model="asiakas.katuosoite" type="text" pattern="[a-zA-Z 0-9-]+"/>
            <label>Postinumero</label>
            <input v-model="asiakas.postinro" type="text" pattern="[0-9]{5}" maxlength="5" minlength="5"/>
            <label>Kaupunki</label>
            <input v-model="asiakas.kaupunki" type="text" pattern="[a-zA-Z]+"/>
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
        //Virheilmoituksen näkyvyyden muuttuja
        virhe: false,
        //Muodollisesti korjattujen päivämäärien muuttujat
        korjattuAloituspvm: String,
        korjattuLopetuspvm: String,
      };
    },
    mounted() {
      //Heti kun sivu latautuu muunnetaan päivämäärät oikeaan muotoon
      this.muunnaPaivamaarat();
    },
    props: {
      valittuMokki: Object,
      valittuAloitusPvm: String,
      valittuLopetusPvm: String,
    },
    methods: {
      //käyttäjä painaa tee varaus -nappia
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

            console.log('Varaus onnistui');
            console.log('Varausnumero on ' + data.insertId);

            this.$emit('varausOnnistunut');

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
      //Käyttäjä painaa peruuta-nappia
      peruutaVaraus() {
        console.log('Varaus epäonnistui');
        this.$emit('peruutaNappi');
      },
      //Muutetaan päivämäärien muoto YYYY-MM-dd -> dd.MM.YYYY
      muunnaPaivamaarat() {
        let alkupvm = this.valittuAloitusPvm;
        let loppupvm = this.valittuLopetusPvm;

        let splitattuAlkupvm = alkupvm.split('-');
        let splitattuLoppupvm = loppupvm.split('-');

        let muunnettuAlkupvm = splitattuAlkupvm[2] + '.' + splitattuAlkupvm[1] + '.' + splitattuAlkupvm[0];
        let muunnettuLoppupvm = splitattuLoppupvm[2] + '.' + splitattuLoppupvm[1] + '.' + splitattuLoppupvm[0];

        this.korjattuAloituspvm = muunnettuAlkupvm;
        this.korjattuLopetuspvm = muunnettuLoppupvm;
      },
    },
  };
</script>

<style scoped>
    .korostettu {
        font-weight: bold;
        color: firebrick;
    }

    .lihavoitu {
        font-weight: bold;
    }
</style>