<template>
    <v-container fluid fill>
        <div class="display-1">Katalog przedmiotów</div>
        <br/>
        <!--<v-list v-if="readyToRender">
            <v-list-tile
                    v-for="item in items"
                    :key="item.itemId"
                    three-line
            >
                <v-list-tile-content>
                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn>Wypożycz</v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>-->
        <template v-for="item in items">
            <v-card v-bind:key="item.itemId">
                <v-card-title primary-title>
                    <h3 class="title">{{item.name}}</h3>
                </v-card-title>
                <v-divider/>
                <v-card-text class="text-truncate">
                    {{item.description}}
                </v-card-text>
                <v-card-actions>
                    <v-btn outline color="info" @click="$router.replace('/item/'+item.itemId)">Szczegóły</v-btn>
                    <v-btn v-if="item.isAvailable" outline color="info">Wypożycz</v-btn>
                    <v-btn v-if="!item.isAvailable" outline disabled>Niedostępny</v-btn>
                </v-card-actions>
            </v-card>
            <br/>
        </template>
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
                readyToRender: false,
                hasAdminRights: false
            }
        },
        methods:{
            async getItems(){
                try{
                    this.response = await axios.get('http://localhost:5000/items');
                    if(this.response.status === 200){
                        this.items = this.response.data;
                        localStorage.setItem('data', this.items);
                        console.log('Pobrano itemy');
                        this.readyToRender = true
                    }
                    console.log(this.response.status)
                }
                catch (e) {
                    console.log('Blad pobierania itemow');
                    console.log(e)
                }
            },
            goToDetails(){

            }
        },
        mounted(){
            this.getItems();
            const role = localStorage.getItem('user').role;
            if(role==='ADMIN') this.hasAdminRights = true
        }
    }


</script>

<style scoped>

</style>