<template>
    <div>
        <img :src="require(`@/assets/logoVM.png`)" alt="firman logo" width="150" height="150">
        <h1>Vuonosen Mökit</h1>
        <h2>Mökkivarausjärjestelmä</h2>
        <button id="nappi-uusiVaraus" v-on:click="uusiVarausToiminto">Uusi varaus</button>
        <button id="nappi-omaVaraus" v-on:click="omaVarausToiminto">Oma varaus</button>
    </div>
</template>

<script>
  export default {
    name: 'navipalkki',
    methods: {
      uusiVarausToiminto() {
        this.$emit('uusiVarausNappi');
      },
      omaVarausToiminto() {
        this.$emit('omaVarausNappi');
      },
    },
  };
</script>

<style scoped>

  div{
    width: 100%;
    height: auto;
    border-bottom: solid #0366ee 2px;
    padding: 10px;
    background-color: rgba(3, 102, 238, 0.11);
    min-width: 50em;
  }

  h1{
    font-size: 3em;
    margin-top: 0em;
    margin-bottom: 0.1em;
    padding-left: 3em;
    padding-right: 3em;
  }
  h2{
    font-size: 1.5em;
    margin-top: 0em;
    margin-bottom: 0.5em;
  }
  button {
    margin-right: 1em;
    margin-left: 1em;
  }
  img {
    position: absolute;
    top: 1em;
    left: 1em;
  }

</style>