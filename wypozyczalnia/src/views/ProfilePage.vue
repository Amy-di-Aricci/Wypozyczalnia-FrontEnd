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
            <v-btn icon @click="dialogNames=true" color="info" fab small><v-icon>edit</v-icon></v-btn>
        </v-toolbar>
            <v-list style="margin: 10px">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span class="title">Imię: </span> <span class="title font-weight-light">{{user.firstName}}</span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span class="title">Nazwisko: </span> <span class="title font-weight-light">{{user.lastName}}</span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <div v-if="hasAdminRights">
                <v-divider/>
                <v-list style="margin: 10px">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <span class="title">Rola: </span> <span class="title font-weight-light">{{user.role}}</span>
                            </v-list-tile-title>

                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click="dialogRole=true" color="info" fab small><v-icon>edit</v-icon></v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </div>
        <v-divider/>
        <br/>
        <v-toolbar flat class="transparent">
            <div v-if="hasAdminRights">
                <v-btn outline color="info" @click="$router.push('/reservations/user/'+user.userId)">Rezerwacje</v-btn>
                <v-btn outline color="info" @click="$router.push('/borrowings/user/'+user.userId)">Wypożyczenia</v-btn>
            </div>
            <v-spacer v-if="hasAdminRights"/>
            <v-btn v-if="ownProfile" @click="dialogPassword = true" outline color="warning">Zmień hasło</v-btn>
        </v-toolbar>
        <v-dialog persistent v-model="dialogNames" max-width="500" style="align-content: center">
            <v-card style="max-width: 500px;">
                <v-card-text>
                    <v-form ref="nameForm" v-model="nameForm">
                        <v-text-field :rules="[rules.required]" v-model="firstName" label="Imię" required></v-text-field>
                        <v-text-field :rules="[rules.required]" v-model="lastName" label="Nazwisko" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" outline @click="changeNames">Zapisz</v-btn>
                    <v-btn color="error" outline @click="dialogNames=false">Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="dialogPassword" max-width="500" style="align-content: center">
            <v-card style="max-width: 500px;">
                <v-card-text>
                    <v-form ref="passwordForm" v-model="passwordForm">
                        <v-text-field type="password" :rules="[rules.required, rules.min]" v-model="password" label="Hasło" required></v-text-field>
                        <v-text-field type="password" :rules="[rules.matching, rules.required, rules.min]" v-model="passwordConfirm" label="Powtórz hasło" required></v-text-field>
                    </v-form>
                    <div class="caption font-weight-light error--text" v-if="passErr">Błąd. Nie udało się zmienić hasła.</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" outline @click="changePassword">Zapisz</v-btn>
                    <v-btn color="error" outline @click="cancel">Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="passResponse" max-width="400" style="align-content: center">
            <v-card style="max-width: 400px">
                <v-card-title>
                    <v-icon color="success" style="margin: 10px">fas fa-check</v-icon>
                    <span class="title green--text">Hasło zmienione pomyślnie.</span>
                </v-card-title>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn outline color="success" @click="passResponse=false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogRole" max-width="500" style="align-content: center">
            <v-card style="max-width: 500px;">
                <v-card-title class="title">Wybierz rolę</v-card-title>
                <v-card-text>
                    <v-select
                    :items = roles
                    v-model = roleChoice>
                    </v-select>
                    <div v-if="roleErr" class="caption font-weight-light error--text">Błąd. Nie można zmienić roli</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" outline @click="changeRole">Zapisz</v-btn>
                    <v-btn color="error" outline @click="dialogRole=false">Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ProfilePage",
        data(){
            return{
                rules: {
                    required: value => !!value || 'Pole wymagane.',
                    min: v => v.length >= 5 || 'Co najmniej 5 znaków',
                    matching: value => value === this.password || 'Hasła muszą się zgadzać',
                },
                firstName: "",
                lastName: "",
                userId: 0,
                ownProfile: false,
                user: {
                    userId: 0,
                    firstName: "",
                    lastName: "",
                    username: "",
                    role: ""
                },
                hasAdminRights: false,
                dialogNames: false,
                dialogRole: false,
                dialogPassword: false,
                nameForm: false,
                passwordForm: false,
                roleChoice: "",
                roles: ['ADMIN', 'USER'],
                response: "",
                password: "",
                passwordConfirm: "",
                passResponse: false,
                passErr: false,
                roleErr: false,
            }
        },
        methods: {
            async getUser(){
                if(this.$route.params.id != null) {
                    this.userId = this.$route.params.id;
                    this.ownProfile = false;
                }
                else
                {
                    this.ownProfile = true;
                    this.userId = JSON.parse(localStorage.getItem('user')).userId;
                }
                try {
                    this.response = await axios.get('/users/'+this.userId);
                    this.user = this.response.data;
                    if(this.response.status === 200 && this.ownProfile){
                        localStorage.setItem('user', JSON.stringify(this.user));
                    }
                }
                catch (e) {

                }
                this.firstName = this.user.firstName;
                this.lastName = this.user.lastName;
                this.roleChoice = this.user.role;
            },
            async changePassword(){
                this.$refs.passwordForm.validate();
                if(this.passwordForm){
                    try{
                        this.response = await axios.put('/users/change/password', {"Password":this.password, "RepeatedPassword":this.passwordConfirm});
                        if(this.response.status === 200)
                            this.passResponse = true;
                    }
                    catch (e) {
                        this.passErr = true;
                    }
                    this.dialogPassword = false;
                }
            },
            cancel(){
                this.dialogPassword=false;
                this.$refs.passwordForm.reset();
            },
            async changeNames(){
                this.$refs.nameForm.validate();
                if((this.firstName !== this.user.firstName) || (this.lastName !== this.user.lastName))
                {
                    if(this.nameForm){
                        try{
                            this.response = await axios.put('/users/'+this.user.userId, {"FirstName":this.firstName, "LastName":this.lastName});
                            if(this.response.status === 200){
                                this.getUser();
                                this.dialogNames = false;
                            }
                        }
                        catch (e) {

                        }
                    }
                }
            },
            async changeRole(){
                try{
                    this.response = await axios.put('/users/'+this.user.userId+'/change/role', {"role":this.roleChoice});
                    if(this.response.status === 200){
                        this.getUser();
                        this.dialogRole = false;
                    }
                    else{
                        this.roleErr = true;
                    }
                }
                catch (e) {
                    this.roleErr = true;
                }
            }
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