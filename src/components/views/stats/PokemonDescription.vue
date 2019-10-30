<template>
    <div class="border-right pokemon-box">
        <div class="image-container border-bottom d-flex justify-content-center">
            <img class="card-img-center" :src="currentPokemon.sprites[2]"/>
        </div>
        <div class="description">
            <ul class="list card-text">
                <li>Name : {{ pokemon.name.firstLetterToUpper() }}</li>
                <li>Height : {{ pokemon.height }} </li>
                <li>ID of the pokemon : {{ pokemon.id }}</li>
            </ul>
        </div>
    </div>
</template>


<script>

    export default {
        props: {
            pokemon: Object,
        },
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