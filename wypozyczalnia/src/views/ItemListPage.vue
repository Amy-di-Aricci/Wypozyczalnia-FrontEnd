<template>
    <v-container fluid fill>
        <v-toolbar class="transparent" flat>
            <v-toolbar-title class="display-1">
                Katalog przedmiotów
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon v-if="hasAdminRights" @click="$router.push('/item/add')" color="success" fab><v-icon>fas fa-plus</v-icon></v-btn>
        </v-toolbar>
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
        <template v-if="readyToRender" v-model="items" v-for="(item, index) in items">
            <v-card :key="index">
                <v-card-title primary-title>
                    <h3 class="title">{{item.name}}</h3>
                </v-card-title>
                <v-divider/>
                <v-card-text class="text-truncate">
                    {{item.description}}
                    <br/>
                    <br/>
                    <v-divider/>
                    <br/>
                    <div class="subheading">Dostępność:
                        <v-icon fab small v-if="item.isAvailable" color="success">fas fa-check</v-icon>
                        <v-icon fab small v-if="!item.isAvailable" color="error">fas fa-times</v-icon>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-btn outline color="info" @click="$router.push('/item/'+item.itemId)">Szczegóły</v-btn>
                    <v-btn @click="reserveItem(item.itemId)" outline color="info">Zarezerwuj</v-btn>
                    <v-spacer/>
                    <v-btn v-if="hasAdminRights" @click="$router.push('/item/'+item.itemId+'/edit')" outline color="info">Modyfikuj</v-btn>
                    <v-btn v-if="hasAdminRights" @click="deleteItem(item.itemId)" outline color="error">Usuń</v-btn>
                </v-card-actions>
            </v-card>
            <br/>
        </template>
    </v-container>
</template>

<script>
    import axios from "axios";
    import DeleteButton from "@/components/DeleteButton";

    export default {
        name: "ItemListPage",
        components: {DeleteButton},
        data(){
            return{
                response: "",
                readyToRender: false,
                hasAdminRights: false,
                componentKey: 0,
                items: [{index: 0, itemId: null, name: '', description: '', signature: null, isAvailable: null}],
            }
        },
        methods:{
            async getItems(){
                try{
                    this.response = await axios.get('http://localhost:5000/items');
                    if(this.response.status === 200){
                        this.items = this.response.data;
                        localStorage.setItem('data', JSON.stringify(this.items));
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
            async deleteItem(Id){
                try{
                    //this.readyToRender=false;
                    this.response = await axios.delete('http://localhost:5000/items/'+ Id);
                    this.getItems();
                    //this.readyToRender=true;
                }
                catch (e) {
                    console.log('Blad usuwania');
                    this.getItems();
                }
            },
            async reserveItem(itemId){
                try{
                    const userId = JSON.parse(localStorage.getItem('user')).userId;
                    this.response = await axios.post('http://localhost:5000/reservations', {"ItemId" : itemId, "userId": userId});

                }
                catch (e) {

                }
            },
        },
        mounted(){
            this.getItems();
            const role = JSON.parse(localStorage.getItem('user')).role;
            if(role === 'ADMIN') this.hasAdminRights = true;
        }
    }


</script>

<style scoped>

</style>