<template>
    <div class="card col box">
        <pokemon-box-paginer @update-index="updateIndex" :nbrImages="spritesLength"></pokemon-box-paginer>
        <div class="img-container border-bottom border-dark">
            <transition name="fade">
                <img :src="currentImage" class="card-img-top w-75" />
            </transition>
        </div>
        <div class="card-body">
            <ul class="list card-text">
                <li>Name : {{ pokemon.name.firstLetterToUpper() }}</li>
                <li>ID : {{ pokemon.id }}</li>
                <li>Height : {{ pokemon.height }}</li>
                <li>Base Experience : {{ pokemon.baseExperience}}</li>
                <li>Base Happiness : {{ pokemon.specs.baseHappiness }}</li>
                <li>Color : {{ pokemon.specs.color }}</li>
                <li>Capture rate : {{ pokemon.specs.captureRate }}</li>
                <li>More details <router-link :to="{name: 'pokemon-view', params: { pokemonId: pokemon.id } }">
                    here
                </router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import PokemonBoxPaginer from "./paginer/PokemonBoxPaginer.vue";
export default {
    name: 'PokemonBox',
    props: {
        pokemon: Object
    },
    components: { PokemonBoxPaginer },

    data() {
        return {
            currentIndex: 2,
            url: '/pokemon/' + this.pokemon.id,
        };
    },
    computed: {
        currentImage: function() {
            // return this.sprites[this.currentIndex];
            return this.sprites[this.currentIndex];
        },
        sprites: function() {
            return this.pokemon.sprites;
		},
		spritesLength: function () {
			return this.sprites.length;
		}
    },
    methods: {
        updateIndex: function(value, event) {
			this.currentIndex = value;
			if(event) event.preventDefault();
        }
    },

    mounted() {
    }
};
</script>

<style>
.box {
    text-align: center;
    border: 1px solid black;
}

.box .list li {
    list-style-type: square;
    text-align: justify;
}
</style>