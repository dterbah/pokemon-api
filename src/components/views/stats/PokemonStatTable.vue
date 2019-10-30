<template>
    <div>
        <table class="table text-justify">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name of the stat</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStat, index) in currentStats"
                    :key="index"
                >
                    <th scope="col">
                        <i :class="statsIcons[index]"></i>
                        {{ currentStat.name.firstLetterToUpper() }}
                    </th>
                    <th scope="col">{{ currentStat.baseStat }}</th>
                </tr>
                <tr>
                    <th scope="col">
                        <i class="fas fa-poll"></i>
                        Total of stats
                    </th>
                    <th scope="col">{{ totalStats }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import statIcons from '../../../data/StatIcons';

    export default {
        name: 'PokemonStatTable',
        props: {
            stats: Array
        },
        data () {
            return {
                currentStats: this.$props.stats,
                statsIcons: statIcons
            }
        },
        computed: {
            totalStats: function () {
                const buffer = this.currentStats.map(currentStat => currentStat.baseStat);
                return buffer.reduce((result, value) => result + value);
            }
        }
    }

</script>