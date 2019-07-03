<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Rezerwacje</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="reservations" v-for="(reservation, index) in reservations">
            <v-card :key="index">
                <v-card-title class="title">{{reservation.item.name}}</v-card-title>
                <v-divider/>
                <v-card-text>
                    <div><p class="subheading"><b>Użytkownik:</b> {{reservation.user.firstName}} {{reservation.user.lastName}}</p></div>
                    <div><p class="subheading"><b>Data rezerwacji:</b> {{reservation.reservationDateTime | moment('DD-MM-YYYY')}}</p></div>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-layout row-wrap>
                        <v-btn outline color="info" class="margin5" @click="$router.push('/item/'+reservation.item.itemId)">Szczegóły</v-btn>
                        <v-btn outline color="info" class="margin5" @click="$router.push('/reservations/user/'+reservation.user.userId)">Rezerwacje użytkownika</v-btn>
                        <v-spacer/>
                        <v-btn outline v-if="reservation.item.isAvailable" color="success" class="margin5" @click="confirmReservation(reservation)">Wypożycz</v-btn>
                        <v-btn outline v-if="!reservation.item.isAvailable" disabled class="margin5">Niedostępny</v-btn>
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
        name: "ManageReservationsPage",
        data(){
            return{
                reservations: [{reservationId:0, reservationDateTime: "", item: this.item}],
                item: {index: 0, itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                readyToRender: false,
            }
        },
        methods: {
            async getReservations() {
                try {
                    this.response = await axios.get('/reservations');
                    this.reservations = this.response.data;
                    localStorage.setItem('data', JSON.stringify(this.reservations));
                    this.readyToRender = true;
                } catch (e) {

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
                    //this.readyToRender=true;
                } catch (e) {
                    this.getReservations();
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
        },
        mounted() {
            this.getReservations();
        }
    }
</script>

<style scoped>

</style>