<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <h1>Mökkivarausjärjestelmä</h1>
        <navipalkki @uusiVarausNappi="uusiVarausNappi" @omaVarausNappi="omaVarausNappi"></navipalkki>
        <mokkilistaus :mokit="mokit" @valitse:mokki="valitseMokit" @valitseMokkiNappi="valitseMokkiNappi"
                      v-if="naytaMokkinakyma===true"/>
        <asiakastietolomake v-bind:valittuMokki="valittuMokki" @varausOnnistunut="varausOnnistunut" @peruutaNappi="peruutaNappi" @lisaa:varausnro="lisaaVarausnro"
                            v-if="naytaAsiakasNakyma===true"></asiakastietolomake>
        <varausnakyma v-if="naytaVarausnakyma===true"/>
        <varaus-onnistui v-if="naytaVarausOnnistui===true" v-bind:varausnro="varausnro"></varaus-onnistui>
    </div>
</template>

<script>
  import Varausnakyma from './components/Varausnakyma';
  import Navipalkki from './components/Navipalkki';
  import Mokkilistaus from './components/Mokkilistaus';
  import Asiakastietolomake from './components/Asiakastietolomake';
  import VarausOnnistui from '@/components/VarausOnnistui';

  export default {
    name: 'App',
    components: {
      VarausOnnistui,
      Asiakastietolomake,
      Mokkilistaus,
      Navipalkki,
      Varausnakyma,
    },
    data() {
      return {
        //taulukko johon tallennetaan tietokannasta haetut mokit
        mokit: [],
        //kayttajan mokkilistauksesta klikkaama mokki
        valittuMokki: null,
        //Elementtien näkyvyyksille alkuarvot
        naytaMokkinakyma: true,
        naytaAsiakasNakyma: false,
        naytaVarausnakyma: false,
        naytaVarausOnnistui: false,
        //Asiakkaan tekemän varauksen numero
        varausnro: null,
      };
    },
    mounted() {
      this.getMokit();
    },
    methods: {
      //Funktio hakee kaikkien mokkien tiedot tietokannasta ja tallentaa ne mokit lista-muuttujaan. Listaa kayttaa Mokkilistaus.vue
      async getMokit() {
        try {
          const response = await fetch('http://localhost:8081/api/mokit');
          const data = await response.json();
          for (let i = 0; i < data.numOfRows; i++) {
            let rivi = data.rows[i];
            this.mokit.push({
              'id': rivi.ID,
              'nimi': rivi.NIMI,
              'osoite': rivi.OSOITE,
              'hinta': rivi.HINTA,
              'hlomaara': rivi.HLOMAARA,
              'kuvaus': rivi.KUVAUS,
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
      //Funktio tallentaa valitun mokin tiedot valittuMokki muuttujaan kun sita klikataan Mokkilistaus.vue:n kautta
      async valitseMokit(mokkiID) {
        for (let i = 0; i < this.mokit.length; i++) {
          if (mokkiID === this.mokit[i].id) {
            this.valittuMokki = this.mokit[i];
            break;
          }
        }
        //this.valittuMokki = this.mokit[mokkiID];
        console.log('app.vuessa valittu mokki: ' + this.valittuMokki.nimi);
      },
      //Navipalkin 'uusi varaus'-napin toiminto
      uusiVarausNappi() {
        this.naytaMokkinakyma = true;
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaVarausOnnistui = false;
      },
      //Navipalkin 'oma varaus'-napin toiminto
      omaVarausNappi() {
        this.naytaVarausnakyma = true;
        this.naytaAsiakasNakyma = false;
        this.naytaMokkinakyma = false;
        this.naytaVarausOnnistui = false;
      },
      //Mökkilistauksen 'valitse mökki'-napin toiminto
      valitseMokkiNappi() {
        this.naytaMokkinakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaAsiakasNakyma = true;
        this.naytaVarausOnnistui = false;
      },
      //Asiakasnäkymän peruuta-napin toiminto
      peruutaNappi() {
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaMokkinakyma = true;
        this.naytaVarausOnnistui = false;
      },
      varausOnnistunut() {
        this.naytaVarausOnnistui = true;
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaMokkinakyma = false;
      },
      lisaaVarausnro(varausnro) {
        this.varausnro = varausnro;
      }
    },
  };
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
