<template>
<<<<<<< Updated upstream
  <v-app>
  <Navigation/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
=======
  <v-app id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"/>
    <router-view></router-view>
>>>>>>> Stashed changes
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import LeftNavBar from "@/components/LeftNavBar";
import TopToolbar from "@/components/TopToolbar";
import Navigation from "@/components/Navigation";
<<<<<<< Updated upstream
=======
import LoginPage from "@/views/LoginPage";
import RentalPage from "@/views/RentalPage";
>>>>>>> Stashed changes

export default {
  name: 'App',
  components: {
<<<<<<< Updated upstream
    Navigation
=======
    RentalPage,
    Navigation,
    LoginPage
>>>>>>> Stashed changes
  },
  data() {
    return {
      drawer: true
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.replace({name: "loginPage"});
    }
    else if (this.isLoggedIn){
      this.$router.replace({name: "rentalPage"});
    }
  }
}

</script>
