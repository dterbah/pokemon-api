<template>
    <div>
        <app-header></app-header>
        <div class="pokemon-view d-flex w-75 border">
            <pokemon-description class="pokemon-description" :pokemon="pokemon"></pokemon-description>
            <pokemon-stat class="pokemon-stats" :stats="pokemon.specs.stats" :name="pokemon.name"></pokemon-stat>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import AppHeader from './../AppHeader.vue';
    import PokemonDescription from './stats/PokemonDescription.vue';
    import PokemonStat from './stats/PokemonStat.vue';

    export default {
        name: 'PokemonView',
        components: { AppHeader, PokemonDescription, PokemonStat },
        data () {
            return {
                pokemonId: parseInt(this.$route.params.pokemonId),
            }
        },
        computed: {
            ...Vuex.mapGetters(["getPokemonById"]),
        },
        created () {
            this.pokemon = this.getPokemonById(this.pokemonId);
        }
    };

</script>

<style>

    .pokemon-view {
        margin-top: 2%;
        margin-left: auto;
        margin-right: auto;
    }

    .pokemon-description {
        width: 40%;
    }
    
    .pokemon-stats {
        width: 60%;
    }

</style>