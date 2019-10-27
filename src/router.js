import VueRouter from 'vue-router';

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: require('./components/MainView.vue').default,
            name: 'main-view',
            children: [{
                path: '',
                component: require('./components/AppHeader.vue').default
            }]
        },
        {
            path: '/pokemon/:pokemonId(\\d+)',
            component: require('./components/PokemonView.vue').default,
            name: 'pokemon-view',
            children: [{
                path: '*',
                component: require('./components/AppHeader.vue').default
            }]
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
})

export default router;