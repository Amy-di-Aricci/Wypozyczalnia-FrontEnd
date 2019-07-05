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
        <br/>
        <div v-if="error" class="error--text subheading">Błąd. Spróbuj ponownie.</div>
        <v-layout row-wrap>
            <div align="left">
                <v-btn class="margin5" @click="updateItem" outline color="success">Zapisz</v-btn>
                <v-btn class="margin5" @click="$router.go(-1)" outline color="error">Anuluj</v-btn>
            </div>
            <v-spacer/>
            <div align="right">
                <v-btn class="margin5" @click="deleteItem" outline color="error">Usuń</v-btn>
            </div>
        </v-layout>
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
                    this.response = await axios.get('/items/'+this.id);
                    if(this.response.status === 200){
                        this.item = this.response.data;
                        localStorage.setItem('data', JSON.stringify(this.item));
                        this.readyToRender = true
                    }
                }
                catch (e){}
            },
            async deleteItem(){
                const answer = window.confirm('Czy na pewno chcesz usunąć tę pozycję?');
                if (answer)
                try{
                    //this.readyToRender=false;
                    this.response = await axios.delete('/items/'+ this.id);
                    this.$router.replace('/');
                    //this.readyToRender=true;
                }
                catch (e){}
            },
            async updateItem(){
                try{
                    this.response = await axios.put('/items/'+this.id, {"Name":this.item.name, "Signature":this.item.signature, "Description":this.item.description});
                    if(this.response.status === 200)
                    {
                        localStorage.removeItem('data');
                        this.saved = true;
                        this.$router.replace('/items/'+this.itemId);
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
    .margin5{
        margin: 5px !important;
    }
</style>