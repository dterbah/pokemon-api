<template>
    <div class="row">
        <pokemon-box class="w-25" v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon"></pokemon-box>
    </div>
</template>

<script>
    import PokemonBox from './PokemonBox.vue';
    
    export default {
        components: { PokemonBox },
        props: {
            pokemons: Array
        },

        mounted() {
        }
    }
</script>