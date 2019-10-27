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
    getPokemonsByRange: (state) => (begin, end) => {
        return state.pokemons.filter(pokemon => pokemon !== undefined && pokemon.id >= begin && pokemon.id <= end);
    },
    getPokemonById: (state) => (value) => {
        return state.pokemons.filter(pokemon => pokemon.id === value)[0];
    },
    getPokemonByName: (state) => (value) => {
        return state.pokemons.filter(pokemon => pokemon.name === value)[0];
    },
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
    strict: true, // avoid modification into the store
});

export default store;