<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title v-if="user !== null" class="display-1">Wypożyczenia użytkownika {{user.firstName}} {{user.lastName}}</v-toolbar-title>
            <v-toolbar-title v-if="user === null" class="display-1">Moje wypożyczenia</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="borrowings" v-for="(hire, index) in borrowings">
            <div v-if="hire.returnDateTime===null">
                <v-card :key="index">
                    <v-card-title class="title">{{hire.item.name}}</v-card-title>
                    <v-divider/>
                    <v-card-text>
                        <div class="subheading">Data wypożyczenia: </div>
                        {{hire.hireDateTime | moment('DD-MM-YYYY')}}
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                        <v-layout row-wrap>
                            <v-btn outline color="info" class="margin5" @click="$router.push('/item/'+hire.item.itemId)">Szczegóły</v-btn>
                            <v-spacer/>
                            <v-btn outline v-if="hasAdminRights" color="success" class="margin5" @click="endBorrowing(hire.hireId)">Oddaj</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
                <br/>
            </div>
        </template>
    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "UserBorrowingsPage",
        data(){
            return{
                borrowings: [{hireId:0, hireDateTime: "", returnDateTime:"", item: this.item}],
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
                if(this.$route.params.id != null) {
                    this.userId= this.$route.params.id;
                    this.getUser();
                }
                else {
                    this.userId = JSON.parse(localStorage.getItem('user')).userId;
                }
                try{
                    this.response= await axios.get('/hires/users/'+this.userId);
                    this.borrowings = this.response.data;
                    localStorage.setItem('data', JSON.stringify(this.borrowings));
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
            async endBorrowing(Id){
                try{
                    this.response = await axios.get('/hires/' + Id +'/return');
                    this.getItems();
                }
                catch (e) {

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