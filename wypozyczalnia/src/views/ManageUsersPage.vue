<template>
    <v-container fluid fill>
        <v-toolbar class="transparent" flat>
            <v-toolbar-title class="display-1">
                Użytkownicy
            </v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <br/>
        <template v-if="readyToRender" v-model="users" v-for="(user, index) in users">
            <v-card :key="index">
                <v-card-title primary-title>
                    <h3 class="title">{{user.firstName}} {{user.lastName}}</h3>
                </v-card-title>
                <v-divider/>
                <v-card-actions>
                    <v-layout row-wrap>
                        <div>
                            <v-btn outline color="info" class="margin5" @click="$router.push('/user/'+user.userId)">
                                Profil
                            </v-btn>
                            <v-btn class="margin5" outline color="info"
                                   @click="$router.push('/reservations/user/'+user.userId)">Rezerwacje
                            </v-btn>
                            <v-btn class="margin5" outline color="info"
                                   @click="$router.push('/borrowings/user/'+user.userId)">Wypożyczenia
                            </v-btn>
                        </div>
                        <v-spacer/>
                        <div align="right">
                            <v-btn v-if="hasAdminRights" class="margin5" @click="deleteDialog(user.userId)" outline
                                   color="error">Usuń
                            </v-btn>
                        </div>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <br/>
        </template>
        <v-dialog persistent v-model="deleteConfirm" max-width="500" style="align-content: center">
            <v-card style="max-width: 500px;">
                <v-card-title class="title">Czy na pewno chcesz usunąć użytkownika?</v-card-title>
                <v-card-text v-if="deleteErr">
                    <div class="caption font-weight-light error--text">Błąd. Nie można usunąć użytkownika</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" outline @click="deleteUser(selectedUId)">Tak</v-btn>
                    <v-btn outline @click="cancel">Nie</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ManageUsersPage",
        data() {
            return {
                users: null,
                readyToRender: false,
                hasAdminRights: false,
                deleteConfirm: false,
                selectedUId: 0,
                deleteErr: false,
            }
        },
        methods: {
            async getUsers() {
                try {
                    this.response = await axios.get('/users/');
                    if (this.response.status === 200) {
                        this.users = this.response.data;
                        this.readyToRender = true;
                    }
                } catch (e) {

                }
            },
            deleteDialog(id) {
                this.deleteConfirm = true;
                this.selectedUId = id;
            },
            async deleteUser(id) {
                try {
                    this.response = await axios.delete('/users/' + id);
                    if (this.response.status === 200) {
                        this.getUsers();
                        this.deleteConfirm = false;
                        this.deleteErr=false;
                    } else {
                        this.deleteErr = true;
                    }
                } catch (e) {
                    this.deleteErr = true;
                }
            },
            cancel(){
                this.deleteConfirm=false;
                this.deleteErr=false;
            }
        },
        mounted() {
            const role = JSON.parse(localStorage.getItem('user')).role;
            if (role === 'ADMIN') this.hasAdminRights = true;
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>