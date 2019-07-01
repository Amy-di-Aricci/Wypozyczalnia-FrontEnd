import Router from 'vue-router'
import LoginPage from "./views/LoginPage.vue"
import RentalPage from "./views/RentalPage.vue"
import RegisterPage from "@/views/RegisterPage";
import ItemListPage from "@/views/ItemListPage";
import ItemDetailPage from "@/views/ItemDetailPage"
import ItemEditPage from "@/views/ItemEditPage";

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
                    path: "/",
                    name: "itemListPage",
                    component: ItemListPage,
                },
                {
                    path: "/item/:id",
                    name: "itemDetailPage",
                    component: ItemDetailPage,
                },
                {
                    path: "/item/:id/edit",
                    name: "itemEditPage",
                    component: ItemEditPage,
                    meta: {admin:true}
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

if (JSON.parse(localStorage.getItem('user').role === "ADMIN"))
{
    Router.admin=true;
}


