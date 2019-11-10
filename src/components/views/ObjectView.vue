<template>
    <div>
        <app-header title="Object list"></app-header>
        <div class="container">
            <div
                v-for="(item, index) in items"
                :key="index"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>

    import AppHeader from './../AppHeader.vue';
    import itemLoader from '../../api/load-item.js';
    import Vuex from 'vuex';

    export default {
        name: 'ObjectView',
        components: { AppHeader },
        data () {
            return {
                loadCount: 0,
                OBJECTS_BY_RELOAD: 20
            }
        },
        async mounted () {
        },
        computed: {
            ...Vuex.mapGetters(["items"]),
        },
        methods: {
            ...Vuex.mapActions(["addItem"]),
            loadItems: async function (begin, end) {
                for(let i = begin; i <= end; i++) {
                    const item = await itemLoader(i);
                    if(item) {
                        this.addItem(item);
                    }
                }
            }
        }
    }

</script>