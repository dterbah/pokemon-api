import VueRouter from 'vue-router';

import storeMiddleware from './../middleware/store-middleware.js';

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: require('./../components/views/MainView.vue').default,
            name: 'main-view',
        },
        {
            path: '/pokemon/:pokemonId(\\d+)',
            component: require('./../components/views/PokemonView.vue').default,
            name: 'pokemon-view',
            beforeEnter: storeMiddleware            
        },
        {
            path: '/pokemon/compare',
            component: require('./../components/views/compare/ComparePokemonView.vue').default,
            name: 'pokemon-compare'
        },
        {
            path: '/berries/',
            component: require('./../components/views/BerriesView.vue').default,
            name: "berries-view"
        },
        {
            path: '/berries/:berryId(\\d+)',
            component: require('./../components/views/berries/BerryView.vue').default,
            name: 'berry-view'
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
})

export default router;