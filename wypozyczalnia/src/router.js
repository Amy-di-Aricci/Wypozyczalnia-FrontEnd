import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from "./views/LoginPage.vue"
import RentalPage from "./views/RentalPage.vue"

Vue.use(Router)

const token = localStorage.getItem('token');
const ifNotAuthenticated = (to, from, next) => {
    if (token == null) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (token != null) {
        next()
        return
    }
    next('/login')
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "loginPage"
            }
        },
        {
            path: "/login",
            name: "loginPage",
            component: LoginPage,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: "/",
            name: "rentalPage",
            component: RentalPage,
            beforeEnter: ifAuthenticated
        }
    ]
})