import pokeStore from './../data/AppStore.js'
import pokemonLoader from './../api/load-pokemon.js';

export default async function checkStore(to, from, next) {
    const pokemonId = parseInt(to.params.pokemonId);
    let pokemon = pokeStore.getters.getPokemonById(pokemonId);
    if(!pokemon) {
        pokemon = await pokemonLoader(pokemonId);
        pokeStore.commit('ADD_POKEMON', pokemon);
    }

    return next();
}