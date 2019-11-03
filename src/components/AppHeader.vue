<template>
    <div class="header text-warning bg-dark">
        <b-dropdown id="dropdown-left" text="Navigation" variant="primary" class="m-2">
            <b-dropdown-item> 
                <router-link to="/">API Pokemon</router-link>
            </b-dropdown-item>
            <b-dropdown-item> 
                <router-link :to="{name: 'pokemon-compare' }">Compare Pokemons</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
                <router-link :to="{name: 'berries-view' }">Berries</router-link>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>

    export default {
        name: 'AppHeader'
    }

</script>

<style>

    .header {
        padding: 1% 0%;
    }

</style>