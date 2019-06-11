<template>
    <v-toolbar
            dark
            scroll-off-screen
            app
            clipped-left
        id="top-toolbar">
        <v-toolbar-side-icon @click="drawer = !drawer"/>
        <v-toolbar-title>System wypożyczeń</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    export default {
        name: "TopToolbar",
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
#top-toolbar{
    clear:both !important;
}
</style>