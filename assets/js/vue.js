

const Home = {
    template: '#home',
    name: 'Home',
}

const UserSettings = {
    template: '<h1>User Settings</h1>',
    name: 'projet'
}
const WishList = {
    template: '<h1>musique</h1>',
    name: 'musique'
}
const ShoppingCart = {
    template: '<h1>User</h1>',
    name: 'User'
}

    //Routeur
    const router = new VueRouter({
        routes:[
            { path: '/', component: Home, name : 'Home' },
            { path: '/projet', component: UserSettings, name : 'projet' },
            { path: '/musique', component: WishList, name : 'musique' },
            { path: '/User', component: ShoppingCart, name : 'User' },
        ]
    })

const vue = new Vue ({
    router
}).$mount('#app');