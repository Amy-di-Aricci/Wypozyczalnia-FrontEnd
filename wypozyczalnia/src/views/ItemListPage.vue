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
                    <v-layout row-wrap>
                        <div>
                            <v-btn outline color="info" class="margin5" @click="$router.push('/item/'+item.itemId)">Szczegóły</v-btn>
                            <v-btn @click="reserveItem(item.itemId)" v-if="!reserved(item.itemId)" class="margin5" outline color="success">Zarezerwuj</v-btn>
                            <v-btn disabled v-if="reserved(item.itemId)" class="margin5" outline>Zarezerwuj</v-btn>
                            <v-btn v-if="hasAdminRights" class="margin5" @click="$router.push('/manage/item/'+item.itemId)" outline color="info">Zarządzaj</v-btn>
                        </div>
                        <v-spacer/>
                        <div align="right">
                            <v-btn v-if="hasAdminRights" class="margin5" @click="$router.push('/item/'+item.itemId+'/edit')" outline color="info">Modyfikuj</v-btn>
                            <v-btn v-if="hasAdminRights" class="margin5" @click="deleteItem(item.itemId)" outline color="error">Usuń</v-btn>
                        </div>
                    </v-layout>
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
                error: false,
                deleting: false,
                userId: 0,
                items: [this.item],
                reservations: [{reservationId:0, reservationDateTime: "", item: this.item}],
                item: {index: 0, itemId: null, name: '', description: '', signature: null, isAvailable: null},
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
                const answer = window.confirm('Czy na pewno chcesz usunąć tę pozycję?');
                if (answer)
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
            async getUserReservations(){
                this.userId = JSON.parse(localStorage.getItem('user')).userId;
                try{
                    this.response= await axios.get('http://localhost:5000/reservations/users/'+this.userId);
                    this.reservations = this.response.data;
                    localStorage.setItem('reservations', JSON.stringify(this.reservations));
                    this.readyToRender = true;
                }
                catch (e) {

                }
            },
            async reserveItem(itemId){
                try{
                    const userId = JSON.parse(localStorage.getItem('user')).userId;
                    this.response = await axios.post('http://localhost:5000/reservations', {"ItemId" : itemId, "userId": userId});
                    if(this.response.status===200){
                        this.$router.push('/reservations/');
                    }
                    else{
                        window.alert("Błąd. Nie można dokonać rezerwacji");
                    }
                }
                catch (e) {
                    window.alert("Błąd. Nie można dokonać rezerwacji");
                }
            },
            reserved(itemId){
                let reserved = function(element){
                    return (element.item.itemId === itemId);
                }
                console.log(this.reservations.some(reserved));
                return this.reservations.some(reserved);
            }
        },
        mounted(){
            this.getItems();
            this.getUserReservations();
            const role = JSON.parse(localStorage.getItem('user')).role;
            if(role === 'ADMIN') this.hasAdminRights = true;
        }
    }


</script>

<style>
.margin5{
    margin: 5px !important;
}
</style>