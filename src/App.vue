<template>
  <div id="app">
	<app-header></app-header>
	<div class="container">
		<loading-spinner v-show="procedingAjaxRequest"></loading-spinner>
		<pokemon-box-container v-for="(container, index) in containers" :key="index" :pokemons="container"></pokemon-box-container>
	</div>
  </div>
</template>

<script>
// store imports
import pokeStore from './AppStore';
import Vuex from 'vuex';

// ajax imports
import axios from 'axios';
import URL from './api/url';

import Pokemon from './Pokemon'

// components imports
import PokemonBoxContainer from './components/PokemonBoxContainer.vue';
import LoadingSpinner from './components/LoadingSpinner.vue'
import AppHeader from './components/AppHeader.vue';

export default {
	store: pokeStore,
	components: { PokemonBoxContainer, LoadingSpinner, AppHeader },
	name: 'app',
	data () {
		return {
			MAX_POKEMON: 12,
			POKEMON_BY_ROW: 3,
			BOXES_BY_PAGE: 3,
			containers: [],
			procedingAjaxRequest: true,
		}
	},	
	computed: {
		...Vuex.mapGetters([ 'pokemons', 'pokedex' ]),
	},
	methods: {
		...Vuex.mapActions(['addPokemon', 'addPokedex'])
	},

	async beforeMount () {
		// load the pokemon of the first generation only
		let container = [];
		for(let i = 0; i < this.MAX_POKEMON; i++) {
			// create the request to retrieve the pokemon
			const url = URL.pokemonLink + (i + 1);
			const requestResult = await axios.get(url);
			// create the data for the future pokemon
			const data = {
				id: requestResult.data.id,
				name: requestResult.data.name,
				sprites: Object.values(requestResult.data.sprites).filter((image, index) => index % 2 == 0),
				baseExperience: requestResult.data.base_experience,
				moves: requestResult.data.moves,
				heigth: requestResult.data.height
			};

			const pokemon = new Pokemon(data);
			this.addPokemon(pokemon);
			if((i % this.POKEMON_BY_ROW) == 0 && i != 0) {
				this.containers.push(container);
				container = [];
			}
			container.push(pokemon);
		}

		this.containers.push(container);
		this.procedingAjaxRequest = false;
	}
}

</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	padding-bottom: 2%;
}
</style>
