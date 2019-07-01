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
            @click="Logout">
                <v-list-tile-title>Wyloguj</v-list-tile-title>
            </v-list-tile>
        </v-list>

    </v-menu>
</template>

<script>
    export default {
        name: "AuthenticatedUserMenu",
        methods:{
            Logout(){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                this.$router.replace('/login');
            }
        }
    }
</script>

<style scoped>

</style>