<template>
    <v-container fluid fill>
        <div class="display-1">Katalog przedmiotów</div>
        <v-list>
            <v-list-tile
                    v-for="item in items"
                    :key="item.itemId"
            ></v-list-tile>
            <v-list-tile-content>{{item.name}}</v-list-tile-content>
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
            }
        },
        methods:{
            async getItems(){
                try{
                    this.response = await axios.get('http://localhost:5000/items');
                    if(this.response.status === 200){
                        //this.items = this.response.data
                        //localStorage.setItem('data', JSON.stringify(this.response.data))
                        console.log('Pobrano itemy')
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