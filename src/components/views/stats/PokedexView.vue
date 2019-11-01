<template>
    <div class="w-75 border pokedex-container">
        <h5 class="p-2 border-bottom">
            <i :class="currentCaret" class="open-pokedex" @click="toggle"></i>
            Pokedex resumes
        </h5>
        <transition name="fade">
            <div class="pokedex left-shift" v-show="isShowed">
                <div class="flex-column"
                    v-for="(pokedex, index) in pokedexes"
                    :key="index"
                >
                    <h6 class="text-primary">Version {{ pokedex.version.firstLetterToUpper().sanitize() }}</h6>
                    <p class="left-shift">{{ pokedex.text }}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default { 
        name: 'PokedexView',
        props: {
            pokedexResumes: Array
        },
        data () {
            return {
                pokedexes: this.$props.pokedexResumes,
                isShowed: false
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
        }
    }
</script>

<style>
    .pokedex-container {
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.5%;
    }
    .open-pokedex:hover {
        cursor: pointer;
    }
    .left-shift {
        padding-left: 2%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style> 