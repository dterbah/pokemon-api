<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <berries-container
                v-for="(berries, index) in displayedBerries"
                :key="index"
                :berries="berries"
                :v-show="!ajaxRequesting"
            ></berries-container>
            <loading-spinner v-show="ajaxRequesting"></loading-spinner>
        </div>
    </div>
</template>

<script>

    import AppHeader from './../AppHeader.vue'
    import LoadingSpinner from './../util/LoadingSpinner.vue';
    import BerriesContainer from './berries/BerriesContainer.vue';

    import Vuex from 'vuex';
    
    import berryLoader from './../../api/load-berries.js'
    import axios from 'axios';
    import URL from '../../api/url.js';


    export default {
        name: 'BerriesView',
        components: { AppHeader, LoadingSpinner, BerriesContainer },
        data () {
            return {
                ajaxRequesting: false,
                berriesCount: this.getBerriesCount(),
                currentPage: 1,
                BERRIES_BY_PAGE: 16,
                BERRIES_BY_ROW: 4,
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
                console.log(this.BERRIES_BY_ROW);
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
            }
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
            getBerriesCount: async function () {
                const url = URL.berriesLink;
                // retrieve the count of berries
                const berriesCountRequest = await axios.get(url);
                const berriesCount = berriesCountRequest.data.count;

                return berriesCount;
            }
        },
        created () {
            const begin = (this.currentPage - 1) * this.BERRIES_BY_PAGE + 1;
            const end = this.currentPage * this.BERRIES_BY_PAGE;
            this.loadBerries(begin, end);
        }
    };

</script>