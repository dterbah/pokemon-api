<template>
    <div>
        <router-view></router-view>
        <app-header></app-header>
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
import Vuex from "vuex";

// ajax imports
import pokemonLoader from './../../api/load-pokemon.js';

// components imports
import PokemonBoxContainer from "./../PokemonBoxContainer.vue";
import LoadingSpinner from './../util/LoadingSpinner.vue';
import AppPaginer from './../paginer/AppPaginer.vue';
import AppHeader from './../AppHeader.vue';

export default {
    components: { PokemonBoxContainer, LoadingSpinner, AppPaginer, AppHeader },
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
            this.procedingAjaxRequest = true;
            for (let i = begin; i <= end; i++) {
                const pokemon = await pokemonLoader(i);
                if(pokemon) {
                    this.addPokemon(pokemon);
                }
            }

            this.procedingAjaxRequest = false;
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
