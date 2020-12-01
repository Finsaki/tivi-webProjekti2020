<template>
  <div id="mokkitiedot">
    <h2>Mökkitiedot</h2>
    <p>Valitse mökki listalta</p>
    <table>
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Osoite</th>
          <th>Hinta</th>
          <th>Henkilömäärä</th>
          <th>Kuvaus</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="mokki.id" v-for="mokki in mokit" @click="valitseRivi(mokki.id)" :class="{'highlight': (mokki.id == valittuMokki)}">
          <td>{{mokki.nimi}}</td>
          <td>{{mokki.osoite}}</td>
          <td>{{mokki.hinta}}</td>
          <td>{{mokki.hlomaara}}</td>
          <td>{{mokki.kuvaus}}</td>
        </tr>
      </tbody>
    </table>

    <strong>Valittu mökki:</strong>
    <div v-if="this.valittuMokki === null">Ei valintaa</div>
    <div v-else>{{this.mokit[this.valittuMokki - 1].nimi}}</div>
    <button v-on:click="valitseMokki">Valitse mökki</button>
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
        valittuMokki: null
      }
    },
    methods: {
      //@click metodi kayttaa tata funktiota kun kayttaja klikkaa tiettya rivia. Funktio tallettaa klikatun mokin ID:n
      //omaan sisaiseen muuttujaan, seka vie sen App.vue:n omaan muuttujaan.
      //----> Omaa muuttujaa ei valttamatta tarvita jos valittu nakyma paivitetaan vasta asiakastietolomakkeeseen.
      valitseRivi(mokki) {
        this.valittuMokki = mokki;
        console.log("Valitun mökin ID on " + this.valittuMokki);
        this.$emit('valitse:mokki', this.valittuMokki)
      },
      //'Valitse mökki'-napin toiminta
      valitseMokki() {
        //Välitetään App.vueen tieto napin painamisesta
        if (this.valittuMokki !=null){
          this.$emit('valitseMokkiNappi');
        }

      }
    }
  };
</script>

<style scoped>
. highlight {
  background-color: red;
}
tr:hover{
  cursor: pointer;
}
</style>