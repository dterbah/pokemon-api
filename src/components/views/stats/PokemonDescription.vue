<template>
    <div class="border-right pokemon-box">
        <div class="image-container border-bottom d-flex justify-content-center">
            <img class="card-img-center" :src="currentPokemon.sprites[2]"/>
        </div>
        <div class="description">
            <pokemon-stat-table :stats="pokemon.specs.stats"></pokemon-stat-table>
        </div>
    </div>
</template>


<script>
    import PokemonStatTable from './PokemonStatTable.vue';

    export default {
        props: {
            pokemon: Object,
        },
        components: { PokemonStatTable },
        data () {
            return {
                currentPokemon: this.$props.pokemon,
            }
        }
    }

</script>

<style>

    img {
        width: 50%;
        display: block;
        height: auto;
    }

</style>