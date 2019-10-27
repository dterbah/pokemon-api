<template>
    <div>
        <router-view></router-view>
        <div class="container">
            <loading-spinner v-show="procedingAjaxRequest"></loading-spinner>
            <pokemon-box-container
                v-for="(container, index) in displayedPokemon"
                :key="index"
                :pokemons="container"
                v-show="!procedingAjaxRequest"
            ></pokemon-box-container>
			<app-paginer :nbrPages="nbrPages" @update-page="updatePage"></app-paginer>
        </div>
    </div>
</template>

<script>
// store imports
import pokeStore from "./../AppStore";
import Vuex from "vuex";

// ajax imports
import axios from "axios";
import URL from "./../api/url";

import Pokemon from "./../Pokemon";

// components imports
import PokemonBoxContainer from "./PokemonBoxContainer.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import AppPaginer from './AppPaginer.vue';

export default {
    store: pokeStore,
    components: { PokemonBoxContainer, LoadingSpinner, AppPaginer },
    name: "MainView",
    data() {
        return {
            MAX_POKEMON: 151,
			POKEMON_BY_ROW: 3,
			POKEMONS_BY_PAGE: 6,
            BOXES_BY_PAGE: 3,
			procedingAjaxRequest: false,
			currentPage: 1,
        };
    },
    computed: {
		...Vuex.mapGetters(["pokemons", "getPokemonsByRange"]),
		nbrPages: function () {
			var nbr = this.MAX_POKEMON / this.POKEMONS_BY_PAGE;
			if((this.MAX_POKEMON % this.POKEMONS_BY_PAGE) != 0) {
				nbr++;
			}

			return Math.floor(nbr);
        },
        
        displayedPokemon: function () {
            const buffer = [];
            let container = [];
            const from = ((this.currentPage - 1) * this.POKEMONS_BY_PAGE) + 1;
            const to = this.currentPage * this.POKEMONS_BY_PAGE;
            const currentPokemons = this.getPokemonsByRange(from, to);

            if(currentPokemons) {
                for(let i = 0; i < currentPokemons.length; i++) {
					const pokemon = currentPokemons[i];
					if (i % this.POKEMON_BY_ROW == 0 && i != 0) {
                        buffer.push(container);
                        container = [];
                    }
                    container.push(pokemon);
				}

				buffer.push(container);
            }

            return buffer;
        }
    },
    methods: {
        ...Vuex.mapActions(["addPokemon"]),
        loadPokemons: async function(begin, end) {
            // we load dynamically the pokemons
            const currentPokemons = this.getPokemonsByRange(begin, end);
            if(!currentPokemons.length) {
                this.procedingAjaxRequest = true;
                for (let i = begin; i <= end; i++) {
                    // create the request to retrieve the pokemon
                    let url = URL.pokemonLink + i;
                    const requestResult = await axios.get(url);
                    // create the request to retrieve the spec of the pokemon
                    url = URL.pokemonSpecLink + i;
                    const specRequestResult = await axios.get(url);
                    let pokemonSpecs = specRequestResult.data;
                    // we take only the spec in english
                    pokemonSpecs.flavor_text_entries = pokemonSpecs.flavor_text_entries.filter(spec => spec.language.name == "en"); 

                    // load the evolutions of the pokemon
                    url = URL.pokemonEvolutionChainLink + i;
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
                        moves: requestResult.data.moves,
                        height: requestResult.data.height,
                        specs: pokemonSpecs,
                        evolutions: evolutions,
                    };

                    const pokemon = new Pokemon(data);
                    this.addPokemon(pokemon);
                }

                this.procedingAjaxRequest = false;
			}
		}, 
		updatePage: function (value, event) {
            this.currentPage = value;
            if(event) event.preventDefault();
            const from = ((this.currentPage - 1) * this.POKEMONS_BY_PAGE) + 1; 
            const to = this.currentPage * this.POKEMONS_BY_PAGE;
            this.loadPokemons(from, to > this.MAX_POKEMON ? this.MAX_POKEMON : to);
        },
    },

    async beforeMount() {
        // load the pokemon of the first generation only
        this.loadPokemons(1, this.POKEMONS_BY_PAGE);
    }
};
</script>
