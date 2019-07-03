<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Moje rezerwacje</v-toolbar-title>
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
                readyToRender: false,
            }
        },
        methods:{
            async getItems(){
                if(this.$route.params.id) this.userId= this.$route.params.id;
                else this.userId = JSON.parse(localStorage.getItem('user')).userId;
                try{
                    this.response= await axios.get('reservations/users/'+this.userId);
                    this.reservations = this.response.data;
                    localStorage.setItem('data', JSON.stringify(this.reservations));
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
                        this.getItems();
                        //this.readyToRender=true;
                    }
                    catch (e) {
                        console.log('Blad usuwania');
                        this.getItems();
                    }
            }
        },
        mounted(){
            this.getItems();
        }
    }
</script>

<style scoped>
    .margin5{
        margin: 5px !important;
    }
</style>