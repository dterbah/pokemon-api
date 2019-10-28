import VueRouter from 'vue-router';

import storeMiddleware from './../middleware/store-middleware.js';

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: require('./../components/MainView.vue').default,
            name: 'main-view',
        },
        {
            path: '/pokemon/:pokemonId(\\d+)',
            component: require('./../components/PokemonView.vue').default,
            name: 'pokemon-view',
            beforeEnter: storeMiddleware            
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
})

export default router;