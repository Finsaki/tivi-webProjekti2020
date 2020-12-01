<template>
    <div>
        <p>Varaus luotu onnistuneesti!</p>
        <p>Varauksesi numero on <b>{{varausnro}}</b></p>
    </div>

</template>

<script>
  export default {
    name: 'varaus-onnistui',
    props: {
      varausnro: null
    }
  };
</script>

<style scoped>

</style>