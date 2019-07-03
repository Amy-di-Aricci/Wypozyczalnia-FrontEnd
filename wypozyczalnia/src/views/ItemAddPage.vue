<template>
    <v-container v-if="hasAdminRights">
        <v-toolbar class="transparent" flat>
            <v-toolbar-title class="display-1">
                Dodawanie nowej pozycji do katalogu
            </v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <v-form>
            <v-text-field label="Nazwa" v-model="item.name" required/>
            <v-textarea auto-grow label="Opis" v-model="item.description"/>
            <v-text-field label="Identyfikator (opcjonalnie)" v-model="item.signature"/>
        </v-form>
        <v-divider/>
        <div v-if="error" class="error--text subheading">Błąd. Spróbuj ponownie.</div>
        <v-btn @click="addItem" outline color="success">Zapisz</v-btn>
        <v-btn @click="$router.go(-1)" outline color="error">Anuluj</v-btn>
    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ItemAddPage",
        data(){
            return{
                id: 0,
                item: {name: '', description: '', signature: ''},
                response: "",
                readyToRender: false,
                hasAdminRights: false,
                saved: false,
                error: false,
            }
        },
        methods:{
            async addItem(){
                try{
                    this.response = await axios.post('/items/', {"Name":this.item.name, "Signature":this.item.signature, "Description":this.item.description});
                    if(this.response.status === 200)
                    {
                        console.log('Zapisano item');
                        localStorage.removeItem('data');
                        this.saved = true;
                        this.$router.replace('/');
                    }
                }
                catch (e) {
                    this.error=true;
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            if ((JSON.stringify(this.item) !== localStorage.getItem('data')) && !(this.saved)) {
                const answer = window.confirm('Czy na pewno chcesz opuścić stronę? Utracisz niezapisane zmiany.')
                if (answer) {
                    next()
                } else {
                    next(false)
                }
            } else {
                next()
            }
        },
        mounted(){
            localStorage.setItem('data', JSON.stringify(this.item));
            const role = JSON.parse(localStorage.getItem('user')).role;
            if(role === 'ADMIN') this.hasAdminRights = true;
        }
    }
</script>

<style scoped>

</style>