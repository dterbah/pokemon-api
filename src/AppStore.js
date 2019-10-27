import Vuex from 'vuex';

// correspond au data
const state = {
    pokemons: [],
}

const mutations = {
    ADD_POKEMON: (state, pokemon) => {
        state.pokemons.push(pokemon);
    },
}

const getters = {
    pokemons: (state) => state.pokemons,
    pokedex: (state) => state.pokedex,
}

const actions = {
    addPokemon: (store, pokemon) => {
        store.commit('ADD_POKEMON', pokemon);
    },
}

const store =  new Vuex.Store({
    actions: actions,
    state: state,
    mutations: mutations,
    getters: getters,
    strict: true, // avoid modification of the store
});

global.store = store;

export default store;