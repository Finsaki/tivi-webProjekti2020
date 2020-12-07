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
      /**
       * Muuttuja johon haetaan näkymään siirryttäessä juuri luodun varauksen varausnumero eli ID
       * @type {Object}
       */
      varausnro: Number,
    },
  };
</script>

<style scoped>

</style>