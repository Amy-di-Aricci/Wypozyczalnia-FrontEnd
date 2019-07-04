import Router from 'vue-router'
import LoginPage from "./views/LoginPage.vue"
import RentalPage from "./views/RentalPage.vue"
import RegisterPage from "@/views/RegisterPage";
import ItemListPage from "@/views/ItemListPage";
import ItemDetailPage from "@/views/ItemDetailPage"
import ItemEditPage from "@/views/ItemEditPage";
import ItemAddPage from "@/views/ItemAddPage";
import ItemReservationsPage from "@/views/ItemReservationsPage";
import UserReservationsPage from "@/views/UserReservationsPage";
import ManageReservationsPage from "@/views/ManageReservationsPage";
import NotFoundPage from "@/views/NotFoundPage";
import UserBorrowingsPage from "@/views/UserBorrowingsPage";
import ManageBorrowingsPage from "@/views/ManageBorrowingsPage";
import ManageUsersPage from "@/views/ManageUsersPage";
import ProfilePage from "@/views/ProfilePage";


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/404'
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
                    path: '/404',
                    name: 'notFoundPage',
                    component: NotFoundPage,
                },
                {
                    path: "/",
                    name: "itemListPage",
                    component: ItemListPage,
                },
                {
                  path: "/item/add",
                    name: "itemAddPage",
                    component: ItemAddPage,
                    meta: {admin:true},
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
                    path: "/reservations/all",
                    name: "manageReservationsPage",
                    component: ManageReservationsPage,
                    meta: {admin:true},
                },
                {
                    path: "/manage/item/:id",
                    name: "manageItemReservationsPage",
                    component: ItemReservationsPage,
                    meta: {admin:true},
                },
                {
                    path: "/reservations",
                    name: "userReservationsPage",
                    component: UserReservationsPage,
                    meta: {authenticated:true}
                },
                {
                    path: "/reservations/user/:id",
                    name: "manageUserReservationsPage",
                    component: UserReservationsPage,
                    meta: {admin:true}
                },
                {
                    path: "/borrowings",
                    name: "userBorrowingsPage",
                    component: UserBorrowingsPage,
                    meta: {authenticated:true}
                },
                {
                    path: "/borrowings/user/:id",
                    name: "manageUserBorrowingsPage",
                    component: UserBorrowingsPage,
                    meta: {admin:true}
                },
                {
                    path: "/borrowings/all",
                    name: "manageBorrowingsPage",
                    component: ManageBorrowingsPage,
                    meta: {admin:true},
                },
                {
                    path: "/users/all",
                    name: "manageUsersPage",
                    component: ManageUsersPage,
                    meta: {admin: true},
                },
                {
                    path: "/profile",
                    name: "userProfilePage",
                    component: ProfilePage,
                    meta: {authenticated:true},
                },
                {
                    path: "/user/:id",
                    name: "viewUserProfilePage",
                    component: ProfilePage,
                    meta: {admin:true}
                }
            ]
        }
    ],
})

const user = JSON.parse(localStorage.getItem('user'));
if (user){
    Router.authenticated=true;
    Router.guest=false;
    if(user.role === "ADMIN")
    {
        Router.admin = true;
    }
}
else {
    Router.authenticated=false;
    Router.guest=true;
}
