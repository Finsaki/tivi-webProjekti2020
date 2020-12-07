<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <navipalkki @uusiVarausNappi="uusiVarausNappi" @omaVarausNappi="omaVarausNappi"></navipalkki>
        <mokkilistaus :mokit="mokit"
                      @valitse:mokki="valitseMokki"
                      @valitse:aloitusPvm="valitseAloitusPvm"
                      @valitse:lopetusPvm="valitseLopetusPvm"
                      @valitseMokkiAjalleNappi="valitseMokkiAjalleNappi"
                      v-if="naytaMokkinakyma===true"/>
        <asiakastietolomake v-bind:valittuMokki="valittuMokki"
                            v-bind:valittuAloitusPvm="aloitusPvm"
                            v-bind:valittuLopetusPvm="lopetusPvm"
                            @varausOnnistunut="varausOnnistunut"
                            @peruutaNappi="peruutaNappi"
                            @lisaa:varausnro="lisaaVarausnro"
                            v-if="naytaAsiakasNakyma===true">
        </asiakastietolomake>
        <varausnakyma v-if="naytaVarausnakyma===true"/>
        <varaus-onnistui v-if="naytaVarausOnnistui===true" v-bind:varausnro="varausnro"></varaus-onnistui>
        <pohjapalkki></pohjapalkki>
    </div>
</template>

<script>
  import Varausnakyma from './components/Varausnakyma';
  import Navipalkki from './components/Navipalkki';
  import Mokkilistaus from './components/Mokkilistaus';
  import Asiakastietolomake from './components/Asiakastietolomake';
  import VarausOnnistui from '@/components/VarausOnnistui';
  import Pohjapalkki from './components/Pohjapalkki';

  export default {
    name: 'App',
    components: {
      Pohjapalkki,
      VarausOnnistui,
      Asiakastietolomake,
      Mokkilistaus,
      Navipalkki,
      Varausnakyma,
    },
    data() {
      return {
        /**
         * Taulukko johon tallennetaan tietokannasta haetut mokit
         * @type {Array}
         */
        mokit: [],
        /**
         * Muuttuja johon tallennetaan kayttajan valitsema mokki
         * @type {Object}
         */
        valittuMokki: null,
        /**
         * Muuttuja johon tallennetaan kayttajan valitsema aloituspäivämäärä
         * @type {Object}
         */
        aloitusPvm: null,
        /**
         * Muuttuja johon tallennetaan käyttäjän valitsema lopetuspäivämäärä
         * @type {Object}
         */
        lopetusPvm: null,
        //Elementtien näkyvyyksille alkuarvot
        /**
         * Muuttuja joka kertoo näytetäänkö Mökkinäkymä käyttäjälle vai ei
         * @type {boolean}
         */
        naytaMokkinakyma: true,
        /**
         * Muuttuja joka kertoo näytetäänkö Asiakasnäkymä käyttäjälle vai ei
         * @type {boolean}
         */
        naytaAsiakasNakyma: false,
        /**
         * Muuttuja joka kertoo näytetäänkö Varausnäkymä käyttäjälle vai ei
         * @type {boolean}
         */
        naytaVarausnakyma: false,
        /**
         * Muuttuja joka kertoo näytetäänkö Varaus onnistui -näkymä käyttäjälle vai ei
         * @type {boolean}
         */
        naytaVarausOnnistui: false,
        /**
         * Asiakkaan tekemän varauksen numero
         * @type {?number}
         */
        varausnro: null,
      };
    },
    mounted() {
      this.getMokit();
    },
    methods: {
      /**
       * Funktio hakee kaikkien mokkien tiedot tietokannasta ja tallentaa ne mokit lista-muuttujaan. Listaa kayttaa Mokkilistaus.vue
       *
       * @async
       * @function getMokit
       */
      async getMokit() {
        try {
          const response = await fetch('http://localhost:8081/api/mokit');
          const data = await response.json();
          for (let i = 0; i < data.numOfRows; i++) {
            let rivi = data.rows[i];
            let kuva = require('@/assets/mokki' + (i + 1) + '.jpg');
            this.mokit.push({
              'id': rivi.ID,
              'kuva': kuva,
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
      /**
       * Funktio tallettaa Mokkilistaus.vue:sta tulevan mökin tiedot valittuMokki muuttujaan
       * @param {Object} mokki - Yhden mökin tiedot sisältävä objekti
       */
      valitseMokki(mokki) {
        this.valittuMokki = mokki;
      },
      /**
       * Funktio tallettaa Mokkilistaus.vue:sta tulevan aloituspäivämäärän aloitusPvm muuttujaan
       * @param {Object} aloitusPvm - Käyttäjän valitsema varauksen alkupäivä Date muotoisena
       */
      valitseAloitusPvm(aloitusPvm) {
        this.aloitusPvm = aloitusPvm;
      },
      /**
       * Funktio tallettaa Mokkilistaus.vue:sta tulevan lopetuspäivämäärän lopetusPvm muuttujaan
       * @param {Object} lopetusPvm - Käyttäjän valitsema varauksen loppupäivä Date muotoisena
       */
      valitseLopetusPvm(lopetusPvm) {
        this.lopetusPvm = lopetusPvm;
      },
      /**
       * Navipalkin 'uusi varaus'-napin toiminto, siirtää näkymän takaisin mökkinäkymään.
       */
      uusiVarausNappi() {
        this.naytaMokkinakyma = true;
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaVarausOnnistui = false;
      },
      /**
       * Navipalkin 'oma varaus'-napin toiminto, siirtää näkymän Varauksen tarkastelu näkymään
       */
      omaVarausNappi() {
        this.naytaVarausnakyma = true;
        this.naytaAsiakasNakyma = false;
        this.naytaMokkinakyma = false;
        this.naytaVarausOnnistui = false;
      },
      /**
       * Mökkilistauksen 'valitse mökki'-napin toiminto, siirtää näkymän Asiakasnäkymään
       */
      valitseMokkiAjalleNappi() {
        this.naytaMokkinakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaAsiakasNakyma = true;
        this.naytaVarausOnnistui = false;
      },
      /**
       * Asiakasnäkymän peruuta-napin toiminto, siirtää näkymän takaisin Mökkinäkymään
       */
      peruutaNappi() {
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaMokkinakyma = true;
        this.naytaVarausOnnistui = false;
      },
      /**
       * Asettaa Varaus onnistui -näkymän nykyiseksi näkymäksi kun varaus viedään loppuun onnistuneesti Asiakasnäkymässä
       */
      varausOnnistunut() {
        this.naytaVarausOnnistui = true;
        this.naytaAsiakasNakyma = false;
        this.naytaVarausnakyma = false;
        this.naytaMokkinakyma = false;
      },
      /**
       * Funktio ottaa vastaan Asiakastietolomakkeesta välitetyn muuttujan omaan muuttujaan App.vuessa
       * @param {number} varausnro - App.vuelle Asiakastietolomake.vuesta välitetty varauksen id arvo
       */
      lisaaVarausnro(varausnro) {
        this.varausnro = varausnro;
      },
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
        padding-bottom: 10em;
    }
</style>
