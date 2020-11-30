<template>
    <div>
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

</style>