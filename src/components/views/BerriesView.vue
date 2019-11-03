<template>
    <div>
        <app-header title="Berries API"></app-header>
        <div class="container">
            <h5 class="text-center">Berries view</h5>
            <berries-container
                v-for="(berries, index) in displayedBerries"
                :key="index"
                :berries="berries"
                :v-show="!ajaxRequesting"
            ></berries-container>
            <loading-spinner v-show="ajaxRequesting"></loading-spinner>
			<app-paginer :nbrPages="nbrPages" @update-page="updatePage"></app-paginer>            
        </div>
    </div>
</template>

<script>

    import AppHeader from './../AppHeader.vue'
    import LoadingSpinner from './../util/LoadingSpinner.vue';
    import BerriesContainer from './berries/BerriesContainer.vue';
    import AppPaginer from './../paginer/AppPaginer.vue';

    import Vuex from 'vuex';
    
    import berryLoader from './../../api/load-berries.js'

    export default {
        name: 'BerriesView',
        components: { AppHeader, LoadingSpinner, BerriesContainer, AppPaginer },
        data () {
            return {
                ajaxRequesting: false,
                berriesCount: 64,
                currentPage: 1,
                BERRIES_BY_PAGE: 16,
                BERRIES_BY_ROW: 4,
                nbrPages: 64 / 16
            }
        },
        computed: {
            ...Vuex.mapGetters(["berries", "getBerriesByRange"]),
            displayedBerries: function () {
                const result = [];
                let buffer = [];
                const begin = (this.currentPage - 1) * this.BERRIES_BY_PAGE + 1;
                const end = this.currentPage * this.BERRIES_BY_PAGE;

                const berries = this.getBerriesByRange(begin, end);
                if(berries) {
                    for(let i = 0; i < berries.length; i++) {
                        const berry = berries[i];
                        if(i % this.BERRIES_BY_ROW == 0 && i != 0) {
                            result.push(buffer);
                            buffer = [];
                        }

                        buffer.push(berry);
                    }
                }   

                result.push(buffer);

                return result;
            },
        },
        methods: {
            ...Vuex.mapActions(["addBerry"]),
            loadBerries: async function (begin, end) {
                this.ajaxRequesting = true;
                for(let i = begin; i <= end; i++) {
                    const berry = await berryLoader(i);
                    if(berry) {
                        this.addBerry(berry);
                    }
                }

                this.ajaxRequesting = false;
            },
            updatePage(value, event) {
                if(event) event.preventDefault();
                this.currentPage = value;
                const from = (this.currentPage - 1) * this.BERRIES_BY_PAGE + 1;
                const to = this.currentPage * this.BERRIES_BY_PAGE;
                this.loadBerries(from, to);
            }
        },
        created () {
            const begin = (this.currentPage - 1) * this.BERRIES_BY_PAGE + 1;
            const end = this.currentPage * this.BERRIES_BY_PAGE;
            this.loadBerries(begin, end);
        }
    };

</script>