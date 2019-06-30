import Router from 'vue-router'
import LoginPage from "./views/LoginPage.vue"
import RentalPage from "./views/RentalPage.vue"

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/login",
            name: "loginPage",
            component: LoginPage,
        },
        {
            path: "/",
            name: "rentalPage",
            component: RentalPage,
        }
    ],
})