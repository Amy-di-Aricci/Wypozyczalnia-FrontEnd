<template>
  <v-app id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"/>
    <router-view/>
  </v-app>
</template>

<script>
  import axios from 'axios';
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      drawer: true,
    }
  },
  methods:{
    redirect(){
      if (!localStorage.getItem('accessToken')) {
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        this.$router.replace('/login');
      }/*
      else if (localStorage.getItem('accessToken')) {
        this.$router.replace('/');
      }*/
    }
  },
  mounted(){
    this.redirect();
  },

}


</script>
