<template>
    <div class="d-flex justify-content-center">
        {{ firstPokemonIndex }}
    </div>
</template>

<script>

    export default {
        name: 'ComparePokemonContainer',
        props: {
            firstPokemonIndex: Number,
            secondPokemonIndex: Number
        },
    }

</script>