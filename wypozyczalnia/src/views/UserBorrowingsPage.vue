<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Moje wypożyczenia</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="borrowings" v-for="(hire, index) in borrowings">
            <v-card v-if="hire.returnDateTime===null" :key="index">
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
                        <v-btn outline color="success" class="margin5" @click="endBorrowing(hire.hireId)">Oddaj</v-btn>
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
        name: "UserBorrowingsPage",
        data(){
            return{
                borrowings: [{hireId:0, hireDateTime: "", returnDateTime:"", item: this.item}],
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
                    this.response= await axios.get('/hires/users/'+this.userId);
                    this.borrowings = this.response.data;
                    localStorage.setItem('data', JSON.stringify(this.borrowings));
                    this.readyToRender = true;
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
        }
    }
</script>

<style scoped>
    .margin5{
        margin: 5px !important;
    }
</style>