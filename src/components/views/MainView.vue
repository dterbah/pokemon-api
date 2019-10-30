<template>
    <div>
        <router-view></router-view>
        <app-header></app-header>
        <div class="generations-selection">
            <select class="form-control form-control-lg w-25 container" @change="updateGeneration($event)">
                <option 
                    v-for="(generation, index) in allGenerations"
                    :key="index"
                    :value="index + 1"
                    >
                    Generation {{ index + 1 }}
                </option>
            </select>
        </div>
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

import {generations} from './../../data/Generations.js';

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
            currentGenerationIndex: 1,
            allGenerations: generations,
        };
    },
    computed: {
		...Vuex.mapGetters(["pokemons", "getPokemonsByRange"]),
		nbrPages: function () {
            const totalPokemon = this.currentGeneration.to - this.currentGeneration.from;
			var nbr = totalPokemon / this.POKEMONS_BY_PAGE;
			if((this.MAX_POKEMON % this.POKEMONS_BY_PAGE) != 0) {
				nbr++;
			}

			return Math.floor(nbr);
        },
        displayedPokemon: function () {
            const buffer = [];
            let container = [];
            const from = this.currentGeneration.from + ((this.currentPage - 1) * this.POKEMONS_BY_PAGE);
            let to = this.currentGeneration.from + (this.currentPage * this.POKEMONS_BY_PAGE) - 1;
            to = to > this.currentGeneration.to ? this.currentGeneration.to : to;
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
        },
        currentGeneration: function () {
            return this.allGenerations[this.currentGenerationIndex - 1];
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
            const from = this.currentGeneration.from + ((this.currentPage - 1) * this.POKEMONS_BY_PAGE);
            const to = this.currentGeneration.from + (this.currentPage * this.POKEMONS_BY_PAGE) - 1;
            this.loadPokemons(from, to > this.currentGeneration.to ? this.currentGeneration.to : to);
        },
        updateGeneration: function(event) {
            const select = event.target;
            const currentOption = select[select.selectedIndex];
            const $currentGenerationIndex = parseInt(currentOption.value);
            this.currentGenerationIndex = $currentGenerationIndex;
            this.currentPage = 1;
            this.loadPokemons(this.currentGeneration.from, this.currentGeneration.from + this.POKEMONS_BY_PAGE);
        }
    },

    async beforeMount() {
        // load the pokemon of the first generation only
        this.loadPokemons(this.currentGeneration.from, this.currentGeneration.from + this.POKEMONS_BY_PAGE);
    }
};
</script>

<style>
    .generations-selection {
        padding-bottom: 1%;
        margin-top: 2%;
    }

</style>