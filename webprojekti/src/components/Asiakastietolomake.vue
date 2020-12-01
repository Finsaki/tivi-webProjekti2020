<template>
    <div id="asiakastiedot">
        <h2>Asiakastiedot</h2>
        <p>Olet varaamassa mökkiä:</p>
        <p class="lihavoitu">{{valittuMokki.nimi}}, {{valittuMokki.osoite}}, {{valittuMokki.hinta}} €/päivä</p>
        <p>Syötä tietosi alla oleviin kenttiin. Täytäthän kaikki kentät.</p>
        <form v-on:submit.prevent="teeVaraus">
            <label>Etunimi</label>
            <input v-model="asiakas.etunimi" type="text" pattern="[a-zA-Z]+" />
            <label>Sukunimi</label>
            <input v-model="asiakas.sukunimi" type="text" pattern="[a-zA-Z]+" />
            <label>Katuosoite</label>
            <input v-model="asiakas.katuosoite" type="text" pattern="[a-zA-Z 0-9-]+"/>
            <label>Postinumero</label>
            <input v-model="asiakas.postinro" type="text" pattern="[0-9]{5}" maxlength="5" minlength="5" />
            <label>Kaupunki</label>
            <input v-model="asiakas.kaupunki" type="text" pattern="[a-zA-Z]+" />
            <label>Puhelinnumero </label>
            <input v-model="asiakas.puhnro" type="text" placeholder="esim. 0501234567" pattern="[0-9]{10}" maxlength="10" minlength="10" />
            <label>Sähköpostiosoite</label>
            <input v-model="asiakas.email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            <p v-if="virhe">❗Täytä kaikki kentät</p>
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
          sukunimi:  null,
          katuosoite: null,
          postinro: null,
          kaupunki: null,
          puhnro: null,
          email: null,
          alkupvm: '2020-02-20',
          loppupvm: '2020-03-20',
          hinta: this.valittuMokki.hinta,
          mokkiid: this.valittuMokki.id,
        },
        //Alla virheilmoituksen näkyvyyteen muuttujat
        virhe: false,
      };
    },
    props: {
      valittuMokki: Object
    },
    methods: {
      //käyttäjä painaa tee varaus -nappia
      async teeVaraus() {
        this.virhe = false;
        //console.log(this.asiakas);

        //Tarkastetaan että inputit eivät ole tyhjät
        if (!this.asiakas.etunimi || !this.asiakas.sukunimi || !this.asiakas.katuosoite || !this.asiakas.postinro || !this.asiakas.kaupunki || !this.asiakas.puhnro || !this.asiakas.email) {
          //console.log('virhe');
          this.virhe = true;
          return;

        } else {
          //Tehdään POST-pyyntö palvelimelle
          try {
            const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(this.asiakas)
            };
            const response = await fetch(' http://localhost:8081/api/asiakkaat/uusi', requestOptions);
            const data = await response.json();

            //Välitetään App.vuelle juuri tehdyn varauksen varausnumero
            this.$emit('lisaa:varausnro', data.insertId);

            console.log('Varausnumero on ' + data.insertId);
            console.log('Varaus onnistui');
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
    },
  };
</script>

<style scoped>
.lihavoitu {
    font-weight: bold;
    color: firebrick;
}
</style>