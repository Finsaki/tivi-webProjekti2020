<template>
    <div id="asiakastiedot">
        <h2>Asiakastiedot</h2>
        <p>Olet varaamassa mökkiä:</p>
        <p>*TÄHÄN MÖKIN TIEDOT*</p>
        <p>Syötä tietosi alla oleviin kenttiin. Täytäthän kaikki kentät.</p>
        <form v-on:submit.prevent="teeVaraus">
            <label>Etunimi</label>
            <input v-model="asiakas.etunimi" type="text" pattern="[a-zA-Z]+" />
            <label>Sukunimi</label>
            <input v-model="asiakas.sukunimi" type="text" pattern="[a-zA-Z]+" />
            <label>Katuosoite</label>
            <input v-model="asiakas.katuosoite" type="text" pattern="[a-zA-Z]+"/>
            <label>Postinumero</label>
            <input v-model="asiakas.postinro" type="text" pattern="[0-9]{5}" maxlength="5" minlength="5" />
            <label>Kaupunki</label>
            <input v-model="asiakas.kaupunki" type="text" pattern="[a-zA-Z]+" />
            <label>Puhelinnumero </label>
            <input v-model="asiakas.puhnro" type="text" placeholder="esim. 0501234567" pattern="[0-9]{10}" maxlength="10" minlength="10" />
            <label>Sähköpostiosoite</label>
            <input v-model="asiakas.email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            <p v-if="virhe">❗Täytä kaikki kentät</p>
            <p v-if="hyvaksytty">✅Varaus luotu onnistuneesti</p>
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
          etunimi: '',
          sukunimi: '',
          katuosoite: '',
          postinro: '',
          kaupunki: '',
          puhnro: '',
          email: '',
          alkupvm: '2020-02-20',
          loppupvm: '2020-03-20',
          hinta: '1',
          mokkiid: '1',
        },
        //Alla virheilmoituksen näkyvyyteen muuttujat
        virhe: false,
        hyvaksytty: false
      };
    },
    computed: {

    },
    methods: {
      //käyttäjä painaa tee varaus -nappia
      async teeVaraus() {

        //Tähän vielä testaus onko kaikki inputit täytetty

        console.log(this.asiakas);

        try {
          const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.asiakas)
        };
          const response = await fetch(' http://localhost:8081/api/asiakkaat/uusi', requestOptions);
          const data = await response.json();
          this.postId = data.id;
          console.log(this.postId);
          console.log('Varaus onnistui');
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

</style>