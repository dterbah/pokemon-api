<template>
    <nav aria-label="Page navigation example" id="app-paginer">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item text-dark" v-for="index in nbrPages" :key="index">
        <a class="page-link" :class="{active: index == currentPage}" href="#" @click="(e) => to(e, index)">{{ index }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="nextPage">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

    export default {
        props: {
            nbrPages: { type: Number }
        },
        data () {
          return {
            currentPage: 1,
          }
        },
        methods: {
            previousPage: function (event) {
              event.preventDefault();
              if(this.currentPage > 1) {
                this.currentPage--;
                this.$emit('update-page', this.currentPage);
              }
            }, 
            nextPage: function (event) {
              event.preventDefault();
              if(this.currentPage < this.nbrPages) {
                this.currentPage++;
                this.$emit('update-page', this.currentPage);
              }
            },
            to: function (event, value) {
              event.preventDefault();
              this.currentPage = value;
              this.$emit('update-page', this.currentPage);
            }
        },

        mounted () {
        }
    }

</script>

<style>

    #app-paginer {
        margin-top: 2%;
    }

    .active {
      background-color: black;
    }

</style>