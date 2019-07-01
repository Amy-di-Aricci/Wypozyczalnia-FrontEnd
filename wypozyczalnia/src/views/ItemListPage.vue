<template>
    <v-container fluid fill>
        <div class="display-1">Katalog przedmiotów</div>
        <v-list v-if="readyToRender">
            <v-list-tile
                    v-for="item in items"
                    :key="item.itemId"
            >
                <v-list-tile-content>{{item.name}}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ItemListPage",
        data(){
            return{
                response: "",
                items: [{itemId: null, name: '', description: '', signature: null, isAvailable: null}],
                readyToRender: false
            }
        },
        methods:{
            async getItems(){
                try{
                    this.response = await axios.get('http://localhost:5000/items');
                    if(this.response.status === 200){
                        this.items = this.response.data
                        localStorage.setItem('data', this.items)
                        console.log('Pobrano itemy')
                        this.readyToRender = true
                    }
                    console.log(this.response.status)
                }
                catch (e) {
                    console.log('Blad pobierania itemow')
                    console.log(e)
                }
            }
        },
        computed:{

        },
        mounted(){
            this.getItems();

        }
    }


</script>

<style scoped>

</style>