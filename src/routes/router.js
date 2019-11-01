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
            path: '*',
            redirect: '/'
        }
    ],
})

export default router;