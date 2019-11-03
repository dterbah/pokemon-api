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
                    <td>
                        <i class="fas fa-poll"></i>
                        Total of stats
                    </td>
                    <td scope="col">{{ totalStats }}</td>
                </tr>
                <tr>
                    <td>
                        <i class="fas fa-brain"></i>
                        Abilities
                    </td>
                    <td>
                        <span v-for="(ability, index) in currentAbilities"
                            :key="index"
                        > {{ ability.firstLetterToUpper() }}<span v-if="currentAbilities.length > 1 && index < currentAbilities.length - 1">,</span>
                        </span>
                    </td>
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
            stats: Array,
            abilities: Array
        },
        data () {
            return {
                currentStats: this.$props.stats,
                currentAbilities: this.$props.abilities,
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