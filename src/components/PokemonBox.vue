<template>
  <div class="card col box" style="width: 18rem;">
    <div class="img-container border-bottom border-dark" @click="(e) => e.preventDefault()">
      <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true" @click="previousImage">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item" v-for="(sprite, index) in sprites" :key="index">
            <a class="page-link" href="#" @click="currentIndex = index">{{ index + 1 }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true" @click="nextImage">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <transition name="fade">
        <img :src="currentImage" class="card-img-top" />
      </transition>
    </div>
    <div class="card-body">
      <ul class="list card-text">
        <li>Name : {{ capitalizedName }}</li>
        <li>ID : {{ pokemon.id }}</li>
        <li>Height : {{ pokemon.height }}</li>
        <li>Base Experience : {{ pokemon.baseExperience}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: { type: Object }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  computed: {
    currentImage: function() {
      // return this.sprites[this.currentIndex];
      return this.sprites[this.currentIndex];
    },
    capitalizedName: function() {
      return (
        this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
      );
    },
    sprites: function() {
      return this.pokemon.sprites;
    }
  },
  methods: {
    nextImage: function() {
      this.currentIndex = (this.currentIndex + 1) % this.sprites.length;
    },
    previousImage: function() {
      this.currentIndex = (this.currentIndex - 1) % this.sprites.length;
      if (this.currentIndex < 0) {
        this.currentIndex = this.sprites.length - 1;
      }
    }
  },

  mounted() {
    global.pokemon = this.pokemon;
  }
};
</script>

<style>
.box {
  text-align: center;
  border: 1px solid black;
}

.box .list li {
  list-style-type: square;
  text-align: justify;
}
</style>