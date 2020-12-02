<template>
    <div>
        <p>Varaus luotu onnistuneesti!</p>
        <p>Varauksesi numero on <b>{{varausnro}}</b></p>
        <p>Voit tarkastella varauksesi tietoja Oma varaus -sivulta.</p>
    </div>
</template>

<script>
  export default {
    name: 'varaus-onnistui',
    props: {
      varausnro: Number,
    },
  };
</script>

<style scoped>

</style>