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
        <tr v-for="mokki in mokit" @click="valitseRivi(mokki.id)" :key="mokki.id" :class="{'highlight': (mokki.id == mokki)}">
          <td><img :src="mokki.kuva" alt="Kuva mökistä" height="100" ></td>
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
      <img :src="valittuMokki.kuva" alt="Kuva mökistä" height="500" ></div>

    <h2>Varauksen kesto</h2>
    <p>Anna varauksen alkupäivämäärä: </p>
    <input type="date" v-model="aloitusPvm">
    <p>Anna varauksen loppupäivämäärä: </p>
    <input type="date" v-model="lopetusPvm">
    <strong>Valittu ajanjakso:</strong>
    <div v-if="!this.aloitusPvm || !this.lopetusPvm">Päivämääriä ei valittu</div>
    <div v-else>{{this.aloitusPvm}} - {{this.lopetusPvm}}</div><br>

    <button v-on:click="valitseMokkiAjalle">Varaa mökki valitulle ajanjaksolle</button>
    <div v-if="this.kaikkiOk === false">Varmista että mökki ja varauksen aloituspäivämäärä sekä varauksen lopetuspäivämäärä ovat valittu</div>
  </div>
</template>

<script>
  export default {
    name: 'mokkilistaus',
    props: {
      mokit: Array
    },
    data() {
      return {
        //kayttajan valitsema mokki
        valittuMokki: null,
        //aloituspaivamaara
        aloitusPvm: null,
        //lopetuspaivamaara
        lopetusPvm: null,
        //boolean tietojen syötön tarkastamiseen
        kaikkiOk: true,
      }
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
        if (this.valittuMokki !=null && this.aloitusPvm != null && this.lopetusPvm != null){
          this.kaikkiOk = true;
          //Välitetään App.vueen tieto valitusta mokista
          this.$emit('valitse:mokki', this.valittuMokki);
          //Välitetetään App.vueen tieto valitusta alkupäivämäärästä
          this.$emit('valitse:aloitusPvm', this.aloitusPvm);
          //Välitetetään App.vueen tieto valitusta lopetuspäivämäärästä
          this.$emit('valitse:lopetusPvm', this.lopetusPvm);
          //välitetään App.vueen tieto napin painamisesta
          this.$emit('valitseMokkiAjalleNappi');
        } else {
          this.kaikkiOk = false;
        }
      }
    }
  };
</script>

<style scoped>
.highlight {
  background-color: red;
}
tr:hover{
  cursor: pointer;
}
input {
  margin: auto;
  margin-bottom: 1em;
  max-width: 20em;
}
</style>