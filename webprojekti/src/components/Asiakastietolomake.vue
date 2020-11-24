<template>
    <div id="asiakastiedot">
        <h2>Asiakastiedot</h2>
        <p>Olet varaamassa mökkiä:</p>
        <p>*TÄHÄN MÖKIN TIEDOT*</p>
        <p>Syötä tietosi alla oleviin kenttiin. Täytäthän kaikki kentät.</p>
        <form v-on:submit.prevent="teeVaraus">
            <label>Etunimi</label>
            <input v-model="asiakas.etunimi" type="text"/>
            <label>Sukunimi</label>
            <input v-model="asiakas.sukunimi" type="text"/>
            <label>Katuosoite</label>
            <input v-model="asiakas.katuosoite" type="text"/>
            <label>Postinumero</label>
            <input v-model="asiakas.postinro" type="text"/>
            <label>Kaupunki</label>
            <input v-model="asiakas.kaupunki" type="text"/>
            <label>Puhelinnumero</label>
            <input v-model="asiakas.puhnro" type="text"/>
            <label>Sähköpostiosoite</label>
            <input v-model="asiakas.email" type="text"/>
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
          katuosoite:'',
          postinro:'',
          kaupunki:'',
          puhnro:'',
          email:'',
        }
      }
    },
    methods: {
      teeVaraus(){
        console.log('Varaus Tehty');

      },
      peruutaVaraus(){
        console.log('Varaus peruttu');
      }
    }
  };
</script>

<style scoped>

</style>