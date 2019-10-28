import axios from 'axios';

import Pokemon from './../data/Pokemon.js'
import pokeStore from '../data/AppStore.js';
import URL from './url.js'

// function that load a pokemon by its id
const pokemonLoader = async (pokemonId) => {
    let result = pokeStore.getters.getPokemonById(pokemonId);
    if(result) return undefined;

    let url = URL.pokemonLink + pokemonId;
    const requestResult = await axios.get(url);
    // create the request to retrieve the spec of the pokemon
    url = URL.pokemonSpecLink + pokemonId;
    const specRequestResult = await axios.get(url);
    let pokemonSpecs = specRequestResult.data;
    // we take only the spec in english
    pokemonSpecs.flavor_text_entries = pokemonSpecs.flavor_text_entries.filter(spec => spec.language.name == "en");
    // load the evolutions of the pokemon
    url = URL.pokemonEvolutionChainLink + pokemonId;
    const evolutionsRequestResult = await axios.get(url);
    const evolutions = evolutionsRequestResult.data.chain;

    // create the data for the future pokemon
    const data = {
        id: requestResult.data.id,
        name: requestResult.data.name,
        sprites: Object.values(
            requestResult.data.sprites
        ).filter((image, index) => index % 2 == 0),
        baseExperience: requestResult.data.base_experience,
        height: requestResult.data.height,
        specs: {
            color: pokemonSpecs.color.name,
            pokedexResumes: pokemonSpecs.flavor_text_entries.map(entry => {
                return {
                    text: entry.flavor_text,
                    version: entry.version.name
                };
            }),
            habitat: pokemonSpecs.habitat.name
        },
        evolutions: evolutions,
    };

    const pokemon = new Pokemon(data);
    return pokemon;
}

export default pokemonLoader;