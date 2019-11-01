<template>
    <div>
        <div class="w-75 border pokedex-container">
        <h5 class="p-2 border-bottom">
            <i :class="currentCaret" class="open-pokedex" @click="toggle"></i>
            Pokemon forms
        </h5>
        <transition name="fade">
            <div v-show="isShowed">
                <table class="d-flex border-bottom">
                    <div class="w-50 text-center">Back view</div>
                    <div class="w-50 text-center">Front view</div>
                </table>
                <div class="d-flex justify-content-center" v-show="isShowed">
                    <div class="w-25"
                    v-for="(sprite, index) in currentPokemon.sprites"
                    :key="index"
                    >
                        <img :src="sprite"/>
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
    </div>
</template>

<script>

    export default {
        name: 'PokemonForms',
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
            }
        },
        methods: {
            toggle: function () {
                this.isShowed = !this.isShowed;
            }
        },
    }

</script>

<style>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    
    img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>