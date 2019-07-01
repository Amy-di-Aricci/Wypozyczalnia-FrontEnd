<template>
    <v-menu
            offset-y
            :close-on-content-click="false">
        <template v-slot:activator="{ on }">
            <v-btn icon
                   v-on="on"
            >
                <v-icon>fas fa-user</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-tile
                    @click="Login">
                <v-list-tile-title>Zaloguj się</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
                    @click="Register">
                <v-list-tile-title>Zarejestruj się</v-list-tile-title>
            </v-list-tile>
        </v-list>

    </v-menu>
</template>

<script>
    export default {
        name: "GuestUserMenu",
        methods:{
            Login(){
                this.$router.replace('/login')
            },
            Register(){
                this.$router.replace('/register')
            }
        }
    }
</script>

<style scoped>

</style>