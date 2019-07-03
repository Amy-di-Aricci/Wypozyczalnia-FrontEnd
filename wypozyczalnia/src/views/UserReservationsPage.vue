<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title v-if="user !== null" class="display-1">Rezerwacje użytkownika {{user.firstName}} {{user.lastName}}</v-toolbar-title>
            <v-toolbar-title v-if="user === null" class="display-1">Moje rezerwacje</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="reservations" v-for="(reservation, index) in reservations">
            <v-card :key="index">
                <v-card-title class="title">{{reservation.item.name}}</v-card-title>
                <v-divider/>
                <v-card-text>
                <div class="subheading">Data rezerwacji: </div>
                    {{reservation.reservationDateTime | moment('DD-MM-YYYY')}}
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-layout row-wrap>
                        <v-btn outline color="info" class="margin5" @click="$router.push('/item/'+reservation.item.itemId)">Szczegóły</v-btn>
                        <v-spacer/>
                        <v-btn outline v-if="hasAdminRights&&reservation.item.isAvailable" color="success" class="margin5" @click="confirmReservation(reservation)">Wypożycz</v-btn>
                        <v-btn outline v-if="hasAdminRights&&!reservation.item.isAvailable" disabled class="margin5">Niedostępny</v-btn>
                        <v-btn outline color="error" class="margin5" @click="deleteReservation(reservation.reservationId)">Usuń</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <br/>
        </template>
    </v-container>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "UserReservationsPage",
        data(){
            return{
                reservations: [{reservationId:0, reservationDateTime: "", item: this.item}],
                item: {index: 0, itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                userId: 0,
                user: null,
                hasAdminRights: false,
                readyToRender: false,
            }
        },
        methods:{
            async getItems(){
                if(this.$route.params.id !== null) {
                    this.userId= this.$route.params.id;
                    this.getUser();
                }
                else {
                    this.userId = JSON.parse(localStorage.getItem('user')).userId;
                }
                try{
                    this.response= await axios.get('/reservations/users/'+this.userId);
                    this.reservations = this.response.data;
                    localStorage.setItem('data', JSON.stringify(this.reservations));
                    this.readyToRender = true;
                }
                catch (e) {

                }
            },
            async getUser(){
                try{
                    this.response = await axios.get('/users/'+this.userId);
                    this.user = this.response.data;
                }
                catch (e) {

                }
            },
            async deleteReservation(Id){
                const answer = window.confirm('Czy na pewno chcesz zrezygnować z rezerwacji?');
                if (answer)
                    try{
                        //this.readyToRender=false;
                        this.response = await axios.delete('/reservations/'+ Id);
                        this.getItems();
                        //this.readyToRender=true;
                    }
                    catch (e) {
                        this.getItems();
                    }
            },
            async confirmReservation(reservation) {
                try {
                    //this.readyToRender=false;
                    this.response = await axios.post('/hires', {
                        "ItemId": reservation.item.itemId,
                        "UserId": this.userId
                    });
                    this.getItems();
                    //this.readyToRender=true;
                } catch (e) {
                    this.getItems();
                }
            }
        },
        mounted(){
            this.getItems();
            const role = JSON.parse(localStorage.getItem('user')).role;
            if(role === 'ADMIN') this.hasAdminRights = true;
        }
    }
</script>

<style scoped>
    .margin5{
        margin: 5px !important;
    }
</style>