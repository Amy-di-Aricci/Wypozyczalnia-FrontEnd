<template>
    <v-container v-if="readyToRender">
        <v-toolbar class="transparent" flat>
            <v-toolbar-title class="display-1">
                {{item.name}}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon v-if="hasAdminRights" @click="$router.replace('/item/'+item.itemId+'/edit')" color="info" fab><v-icon>edit</v-icon></v-btn>
        </v-toolbar>
        <p>
            {{item.description}}
        </p>
        <br/>
        <p v-if="item.signature!==''" class="title">
            Identyfikator: {{item.signature}}
        </p>
        <v-divider/>
        <v-layout row-wrap>
            <div align="left">
                <v-btn @click="reserveItem(item.itemId)" v-if="!reserved(item.itemId)" class="margin5" outline color="success">Zarezerwuj</v-btn>
                <v-btn disabled v-if="reserved(item.itemId)" class="margin5" outline>Zarezerwuj</v-btn>
                <v-btn v-if="hasAdminRights&&!item.isAvailable" outline disabled>Niedostępny</v-btn>
                <v-btn v-if="hasAdminRights&&item.isAvailable" @click="borrowItemDialog" outline color="info">Wypożycz</v-btn>
                <v-btn v-if="hasAdminRights" class="margin5" @click="$router.push('/manage/item/'+item.itemId)" outline color="info">Zarządzaj</v-btn>
            </div>
            <v-spacer/>
            <div align="right">
                <v-btn v-if="hasAdminRights" class="margin5" @click="deleteItem(item.itemId)" outline color="error">Usuń</v-btn>
            </div>
        </v-layout>
        <v-dialog v-model="borrowDialog" width="500">
            <v-card>
                <v-card-title>Wybierz użytkownika</v-card-title>
                <v-card-text>
                    <v-select label="Użytkownik" v-model="selectedUser" :items="userlist" item-text="name" item-value="value"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="borrowItem" flat color="success">Wypożycz</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                hasAdminRights: false,
                reservations: [{reservationId:0, reservationDateTime: "", item: this.item}],
                borrowDialog: false,
                users: null,
                userlist: null,
                selectedUser: null,
                confirmed: false,
            }
        },
        methods: {
            async getItem()
            {
                this.id = this.$route.params.id;
                try{
                    this.response = await axios.get('/items/'+this.id);
                    if(this.response.status === 200){
                        this.item = this.response.data;
                        this.readyToRender = true
                    }
                }
                catch (e){}
            },
            async borrowItemDialog(){
                await this.getUsers();
                this.userlist = this.users.map(function (user) {
                    return {"name":user.firstName+' '+user.lastName, "value":user.userId};
                });
                this.borrowDialog=true;
            },
            async borrowItem(){
                try{
                    this.response = await axios.post('/hires', {"ItemId":this.item.itemId, "UserId": this.selectedUser});
                    if(this.response.status === 200)
                        this.$router.push('/manage/item/'+this.item.itemId);
                }
                catch (e) {

                }
            },
            async getUsers(){
                try{
                    this.response = await axios.get('/users');
                    if(this.response.status === 200){
                        this.users = this.response.data;
                    }
                }
                catch (e) {

                }
            }
            ,
            async deleteItem(Id){
                const answer = window.confirm('Czy na pewno chcesz usunąć tę pozycję?');
                if (answer)
                    try{
                        //this.readyToRender=false;
                        this.response = await axios.delete('/items/'+ Id);
                        this.getItems();
                        //this.readyToRender=true;
                    }
                    catch (e) {
                        this.getItems();
                    }
            },
            async getUserReservations(){
                this.userId = JSON.parse(localStorage.getItem('user')).userId;
                try{
                    this.response= await axios.get('/reservations/users/'+this.userId);
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
                    this.response = await axios.post('/reservations', {"ItemId" : itemId, "userId": userId});
                    if(this.response.status===200){
                        this.$router.push('/reservations');
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
                    if((element.item.itemId !== null) && (itemId!==null))
                        return (element.item.itemId === itemId);
                };
                return this.reservations.some(reserved);
            }
        },
        mounted(){
            this.getItem();
            this.getUserReservations();
            const user = JSON.parse(localStorage.getItem('user'));
            if(user.role === "ADMIN"){
                this.hasAdminRights=true;
            }
        }
    }
</script>

<style scoped>
p{
    margin : 20px;
}
</style>