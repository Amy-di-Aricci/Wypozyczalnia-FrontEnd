<template>
  <v-app>
  <Navigation/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import LeftNavBar from "@/components/LeftNavBar";
import TopToolbar from "@/components/TopToolbar";
import Navigation from "@/components/Navigation";

export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      drawer: true
    }
  }
}
</script>
