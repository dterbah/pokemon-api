<template>
    <div class="w-75 border pokedex-container">
        <h5 class="p-2 border-bottom">
            <i :class="currentCaret" class="open-pokedex" @click="toggle"></i>
            Chain Evolution of {{ currentPokemon.name.firstLetterToUpper() }}
        </h5>
        <transition name="fade">
            <div class="pokedex left-shift" v-show="isShowed">
                <div class="d-flex justify-content-center">
                    <pokemon-node 
                        :details="currentPokemon.evolutions"
                        >
                    </pokemon-node>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    import PokemonNode from './PokemonNode.vue';

    export default { 
        name: 'PokemonEvolution',
        components: { PokemonNode },
        props: {
            pokemon: Object
        },
        data () {
            return {
                isShowed: false,
                currentPokemon: this.$props.pokemon
            }
        },
        computed: {
            currentCaret: function () {
                return this.isShowed ? 'fas fa-caret-up' : 'fas fa-caret-down';
            },

        },
        methods: {
            toggle: function () {
                this.isShowed = !this.isShowed;
            }
        },
    }

</script>