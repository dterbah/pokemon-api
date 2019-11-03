<template>
    <div class="text-center" v-if="pokemon">
        <!-- loop on the first deep -->
        Name of the pokemon : {{ currentName.firstLetterToUpper() }}<br>
        More details 
             <a :href="$router.resolve({name: 'pokemon-view', params: { pokemonId: pokemon.id } }).href">
                here
             </a><br/>
        <img :src="currentSprite" class="pokemon-img"/>
        <div
            v-for="(evo, index) in evolutions"
            :key="index"
        >
            Evolves at level {{ evo.details.min_level }}<br/>
            <span>&#8595;</span>
            <pokemon-node :details="evo"></pokemon-node>
        </div>
    </div>
</template>

<script>

    import Vuex from 'vuex';
    import PokemonNode from './PokemonNode.vue';
    import pokemonLoader from './../../../api/load-pokemon.js';

    export default {
        name: 'PokemonNode',
        components: {
            PokemonNode,
        },
        props: {
            details: [ Object, Array ]
        },
        data () {
            return {
                currentDetails: this.$props.details,
                currentName: this.$props.details.species.name,
                spriteIndex: 2
            }
        },
        computed: {
            ...Vuex.mapGetters(["getPokemonByName"]),
            evolutions: function () {
                return this.currentDetails.evolves_to.map(evo => {
                    return {
                        details: evo.evolution_details[0],
                        evolves_to: evo.evolves_to,
                        species: evo.species,
                    }
                })
            },
        },
        asyncComputed: {
            pokemon: function () {
                let result = this.getPokemonByName(this.currentName);
                if(!result) {
                    result = pokemonLoader(this.currentName);
                }

                return result;
            },
            currentSprite: function () {
                return (this.pokemon) ? this.pokemon.sprites[this.spriteIndex] : undefined;
            }
        },
    }

</script>

<style>

    .pokemon-img {
        width: 100%;
    }

</style>