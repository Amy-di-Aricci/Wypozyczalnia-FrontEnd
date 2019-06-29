<template>
  <v-app>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"/>
    <LoginPage/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import LeftNavBar from "@/components/LeftNavBar";
import TopToolbar from "@/components/TopToolbar";
import Navigation from "@/components/Navigation";
import LoginPage from "@/views/LoginPage";

export default {
  name: 'App',
  components: {
    Navigation,
    LoginPage
  },
  data () {
    return {
      isLoggedIn: false,
    }
  }
}
</script>
