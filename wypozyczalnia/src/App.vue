<template>
  <v-app id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"/>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      drawer: true,
      isLoggedIn: false,
    }
  },
}

if (!this.isLoggedIn) {
  this.$router.replace({name: "loginPage"});
}
else if (this.isLoggedIn) {
  this.$router.replace({name: "rentalPage"});
}
</script>
