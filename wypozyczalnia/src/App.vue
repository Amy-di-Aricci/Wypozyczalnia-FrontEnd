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
      //mainPath: 'http://localhost:5000'
    }
  },
  methods:{
    redirect(){
      if (!localStorage.getItem('accessToken')) {
        this.$router.replace({path: "/login"});
      }/*
      else if (localStorage.getItem('accessToken')) {
        this.$router.replace('/');
      }*/
    }
  },
  mounted(){
    this.redirect();
  }
}


</script>
