<template>
    <div>
        <apexchart 
            type="donut"
            :options="chartConfig.chartOptions"
            :series="chartConfig.series"
        ></apexchart>
    </div>
</template>

<script>

    export default {
        name: 'ComparePokemonChart',
        props: {
            pokemons: Array,
            statName: String,
        },
        computed: {
            chartConfig: function () {
                const series = [];
                this.$props.pokemons.forEach(pokemon => {
                    const result = pokemon.specs.stats.filter(stat => stat.name == this.$props.statName)[0];
                    series.push(result.baseStat);
                })

                const result =  {
                    series: series,
                    chartOptions: {
                        labels: this.$props.pokemons.map(pokemon => this.$props.statName.firstLetterToUpper() + ' percentage of ' + pokemon.name.firstLetterToUpper())
                    }
                }

                return result;
            }
        },
        created () {
        }
    }

</script>