<template>
    <div id="app">
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </div>
</template>

<script>
    import pokeStore from './data/AppStore.js';
    export default { 
        store: pokeStore,
        name: 'app'
    }
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    padding-bottom: 2%;
}
</style>