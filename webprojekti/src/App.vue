<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <h1>Mökkivarausjärjestelmä</h1>
    <navipalkki></navipalkki>
    <mokkilistaus :mokit="mokit"/>
    <asiakastietolomake></asiakastietolomake>
    <varausnakyma />
  </div>
</template>

<script>
import Varausnakyma from './components/Varausnakyma';
import Navipalkki from './components/Navipalkki';
import Mokkilistaus from './components/Mokkilistaus';
import Asiakastietolomake from './components/Asiakastietolomake';

export default {
  name: 'App',
  components: {
    Asiakastietolomake,
    Mokkilistaus,
    Navipalkki,
    Varausnakyma
  },
  /* testidataa, poistetaan kun yhdistetty tietokantaan */
  data() {
    return {
      mokit: [
        {
        ID: 1,
        NIMI: "TestiMökki 1",
        OSOITE: "Mökkitie 1 A 1",
        HINTA: 80,
        HLOMAARA: 3,
        KUVAUS: "Pieni mökki kolmelle"
        },
        {
        ID: 2,
        NIMI: "TestiMökki 2",
        OSOITE: "Mökkitie 1 A 2",
        HINTA: 500,
        HLOMAARA: 12,
        KUVAUS: "Iso mökki tämä"
        }
      ]
    }
  }
}
</script>

<style>
#app {
    
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
