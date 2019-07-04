<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title v-if="!ownProfile" class="display-1">Profil użytkownika {{user.firstName}} {{user.lastName}}</v-toolbar-title>
            <v-toolbar-title v-if="ownProfile" class="display-1">Mój profil</v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <v-divider/>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="headline">
                Dane osobowe
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon @click="" color="info" fab small><v-icon>edit</v-icon></v-btn>
        </v-toolbar>

    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ProfilePage",
        data(){
            return{
                userId: 0,
                ownProfile: false,
                user: null,
                hasAdminRights: false,
            }
        },
        methods: {
            async getUser(){
                if(this.$route.params.id != null) {
                    this.userId = this.$route.params.id;
                    try{
                        this.response = await axios.get('/users/'+this.userId);
                        this.user = this.response.data;
                        this.ownProfile = false;
                    }
                    catch (e) {

                    }
                }
                else
                {
                    this.user = JSON.parse(localStorage.getItem('user'));
                    this.ownProfile = true;
                }
            },
        },
        mounted(){
            this.getUser();
            const role = JSON.parse(localStorage.getItem('user')).role;
            if(role === 'ADMIN') this.hasAdminRights = true;
        }
    }
</script>

<style scoped>

</style>