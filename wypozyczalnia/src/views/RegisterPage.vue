<template>
    <v-container fluid fill-height>
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
                    <v-card-title class="display-1">Zarejestruj się</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="validForm">
                            <p class="caption error--text" v-if="repeated">Użytkownik o takim loginie już istnieje</p>
                            <v-text-field :rules="[rules.required, rules.min]" v-model="input.username" label="Login" reguired></v-text-field>
                            <v-text-field :rules="[rules.required, rules.min]" type="password" v-model="input.password" label="Hasło" required></v-text-field>
                            <v-text-field :rules="[rules.required]" v-model="input.firstName" label="Imię" required></v-text-field>
                            <v-text-field :rules="[rules.required]" v-model="input.lastName" label="Nazwisko" required></v-text-field>
                        </v-form>
                        <div v-if="error" class="error--text subheading">Błąd rejestracji. Spróbuj ponownie.</div>
                    </v-card-text>
                    <v-card-actions>
                        <div>
                            <v-btn color="success" @click="register">Zarejestruj się</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import GuestUserMenu from "@/components/GuestUserMenu";
    export default {
        name: "RegisterPage",
        components: {GuestUserMenu},
        data(){
            return{
                input:{
                    username: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                },
                rules: {
                    required: value => !!value || 'Pole wymagane.',
                    min: v => v.length >= 5 || 'Co najmniej 5 znaków',
                },
                isLoggedIn: false,
                response: "",
                error: false,
                message: "",
                repeated: false,
                validForm: false,
            }
        },
        methods:{
            async register(){
                this.$refs.form.validate();
                if(this.validForm)
                try{this.response = await axios.post('/users', {"Username":this.input.username, "Password":this.input.password, "FirstName":this.input.firstName, "LastName":this.input.lastName});
                    if(this.response.status === 200){
                        await this.login();
                        this.error=false;
                        this.$router.replace('/');
                    }
                    else if(this.response.status === 400){
                        if(this.response.data.Username ==="User already exists")
                            this.repeated = true;
                    }
                }
                catch (e) {
                    if(e.response.data.Username[0] === "User already exists")
                        this.repeated = true;
                    else this.error=true;
                }
            },
            async login(){
                try{this.response = await axios.post('/login', {"username":this.input.username, "password":this.input.password});
                    if(this.response.status === 200){
                        localStorage.setItem('accessToken', this.response.data.token);
                        localStorage.setItem('user', JSON.stringify(this.response.data));
                        this.isLoggedIn=true;
                    }} catch (e) {
                }
            }
        }
    }
</script>

<style scoped>

</style>