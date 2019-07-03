<template>
    <v-container fluid fill>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="display-1">Wypożyczenia</v-toolbar-title>
        </v-toolbar>
        <template v-if="readyToRender" v-model="borrowings" v-for="(hire, index) in borrowings">
            <div v-if="hire.returnDateTime===null">
                <v-card :key="index">
                    <v-card-title class="title">{{hire.item.name}}</v-card-title>
                    <v-divider/>
                    <v-card-text>
                        <div><p class="subheading"><b>Użytkownik:</b> {{hire.user.firstName}} {{hire.user.lastName}}</p></div>
                        <div><p class="subheading"><b>Data wypożyczenia:</b> {{hire.hireDateTime | moment('DD-MM-YYYY')}}</p></div>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                        <v-layout row-wrap>
                            <v-btn outline color="info" class="margin5" @click="$router.push('/item/'+hire.item.itemId)">Szczegóły</v-btn>
                            <v-btn outline color="info" class="margin5" @click="$router.push('/hires/user/'+hire.user.userId)">Wypożyczenia użytkownika</v-btn>
                            <v-spacer/>
                            <v-btn outline color="success" class="margin5" @click="endBorrowing(hire.hireId)">Oddaj</v-btn>
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
        name: "ManageBorrowingsPage",
        data() {
            return {
                borrowings: [{hireId: 0, hireDateTime: "", returnDateTime: "", item: this.item}],
                response: "",
                readyToRender: false,
            }
        },
        methods: {
            async getBorrowings() {
                try {
                    this.response = await axios.get('/hires');
                    this.borrowings = this.response.data;
                    this.readyToRender = true;
                } catch (e) {

                }
            },
            async endBorrowing(Id){
                try{
                    this.response = await axios.get('/hires/' + Id +'/return');
                    this.getBorrowings();
                }
                catch (e) {

                }
            },
        },
        mounted() {
            this.getBorrowings();
        }
    }
</script>

<style scoped>

</style>