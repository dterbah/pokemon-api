<template>
    <div class="compare-pokemon-container">
        <div class="d-flex justify-content-center w-75">
            <apexchart class="w-50 center-container" 
                type="radar" 
                :options="chartConfig.chartOptions"
                :series="chartConfig.series"
            ></apexchart>
        </div>
        <div>
            <compare-pokemon-table
                :pokemons="[firstPokemon, secondPokemon]"
            >
            </compare-pokemon-table>
        </div>
        
    </div>
</template>

<script>

    import Vuex from 'vuex';
    import ComparePokemonTable from './ComparePokemonTable.vue';

    export default {
        name: 'ComparePokemonContainer',
        components: { ComparePokemonTable },
        props: {
            firstPokemonIndex: Number,
            secondPokemonIndex: Number
        },
        computed: {
            ...Vuex.mapGetters(["getPokemonById"]),
            firstPokemon: function () {
                return this.getPokemonById(this.firstPokemonIndex);
            },
            secondPokemon: function () {
                return this.getPokemonById(this.secondPokemonIndex);
            },
            chartConfig: function () {
                return {
                    // series
                    series: [{
                        name: 'Stats of ' + this.firstPokemon.name.firstLetterToUpper(),
                        data: this.firstPokemon.specs.stats.map(stat => stat.baseStat)
                    },
                    {
                        name: 'Stats of ' + this.secondPokemon.name.firstLetterToUpper(),
                        data: this.secondPokemon.specs.stats.map(stat => stat.baseStat)
                    }],
                    chartOptions: {
                        labels: this.firstPokemon.specs.stats.map(stat => stat.name),
                        title: {
                            text: 'Global comparaison between ' + this.firstPokemon.name.firstLetterToUpper()
                            + ' and ' + this.secondPokemon.name.firstLetterToUpper(),
                            align: 'center',
                            style: {
                                fontSize: '14px'
                            }
                        },
                        plotOptions: {
                            radar: {
                                polygons: {
                                    strokeColor: '#e8e8e8',
                                    fill: {
                                        colors: ['#f8f8f8', '#fff']
                                    }
                                }
                           }
                        },
                        dataLabels: {
                            style: {
                                colors: [ 'yellow', '#1786ff', 'red', '#1786ff', 'red', '#d744a9'],
                                fontSize: '14px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                            },
                            textAnchor: 'end'
                        },
                        fill: {
                            colors: [ "white" ],
                            gradient: {
                                shade: 'white'
                            }
                        }
                    }
                }
            }
        },
    }

</script>

<style>

    .compare-pokemon-container {
        margin-top: 2%;
    }

    .center-container {
        position: relative;
        left: 15%;
    }

    .chart {
        width: calc(100% / 3);
    }

</style>