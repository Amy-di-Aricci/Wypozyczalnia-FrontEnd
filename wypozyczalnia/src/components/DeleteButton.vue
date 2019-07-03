<template>
    <v-btn @click="deleteItem" outline color="error">Usuń</v-btn>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "DeleteButton",
        data(){
            return{
                response: ""
            }
        },
        methods:{
            async deleteItem(){
                try{
                    this.response = await axios.delete('http://localhost:5000/items/'+this.Id);
                    this.$router.replace('/');
                }
                catch (e) {
                    console.log('Blad usuwania');
                }
            }
        },
        props:{
            Id: Number
        }
    }
</script>

<style scoped>

</style>