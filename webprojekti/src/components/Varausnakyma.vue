<template>
    <div id="varaustiedot">

        <h2>Varaus</h2>

        <p>Hae varauksesi varausnumerolla.</p>
        <form v-on:submit.prevent="haeVaraus">
            <label>Varausnumero:</label>
            <input v-model="id" type="text" pattern="[0-9]+" maxlength="5" required/>

            <button>Hae</button>
        </form>

        <div :key="tieto.id" v-for="tieto in tiedot">
            <label>Varauksen tiedot</label>
            <ul>
                <li>Varausnumero: {{tieto.id}}</li>
                <li>Varauspäivämäärä: {{tieto.varauspvm}}</li>
                <li>Alkupäivämäärä: {{tieto.alkupvm}}</li>
                <li>Loppupäivämäärä: {{tieto.loppupvm}}</li>
                <li>Kokonaishinta: {{tieto.kokhinta}} €</li>
            </ul>

            <label>Varatun mökin tiedot</label>
            <ul>
                <li>Mökin nimi: {{tieto.mokinnimi}}</li>
                <li>Mökin osoite: {{tieto.mokinosoite}}</li>
                <li>Hinta/Päivä: {{tieto.hinta}} €</li>
                <li>Max henkilömäärä: {{tieto.hlomaara}}</li>
                <li>Mökin kuvaus: {{tieto.kuvaus}}</li>
            </ul>

            <label>Varaajan tiedot</label>
            <ul>
                <li>Etunimi: {{tieto.etunimi}}</li>
                <li>Sukunimi: {{tieto.sukunimi}}</li>
                <li>Katuosoite: {{tieto.katuosoite}}</li>
                <li>Postinumero: {{tieto.postinro}}</li>
                <li>Kaupunki: {{tieto.kaupunki}}</li>
                <li>Puhelinnumero: {{tieto.puhenro}}</li>
                <li>Sähköposti: {{tieto.email}}</li>
            </ul>

            <br>
        </div>

        <p v-if="virhe">❗ Antamallasi numerolla ei löytynyt varausta ❗</p>

    </div>
</template>

<script>
  export default {
    name: 'varausnakyma',

    data() {
      return {
        id: '',
        tiedot: [],
        virhe: false,
      };
    },
    methods: {
      async haeVaraus() {
        //alustaa sivun aina haettaessa
        this.tiedot = [];
        try {
          let id = this.id;
          const response = await fetch('http://localhost:8081/api/varaukset/id?id=' + id);
          const data = await response.json();
          const response2 = await fetch('http://localhost:8081/api/mokit/id?id=' + data[0].MOKKIID);
          const data2 = await response2.json();
          const response3 = await fetch('http://localhost:8081/api/asiakkaat/id?id=' + data[0].ASIAKASID);
          const data3 = await response3.json();
          console.log(data);
          console.log(data3);
          console.log(data2);
          let varauspvm = new Date(data[0].VARAUSPVM);
          let alkupvm = new Date(data[0].ALKUPVM);
          let loppupvm = new Date(data[0].LOPPUPVM);
          let dateFormat = require('dateformat');
          this.tiedot.push({
            'id': data[0].ID,
            'mokkiid': data[0].MOKKIID,
            'asiakasid': data[0].ASIAKASID,
            'varauspvm': dateFormat(varauspvm, 'dd.mm.yyyy HH:MM'),
            'alkupvm': dateFormat(alkupvm, 'dd.mm.yyyy'),
            'loppupvm': dateFormat(loppupvm, 'dd.mm.yyyy'),
            'kokhinta': data[0].KOKHINTA,
            'etunimi': data3[0].ETUNIMI,
            'sukunimi': data3[0].SUKUNIMI,
            'katuosoite': data3[0].KATUOSOITE,
            'postinro': data3[0].POSTINRO,
            'kaupunki': data3[0].KAUPUNKI,
            'puhenro': data3[0].PUHNRO,
            'email': data3[0].EMAIL,
            'mokinnimi': data2[0].NIMI,
            'mokinosoite': data2[0].OSOITE,
            'hinta': data2[0].HINTA,
            'hlomaara': data2[0].HLOMAARA,
            'kuvaus': data2[0].KUVAUS,
          });
          this.virhe = false;

        } catch (error) {
          this.virhe = true;
          console.error(error);
        }
      },
    },
  };
</script>

<style scoped>

    ul {
        /* Poistettu turhat bullet pointit */
        list-style: none;
        padding: 0;
        max-width: 20%;
        min-width: 10em;
        margin-left: 40%;
        margin-right: 40%;
        border-top: solid black 2px;
    }

    li{
      border-bottom: solid black 2px;
      border-left: solid black 2px;
      border-right: solid black 2px;
    }

    input {
      margin: auto;
      margin-bottom: 1em;
      max-width: 20em;
    }

</style>