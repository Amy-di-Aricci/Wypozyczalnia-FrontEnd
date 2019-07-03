<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Wypożyczenia przedmiotu {{item.name}}</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="borrowings" v-for="(hire, index) in borrowings">
            <v-card v-if="hire.returnDateTime===null" :key="index">
                <v-card-title class="title">{{hire.user.firstName}} {{hire.user.lastName}}</v-card-title>
                <v-divider/>
                <v-card-text>
                    <div><p class="subheading"><b>Data wypożyczenia:</b> {{hire.hireDateTime | moment('DD-MM-YYYY')}}</p></div>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-layout row-wrap>
                        <v-btn outline color="info" class="margin5" @click="$router.push('/borrowings/user/'+hire.user.userId)">Wypożyczenia użytkownika</v-btn>
                        <v-spacer/>
                        <v-btn outline color="success" class="margin5" @click="endBorrowing(hire.hireId)">Oddaj</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <br/>
        </template>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Rezerwacje</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="reservations" v-for="(hire, index2) in reservations">
            <v-card :key="index2">
                <v-card-title class="title">{{hire.user.firstName}} {{hire.user.lastName}}</v-card-title>
                <v-divider/>
                <v-card-text>
                    <div><p class="subheading"><b>Data rezerwacji:</b> {{hire.reservationDateTime | moment('DD-MM-YYYY')}}</p></div>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-layout row-wrap>
                        <v-btn outline color="info" class="margin5" @click="$router.push('/reservations/user/'+hire.user.userId)">Rezerwacje użytkownika</v-btn>
                        <v-spacer/>
                        <v-btn outline v-if="hire.item.isAvailable" color="success" class="margin5" @click="confirmReservation(hire)">Wypożycz</v-btn>
                        <v-btn outline v-if="!hire.item.isAvailable" disabled class="margin5">Niedostępny</v-btn>
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
        name: "ItemReservationsPage",
        data(){
            return{
                borrowings: [{hireId:0, hireDateTime: "", returnDateTime:"", item: this.item}],
                reservations: [{reservationId:0, reservationDateTime: "", item: this.item}],
                item: {index: 0, itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                itemId: 0,
                readyToRender: false,
            }
        },
        methods:{
            async getBorrowings(){
                if(this.$route.params.id) {
                    this.itemId= this.$route.params.id;
                    this.getItem();
                }
                try{
                    this.response= await axios.get('/hires/items/'+this.itemId);
                    this.borrowings = this.response.data;
                    //localStorage.setItem('data', JSON.stringify(this.borrowings));
                    this.readyToRender = true;
                }
                catch (e) {

                }
            },
            async getItem(){
                try{
                    this.response = await axios.get('/items/'+this.itemId);
                    this.item = this.response.data;
                }
                catch (e) {

                }
            },
            async endBorrowing(Id){
                try{
                    this.response = await axios.get('/hires/' + Id +'/return');
                    this.getBorrowings();
                    this.getReservations();
                }
                catch (e) {
                    this.getBorrowings();
                    this.getReservations();
                }
            },
            async getReservations(){
                try{
                    this.response= await axios.get('/reservations/items/'+this.itemId);
                    this.reservations = this.response.data;
                    //localStorage.setItem('data', JSON.stringify(this.reservations));
                    this.readyToRender = true;
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
                        this.getReservations();
                        //this.readyToRender=true;
                    }
                    catch (e) {
                        this.getReservations();
                    }
            },
            async confirmReservation(reservation) {
                try {
                    //this.readyToRender=false;
                    this.response = await axios.post('/hires', {
                        "ItemId": reservation.item.itemId,
                        "UserId": reservation.user.userId
                    });
                    this.getReservations();
                    this.getBorrowings();
                    //this.readyToRender=true;
                } catch (e) {
                    this.getReservations();
                    this.getBorrowings();
                }
            }
        },
        mounted(){
            this.getBorrowings();
            this.getReservations();
        }
    }
</script>

<style scoped>

</style>