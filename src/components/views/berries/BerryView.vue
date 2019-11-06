<template>
    <div>
        <app-header title="Berry view"></app-header>
        <div class="d-flex w-75 berry-container border">
            <div class="w-50 align-self-center">
                <img :src="spriteLink" class="w-25 card-img-top"/>
                <div class="card-body d-flex justify-content-center">
                    <ul class="list card-text">
                        <li>Name of the berry : {{ berry.name.firstLetterToUpper() }}</li>
                        <li>ID of the berry : {{ berry.id }} </li>
                    </ul>
                </div>
            </div>
            <div class="w-50 border-left">
                <table class="table text-justify w-100">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Characteristic</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Firmness</td>
                            <td>{{ berry.specs.firmness.sanitize().firstLetterToUpper() }}</td>
                        </tr>
                        <tr>
                            <td>Growth time</td>
                            <td>{{ berry.specs.growthTime }}</td>
                        </tr>
                        <tr>
                            <td>Max harvest</td>
                            <td>{{ berry.specs.maxHarvest }}</td>
                        </tr>
                        <tr>
                            <td>Natural gift power</td>
                            <td>{{ berry.specs.naturalGiftPower.name.firstLetterToUpper() }}</td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td>{{ berry.specs.size }}</td>
                        </tr>
                        <tr>
                            <td>Smoothness</td>
                            <td>{{ berry.specs.smoothness }}</td>
                        </tr>
                        <tr>
                            <td>Soil dryness</td>
                            <td>{{ berry.specs.soilDryness }}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <table class="table border-right border-left border-bottom w-100">
                                    <thead class="table-warning">
                                        <tr>
                                            <th>Category of flavor</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(flavor, index) in berry.specs.flavors"
                                            :key="index"
                                        >
                                            <td>{{ flavor.name.firstLetterToUpper() }}</td>
                                            <td>{{ flavor.potency }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import AppHeader from './../../AppHeader.vue';
    import Vuex from 'vuex';

    export default {
        name: 'BerryView',
        components: { AppHeader },
        data () {
            return {
                berryId: parseInt(this.$route.params.berryId)
            }
        },
        computed: {
            ...Vuex.mapGetters(["getBerryById"]),
            berry: function () {
                return this.getBerryById(this.berryId);
            },
            spriteLink: function () {
                return require("@/assets/images/berries/" + this.berry.sprite);
            }
        },
        created () {
        }
    }

</script>

<style>

    .berry-container {
        margin-top: 2%;
        margin-left: auto;
        margin-right: auto;
    }
</style>