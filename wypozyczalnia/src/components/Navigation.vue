<template>
    <nav>
    <v-toolbar
            dark
            scroll-off-screen
            app
            clipped-left
            id="top-toolbar">
        <v-toolbar-side-icon @click="drawer = !drawer"/>
        <v-toolbar-title>System wypożyczeń</v-toolbar-title>
        <v-spacer></v-spacer>
        <AuthenticatedUserMenu v-bind:name="user.firstName +' '+user.lastName"/>
    </v-toolbar>
    <v-navigation-drawer
            dark
            absolute
            width="260"
            clipped
            app
            v-model="drawer"
    >
        <v-divider></v-divider>

        <v-list class="pt-0">
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    v-if="role===item.role || item.role===''"
                    @click="$router.replace(item.route)"
            >
                <v-list-tile-action>
                    <v-icon small>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-navigation-drawer>
    </nav>
</template>

<script>
    import AuthenticatedUserMenu from "@/components/AuthenticatedUserMenu";
    export default {
        components: {AuthenticatedUserMenu},
        data() {
            return {
                items: [
                    {title: 'Zarządzaj katalogiem', icon: 'fas fa-list', route:'/', role:'ADMIN'},
                    {title: 'Zarządzaj rezerwacjami', icon: 'far fa-star', route:'/reservations/all', role:'ADMIN'},
                    {title: 'Zarządzaj wypożyczeniami', icon: 'fas fa-star', route:'/borrowings/all', role:'ADMIN'},
                    {title: 'Zarządzaj użytkownikami', icon: 'fas fa-user', route:'/users/all', role:'ADMIN'},

                    {title: 'Katalog przedmiotów', icon: 'fas fa-list', route:'/', role:'USER'},
                    {title: 'Moje rezerwacje', icon: 'far fa-star', route:'/reservations', role:''},
                    {title: 'Moje wypożyczenia', icon: 'fas fa-star', route:'/borrowings', role:''},
                    {title: 'Mój profil', icon: 'far fa-user', route:'/profile', role:''},
                ],
                right: null,
                drawer: true,
                role: '',
                user: {
                    userId: 0,
                    firstName: "",
                    lastName: "",
                    username: "",
                    role: ""
                },
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem('user'));
            this.role = this.user.role;
        }
    }

</script>


<style scoped>

</style>