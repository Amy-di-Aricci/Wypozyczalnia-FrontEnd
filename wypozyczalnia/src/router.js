import Router from 'vue-router'
import LoginPage from "./views/LoginPage.vue"
import RentalPage from "./views/RentalPage.vue"
import RegisterPage from "@/views/RegisterPage";
import ItemListPage from "@/views/ItemListPage";

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/login',
        },
        {
            path: "/login",
            name: "loginPage",
            component: LoginPage,
            meta:{
                guest: true,
            }
        },
        {
            path: "/register",
            name: "registerPage",
            component: RegisterPage,
            meta:{
                guest: true,
            }
        },
        {
            path: "/",
            name: "rentalPage",
            component: RentalPage,
            meta:{
                authenticated: true,
            },
            children:[
                {
                    path: "",
                    name: "homePage"
                },
                {
                    path: "/items",
                    name: "itemListPage",
                    component: ItemListPage,
                },
                {
                    path: "/reservations"
                },
                {
                    path: "/borrowings"
                },
                {
                    path: "/profile"
                }
            ]
        }
    ],
})
if (localStorage.getItem('accessToken')){
    Router.authenticated=true;
    Router.guest=false;
}
else {
    Router.authenticated=false;
    Router.guest=true;
}



