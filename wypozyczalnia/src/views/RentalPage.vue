<template>
    <v-app>
        <Navigation/>
        <v-content>
            <v-container fluid>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "@/components/Navigation";

    export default {
        name: "RentalPage",
        components: {Navigation}
    }
</script>

<style scoped>

</style>