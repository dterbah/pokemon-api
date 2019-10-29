<template>
    <div class="stats">
        <div class="w-100">
            <apexchart type="radar" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';


    export default {
        name: 'PokemonStat',
        props: {
            stats: Array,
            name: String
        },
        data () {
            return {
                pokemonStats: this.$props.stats,
                pokemonName: this.$props.name,
                series: [{
                    name: 'Pokemon stats',
                    data: this.$props.stats.map(stat => stat.baseStat),
                }],
                chartOptions: {
                    labels: this.$props.stats.map(stat => stat.name),
                    title: {
                        text: 'Stats of ' + this.$props.name.firstLetterToUpper(),
                        align: 'center',
                        style: {
                            fontSize: '18px'
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
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                        },
                        textAnchor: 'end'
                    }
                    
                }
            }
        },
        computed: {
            ...Vuex.mapGetters(["getMaxStatByName"]),
        },
    }

</script>