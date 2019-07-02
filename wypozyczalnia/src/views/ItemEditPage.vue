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
            <v-textarea label="Opis" v-model="item.description" required/>
            <v-text-field label="Identyfikator (opcjonalnie)" v-model="item.signature"/>
            <v-select label="Dostępny" :items="item.isAvailable" item-text="['Tak', 'Nie']" value="[true, false]"></v-select>
        </v-form>
            {{item.description}}
        <br/>
        <p v-if="item.signature!==''" class="title">
            Identyfikator: {{item.signature}}
        </p>
        <v-divider/>
        <v-btn v-if="item.isAvailable" outline color="info">Wypożycz</v-btn>
        <v-btn v-if="!item.isAvailable" outline disabled>Niedostępny</v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "ItemEditPage",
        data(){
            return{
                id: 0,
                item: {itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                readyToRender: false,
                hasAdminRights: false,
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
                        //localStorage.setItem('data', this.item);
                        console.log('Pobrano item');
                        this.readyToRender = true
                    }
                    console.log(this.response.status)
                }
                catch (e) {
                    console.log('Blad pobierania itemu');
                    console.log(e)
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
        }
    }
</script>

<style scoped>

</style>