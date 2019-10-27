<template>
    <div class="card col box" style="width: 18rem;">
        <pokemon-box-paginer @update-index="updateIndex" :nbrImages="spritesLength"></pokemon-box-paginer>
        <div class="img-container border-bottom border-dark">
            <transition name="fade">
                <img :src="currentImage" class="card-img-top" />
            </transition>
        </div>
        <div class="card-body">
            <ul class="list card-text">
                <li>Name : {{ capitalizedName }}</li>
                <li>ID : {{ pokemon.id }}</li>
                <li>Height : {{ pokemon.height }}</li>
                <li>Base Experience : {{ pokemon.baseExperience}}</li>
                <li>Base Happiness : {{ pokemon.specs.base_happiness }}</li>
                <li>Color : {{ pokemon.specs.color.name }}</li>
                <li>Capture rate : {{ pokemon.specs.capture_rate }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import PokemonBoxPaginer from "./PokemonBoxPaginer.vue";
export default {
    props: {
        pokemon: { type: Object }
    },
    components: { PokemonBoxPaginer },

    data() {
        return {
            currentIndex: 0
        };
    },
    computed: {
        currentImage: function() {
            // return this.sprites[this.currentIndex];
            return this.sprites[this.currentIndex];
        },
        capitalizedName: function() {
            return (
                this.pokemon.name.charAt(0).toUpperCase() +
                this.pokemon.name.slice(1)
            );
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