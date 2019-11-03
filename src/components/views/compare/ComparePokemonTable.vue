<template>
    <div>
        <h5 class="text-center">Ranking by stat</h5>
        <table class="table w-50 stat-table text-center">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name of stat</th>
                    <th scope="col">Best pokemon</th>
                </tr>
            </thead>
            <tbody class="border-right border-left border-bottom">
                <tr
                v-for="(maxStat, index) in maxStats"
                :key="index"
                >
                    <td class="border-right">{{ maxStat.statName.firstLetterToUpper().sanitize() }}</td>
                    <td>{{ maxStat.pokemonName.firstLetterToUpper() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'ComparePokemonChart',
        props: {
            pokemons: Array,
        },
        computed: {
            stats: function () {
                return this.pokemons[0].specs.stats.map(stat => stat.name)
            },
            maxStats: function () {
                const result = [];
                this.stats.forEach(stat => {
                    const filteredStats = this.pokemons.map(pokemon => {
                        // retrieve the stat for the pokemons
                        const currentStat = pokemon.specs.stats.filter(pokemonStat => pokemonStat.name === stat)[0];
                        return {
                            pokemonName: pokemon.name,
                            value: currentStat.baseStat,
                            statName: stat
                        }
                    });

                    // retrieve the max for the current stat
                    let maxStat = filteredStats[0];
                    for(let i = 0; i < filteredStats.length; i++) {
                        const currentStat = filteredStats[i];
                        if(currentStat.value > maxStat.value) maxStat = currentStat;
                    }

                    result.push(maxStat);
                });

                return result;
            }
        },
        created () {
        }
    }

</script>

<style>

    .stat-table {
        margin-right: auto;
        margin-left: auto;
    }

</style>