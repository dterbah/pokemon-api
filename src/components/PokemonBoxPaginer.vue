<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="previousImage">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="index in nbrImages" :key="index">
        <a class="page-link" href="#" @click="(e) => updateIndex(e, index - 1)">{{ index }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"  @click="nextImage">
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
            nbrImages: { type: Number }
        },  
        data () {
            return {
                currentIndex: 0,
            };
        },
        methods: {
            previousImage: function (event) {
                event.preventDefault();
                this.currentIndex = (this.currentIndex - 1) % this.nbrImages;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.nbrImages - 1;
                }
                this.$emit('update-index', this.currentIndex);
            },
            nextImage: function (event) {
                event.preventDefault();
                this.currentIndex = (this.currentIndex + 1) % this.nbrImages;
                this.$emit('update-index', this.currentIndex);
            },
            updateIndex: function (event, index) {
                event.preventDefault();
                this.currentIndex = index;
                this.$emit('update-index', this.currentIndex);
            }
        }, 
        mounted () {
        }
    }

</script>