import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

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
        const result = state.pokemons.filter(pokemon => pokemon.id === value);
        return result.length ? result[0] : undefined;
    },
    getPokemonByName: (state) => (value) => {
        const result = state.pokemons.filter(pokemon => pokemon.name === value);
        console.log(result[0].name);
        return result.length ? result[0] : undefined;
    },
    getMaxStatByName: (state) => (statName) => {
        const buffer = [];
        state.pokemons.forEach(pokemon => {
            buffer.push(...pokemon.specs.stats.filter(stat => stat.name == statName).map(stat => stat.baseStat));
        });


        return Math.max(...buffer);
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
    plugins: [createPersistedState({ storage: window.localStorages })],
});

export default store;