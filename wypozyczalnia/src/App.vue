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
    }
  },
  methods:{
    redirect(){
      if (!localStorage.getItem('accessToken')) {
        this.$router.replace({path: "/login"});
      }
      else if (localStorage.getItem('accessToken')) {
        this.$router.replace('/');
      }
    }
  },
  mounted(){
    this.redirect();
  }
}


</script>
