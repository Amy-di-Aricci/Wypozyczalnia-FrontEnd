<template>
    <div class="text-xs-center">
        <v-menu
                offset-y
                :close-on-content-click="false"
                :nudge-width="200"
        >
            <template v-slot:activator="{ on }">
                <v-btn icon
                       v-on="on"
                >
                    <v-icon>fas fa-user</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <v-list>
                        <v-list-tile-content>
                            <v-list-tile-title class="title">{{name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list>
                </v-card-title>
                <v-divider/>
                <v-card-actions>
                    <v-list>
                        <v-list-tile-content>
                            <v-list-tile @click="$router.push('/profile')">
                                <v-list-tile-title>Mój profil</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile
                                    @click="Logout">
                                <v-list-tile-title>Wyloguj</v-list-tile-title>
                            </v-list-tile>
                        </v-list-tile-content>
                    </v-list>
                </v-card-actions>

            </v-card>
        </v-menu>
    </div>
</template>

<script>
    export default {
        props: ["name"],
        name: "AuthenticatedUserMenu",
        methods:{
            Logout(){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                localStorage.clear();
                this.$router.replace('/login');
            }
        }
    }
</script>

<style scoped>

</style>