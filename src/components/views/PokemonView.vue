<template>
    <div>
        <app-header></app-header>
        <div id="pokemon-view">{{ pokemon.name }}</div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import AppHeader from './../AppHeader.vue';

    export default {
        name: 'PokemonView',
        components: { AppHeader },
        data () {
            return {
                pokemonId: parseInt(this.$route.params.pokemonId),
            }
        },
        computed: {
            ...Vuex.mapGetters(["getPokemonById"]),
            pokemon: function () {
                return this.getPokemonById(this.pokemonId);
            }
        },
    };

</script>