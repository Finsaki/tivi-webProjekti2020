<template>
  <div id="varaustiedot">

    <h2>Varaus</h2>

    <p>Varauksen tiedot</p>
    <ul>
      <li>Varausnumero {{}}</li>
      <li>Varauspäivämäärä {{}}</li>
      <li>Alkupäivämäärä {{}}</li>
      <li>Loppupäivämäärä {{}}</li>
      <li>Kokonaishinta {{}}</li>
    </ul>
    <br>
    <p>Varaajan tiedot</p>
    <ul>
      <li>Etunimi {{}}</li>
      <li>Sukunimi {{}}</li>
      <li>Katuosoite {{}}</li>
      <li>Postinumero {{}}</li>
      <li>Kaupunki {{}}</li>
      <li>Sähköposti {{}}</li>
      <li>Puhelinnumero {{}}</li>
    </ul>
    <br>
    <p>Mökin tiedot</p>
    <ul>
      <li>Mökin nimi {{}}</li>
      <li>Mökin osoite {{}}</li>
      <li>Hinta/Päivä {{}}</li>
      <li>Max henkilömäärä {{}}</li>
      <li>Mökin kuvaus {{}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'varausnakyma'
  };
</script>

<style scoped>
/* Poistettu turhat bullet pointit */
  ul {
    list-style: none; /* Remove list bullets */
    padding: 0;
    margin: 0;
  }
</style>