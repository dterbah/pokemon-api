<template>
    <div>
        <app-header title="Comparaison of pokemons"></app-header>
        <div class="comparer d-flex justify-content-center">
             <b-form-select
                v-model="firstPokemonSelected"
                :options="options"
                class="w-25 mr-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
            ></b-form-select>
            <b-form-select
                v-model="secondPokemonSelected"
                :options="options"
                class="w-25 mr-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
            ></b-form-select>
            <button v-if="!showed" type="button" class="btn btn-primary" @click="compare">Compare</button>
        </div>
        <compare-pokemon-container v-if="showed" :firstPokemonIndex="firstPokemonSelected" :secondPokemonIndex="secondPokemonSelected"></compare-pokemon-container> 
    </div>
</template>

<script>

    import ComparePokemonContainer from './ComparePokemonContainer.vue';
    import AppHeader from './../../AppHeader.vue';
    import Vuex from 'vuex';

    export default { 
        name: 'ComparePokemonView',
        components: { AppHeader, ComparePokemonContainer },
        data () {
            return {
                firstPokemonSelected: null,
                secondPokemonSelected: null,
                showed: false,
            }
        },
        computed: {
            ...Vuex.mapGetters(["pokemons"]),
            options: function () {
                return this.pokemons.map(pokemon => {
                    return {
                        item: pokemon.id,
                        name: pokemon.name.firstLetterToUpper()
                    }
                });
            }
        },
        methods: {
            compare: function () {
                this.showed = this.firstPokemonSelected !== null && this.secondPokemonSelected !== null;
            }
        },
    }

</script>

<style>
    .comparer {
        margin-top: 2%;
    }
</style>