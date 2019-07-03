<template>
    <v-container v-if="readyToRender && hasAdminRights">
        <v-toolbar class="transparent" flat>
            <v-toolbar-title class="display-1">
                Edycja pozycji w katalogu
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
        <v-toolbar class="transparent" flat>
            <v-btn @click="updateItem" outline color="success">Zapisz</v-btn>
            <v-btn @click="$router.go(-1)" outline color="error">Anuluj</v-btn>
            <v-spacer/>
            <v-btn @click="deleteItem" outline color="error">Usuń</v-btn>
        </v-toolbar>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import DeleteButton from "@/components/DeleteButton";
    export default {
        name: "ItemEditPage",
        components: {DeleteButton},
        data(){
            return{
                id: 0,
                //availabilityOptions:[{itemName: 'Tak', itemValue: true}, {itemName: 'Nie', itemValue: false}],
                item: {itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                readyToRender: false,
                hasAdminRights: false,
                saved: false,
                error: false,
            }
        },
        methods: {
            async getItem()
            {
                this.id = this.$route.params.id;
                try{
                    this.response = await axios.get('http://localhost:5000/items/'+this.id);
                    if(this.response.status === 200){
                        this.item = this.response.data;
                        localStorage.setItem('data', JSON.stringify(this.item));
                        console.log('Pobrano item');
                        this.readyToRender = true
                    }
                    console.log(this.response.status)
                }
                catch (e) {
                    console.log('Blad pobierania itemu');
                    console.log(e)
                }
            },
            async deleteItem(){
                const answer = window.confirm('Czy na pewno chcesz usunąć tę pozycję?');
                if (answer)
                try{
                    //this.readyToRender=false;
                    this.response = await axios.delete('http://localhost:5000/items/'+ this.id);
                    this.$router.replace('/');
                    //this.readyToRender=true;
                }
                catch (e) {
                    console.log('Blad usuwania');
                }
            },
            async updateItem(){
                try{
                    this.response = await axios.put('http://localhost:5000/items/'+this.id, {"Name":this.item.name, "Signature":this.item.signature, "Description":this.item.description});
                    if(this.response.status === 200)
                    {
                        console.log('Zapisano item');
                        localStorage.removeItem('data');
                        this.saved = true;
                        this.$router.replace('/items/'+this.item.itemId);
                    }
                }
                catch (e) {
                    this.error=true;
                }
            }
        },
        mounted(){
            this.getItem();
            const user = JSON.parse(localStorage.getItem('user'));
            if(user.role === "ADMIN"){
                this.hasAdminRights=true;
                console.log("jestem adminem")
            }
        },
        beforeRouteLeave (to, from, next) {
            if(JSON.stringify(this.item) !== localStorage.getItem('data') && !this.saved){
                const answer = window.confirm('Czy na pewno chcesz opuścić stronę? Utracisz niezapisane zmiany.')
                if (answer) {
                    next()
                } else {
                    next(false)
                }
            }
            else{
                next()
            }
        },
    }
</script>

<style scoped>

</style>