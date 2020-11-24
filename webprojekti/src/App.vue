<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Mökkivarausjärjestelmä</h1>
    <navipalkki></navipalkki>
    <mokkilistaus></mokkilistaus>
    <asiakastietolomake></asiakastietolomake>
    <varausnakyma></varausnakyma>
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
