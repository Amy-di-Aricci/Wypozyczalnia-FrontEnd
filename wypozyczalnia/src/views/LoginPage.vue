<template>
    <v-container id="login" fluid fill-height>
        <v-layout align-center justify-center>
            <v-toolbar
                    dark
                    scroll-off-screen
                    app
                    clipped-left
                    id="top-toolbar">
                <v-toolbar-title>System wypożyczeń</v-toolbar-title>
                <v-spacer/>
                <GuestUserMenu/>
            </v-toolbar>
        <div>
            <v-card flat width="500">
                <v-card-title class="display-1">Zaloguj się</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="input.username" label="Login" reguired></v-text-field>
                        <v-text-field type="password" v-model="input.password" label="Hasło" required></v-text-field>
                    </v-form>
                    <div v-if="error" class="error--text subheading">Błąd logowania. Spróbuj ponownie.</div>
                </v-card-text>
                <v-card-actions>
                    <div>
                        <v-btn color="success" @click="login">Zaloguj</v-btn>
                    </div>
                </v-card-actions>
                <br/>
                <div align="center">Nie posiadasz konta? <v-btn outline small color="success" @click="$router.push('/register')">Zarejestruj się</v-btn></div>
            </v-card>
        </div>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import GuestUserMenu from "@/components/GuestUserMenu";
    export default {
        name: "LoginPage",
        components: {GuestUserMenu},
        data(){
            return{
                    input:{
                        username: "",
                        password: ""
                },
                isLoggedIn: false,
                response: "",
                error: false,
            }
        },
        methods: {
            async login(){
                try{this.response = await axios.post('/login', {"username":this.input.username, "password":this.input.password});
                    if(this.response.status === 200){
                        localStorage.setItem('accessToken', this.response.data.token);
                        localStorage.setItem('user', JSON.stringify(this.response.data));
                        this.isLoggedIn=true;
                        this.error=false;
                        this.$router.replace('/');
                    }} catch (e) {
                    this.error = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>