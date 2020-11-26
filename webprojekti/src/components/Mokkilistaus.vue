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
        <tr :key="mokki.ID" v-for="mokki in mokit">
          <td>{{mokki.NIMI}}</td>
          <td>{{mokki.OSOITE}}</td>
          <td>{{mokki.HINTA}}</td>
          <td>{{mokki.HLOMAARA}}</td>
          <td>{{mokki.KUVAUS}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'mokkilistaus',
    props: {
      mokit: Array
    },
    methods: {
      valitseMokki() {
        /* ei viela valmis */
      }
    }
  };
</script>

<style scoped>

</style>