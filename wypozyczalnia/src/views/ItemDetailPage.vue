<template>
    <v-container>
        <div class="display-1">{{id}}</div>
    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ItemDetailPage",
        data(){
            return{
                id: 0,
                item: {itemId: null, name: '', description: '', signature: null, isAvailable: null},
                response: "",
                readyToRender: false,
            }
        },
        methods: {
            async getItem()
            {
                this.id = this.$route.params.id;
                try{
                    this.response = await axios.get('http://localhost:5000/items/'+this.id);
                    if(this.response.status === 200){
                        this.item = this.response.data;
                        localStorage.setItem('data', this.item);
                        console.log('Pobrano item');
                        this.readyToRender = true
                    }
                    console.log(this.response.status)
                }
                catch (e) {
                    console.log('Blad pobierania itemu');
                    console.log(e)
                }
            }
        },
        mounted(){
            this.getItem();
        }
    }
</script>

<style scoped>

</style>