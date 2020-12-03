<template>
  <div>
      <img :src="require(`@/assets/logoVM.png`)" alt="firman logo" width="75" height="75">
      <p>Vuonosen Mökit! Mökinvuokrausta jo vuodesta 1932!<br><b>Yhteys:</b> info@vuonosenmokit.fi</p>
  </div>
</template>

<script>
    export default {
        name: "Pohjapalkki"
    }
</script>

<style scoped>

    div{
        position: absolute;
        bottom:0;
        width: 100%;
        height: 5em;
        border-top: solid #0366ee 2px;
        padding: 10px;
        background-color: rgba(3, 102, 238, 0.11);
        min-width: 40em;
    }
    img {
      position: absolute;
      bottom: 0.1em;
      right: 2em;
    }

</style>