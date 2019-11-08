import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

// correspond au data
const state = {
    pokemons: [],
    berries: [],
    items: [],
}

const mutations = {
    ADD_POKEMON: (state, pokemon) => {
        state.pokemons.push(pokemon);
    },
    ADD_BERRY: (state, berry) => {
        state.berries.push(berry);
    },
    ADD_ITEM: (state, item) => state.items.push(item),
}

const getters = {
    // pokemons
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
        return result.length ? result[0] : undefined;
    },
    getMaxStatByName: (state) => (statName) => {
        const buffer = [];
        state.pokemons.forEach(pokemon => {
            buffer.push(...pokemon.specs.stats.filter(stat => stat.name == statName).map(stat => stat.baseStat));
        });

        return Math.max(...buffer);
    },

    // berries
    berries: (state) => state.berries,
    getBerryById: (state) => (id) => {
        const result = state.berries.filter(berry => berry.id === id);
        return result.length ? result[0] : undefined;
    },
    getBerriesByRange: (state) => (begin, end) => state.berries.filter(berry => berry !== undefined && berry.id >= begin && berry.id <= end),

    // items
    items: (state) => state.items,
    getItemById: (state) => (id) => {
        const result = state.items.filter(item => item.id === id);
        return result.length ? result[0] : undefined;
    },
    getItemsByRange: (state) => (begin, end) => state.items.filter(item => {
        return item !== undefined && item.id >= begin && item.id <= end;
    })
}

const actions = {
    addPokemon: (store, pokemon) => {
        store.commit('ADD_POKEMON', pokemon);
    },
    addBerry: (store, berry) => {
        store.commit('ADD_BERRY', berry);
    },
    addItem: (store, item) => {
        store.commit('ADD_ITEM', item);
    }
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