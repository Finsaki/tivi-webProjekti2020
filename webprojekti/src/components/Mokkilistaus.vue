<template>
    <div id="mokkitiedot">
        <h2>Mökkitiedot</h2>
        <p>Valitse mökki listalta</p>
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
        <div v-if="this.valittuMokki === null">Mökkiä ei valittu</div>
        <div v-else>{{this.valittuMokki.nimi}}<br>
            <img :src="valittuMokki.kuva" alt="Kuva mökistä" height="500"></div>

        <h2>Varauksen kesto</h2>
        <p>Anna varauksen alkupäivämäärä: </p>
        <input type="date" v-model="aloitusPvm" v-on:change="muunnaPaivamaarat" v-bind:min="this.kalenterin1EkaPaiva">
        <p>Anna varauksen loppupäivämäärä: </p>
        <input type="date" v-model="lopetusPvm" v-on:change="muunnaPaivamaarat" v-bind:min="this.kalenterin2EkaPaiva">
        <strong>Valittu ajanjakso:</strong>
        <div v-if="!this.aloitusPvm || !this.lopetusPvm">Päivämääriä ei valittu</div>
        <div v-else>{{this.korjattuAloituspvm}} - {{this.korjattuLopetuspvm}}</div>
        <div v-if="this.kaikkiOk === false">Varmista että mökki ja varauksen aloituspäivämäärä sekä varauksen
            lopetuspäivämäärä ovat valittu
        </div>
        <p v-if="this.virheellinenAikavaliIlmoitus === true">Varauksen loppumispäivä ei voi olla sama tai ennen
            alkamispäivää!</p>
        <p v-if="this.mokkiVarattuIlmoitus === true">Mökki on jo varattu kyseiselle aikavälille!</p>
        <button v-on:click="valitseMokkiAjalle">Varaa mökki valitulle ajanjaksolle</button>

    </div>
</template>

<script>
  export default {
    name: 'mokkilistaus',
    props: {
      mokit: Array,
    },
    data() {
      return {
        //kayttajan valitsema mokki
        valittuMokki: null,
        //Aloitus- ja lopetuspäivämäärät muodossa YYYY-MM-dd
        aloitusPvm: null,
        lopetusPvm: null,
        //Aloitus- ja lopetuspäivämäärät muodossa dd.MM.YYYY
        korjattuAloituspvm: null,
        korjattuLopetuspvm: null,
        //boolean tietojen syötön tarkastamiseen
        kaikkiOk: true,
        virheellinenAikavaliIlmoitus: Boolean,
        mokkiVarattuIlmoitus: Boolean,
        // Valittu mökki varattu/vapaa
        mokkiVapaa: Boolean,
        //Kalentereissa ensimmäiset valittavat päivät
        kalenterin1EkaPaiva: Date,
        kalenterin2EkaPaiva: Date,
      };
    },
    mounted() {
      this.alustaKalenterinPaivat();
    },
    methods: {
      //@click metodi kayttaa tata funktiota kun kayttaja klikkaa tiettya rivia. Funktio tallettaa klikatun mokin omaan sisaiseen muuttujaan ID:n avulla
      valitseRivi(mokkiID) {
        for (let i = 0; i < this.mokit.length; i++) {
          if (mokkiID === this.mokit[i].id) {
            this.valittuMokki = this.mokit[i];
            break;
          }
        }
      },
      //'ValitseMokkiAjalle'-napin toiminta
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
      nollaaVirheilmoitukset() {
        this.kaikkiOk = true;
        this.virheellinenAikavaliIlmoitus = false;
        this.mokkiVarattuIlmoitus = false;
      },
      async haeMokinVaraustilanne() {
        try {
          const response = await fetch(
              'http://localhost:8081/api/varaukset/pvm?id=' + this.valittuMokki.id + '&start=' + this.aloitusPvm +
              '&end=' + this.lopetusPvm);
          const data = await response.json();
          console.log('tietokantahaun vastaus: ' + data);
          if (data === true) {
            this.mokkiVapaa = true;
            console.log('asetettu mokin arvoksi true');
          } else {
            this.mokkiVapaa = false;
            console.log('asetettu mokin arvoksi false');
          }
        } catch (error) {
          console.error(error);
        }
      },
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
      //Alustaa molempien kalentereiden päivämäärät nykyhetki ja nykyhetki + 1pv
      alustaKalenterinPaivat() {
        //Luodaan päivämuuttuja
        let paiva = new Date();
        //Asetetaan nykyhetki eka kalenterin muuttujaan muodossa yyyy-mm-dd
        this.kalenterin1EkaPaiva = paiva.toISOString().split('T')[0];
        //Siirretään päivää yhdellä eteenpäin ja lisätään toka kalenterin muuttujaksi
        paiva.setDate(paiva.getDate() + 1);
        this.kalenterin2EkaPaiva = paiva.toISOString().split('T')[0];
      },
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
        background-color: red;
    }

    tr:hover {
        cursor: pointer;
    }

    input {
        margin: auto;
        margin-bottom: 1em;
        max-width: 20em;
    }
</style>