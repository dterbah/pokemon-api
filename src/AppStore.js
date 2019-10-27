import Vuex from 'vuex';

// correspond au data
const state = {
    pokemons: [],
    currentPage: 1,
}

const mutations = {
    ADD_POKEMON: (state, pokemon) => {
        state.pokemons.push(pokemon);
    },
    UPDATE_PAGE: (state, page) => {
        state.currentPage = page;
    }
}

const getters = {
    pokemons: (state) => state.pokemons,
    getPokemonsByRange: (state) => (begin, end) => {
        return state.pokemons.filter(pokemon => pokemon !== undefined && pokemon.id >= begin && pokemon.id <= end);
    },
    getPokemonById: (state) => (value) => {
        return state.pokemons.filter(pokemon => pokemon.id === value)[0];
    },
    getPokemonByName: (state) => (value) => {
        return state.pokemons.filter(pokemon => pokemon.name === value)[0];
    },
    getCurrentPage: (state) => state.currentPage,
}

const actions = {
    addPokemon: (store, pokemon) => {
        store.commit('ADD_POKEMON', pokemon);
    },
    updateStorePage: (store, page) => {
        store.commit('UPDATE_PAGE', page);
    }
}

const store =  new Vuex.Store({
    actions: actions,
    state: state,
    mutations: mutations,
    getters: getters,
    strict: true, // avoid modification into the store
});

export default store;