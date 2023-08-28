<script setup>
defineProps(['movies', 'movieGenres']);
</script>

<template>
  <div class="carousel__item">
    <div class="position-relative card" style="width: 18rem" v-if="movies.poster_path">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movies.poster_path"
        class="card-img-top"
        :alt="movies.title + ' ' + '(' + movies.original_title + ')'"
      />

      <!-- genre -->
      <div class="position-absolute genre-list">
        <template v-for="(genre, indexGenre) in movies.genre_ids" :key="indexGenre">
          <span class="badge">
            {{ movieGenres.genres.find((genreList) => genreList.id === genre)?.name }}
          </span>
        </template>
      </div>

      <!-- percentage -->
      <div class="position-absolute rating">
        <span> {{ Math.round( (movies.vote_average * 100) / 10) }}% </span>
      </div>

      <!-- button -->
      <div class="position-absolute btn-wrapper">
        <router-link :to="{ name: 'movie_detail', params: { id: movies.id } }">
          <button class="btn btn-detail-movie">
            <i class="bi bi-camera-reels"></i>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../../assets/owlCarousel.css';

.card {
  border: 1px solid white;
  border: 0;
  margin: 0.75rem;
}

.card-img-top {
  width: 100%;
}
.genre-list {
  width: 100%;
  background-color: hsla(0, 0%, 0%, 0.5);
  /* background-color: blue; */
  z-index: 1;
  border-color: 1px solid transparent;
  top: 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-radius: 5px 5px 0px 0px;
  font-size: 12px;
}
.genre-list > span {
  /* background: linear-gradient(
    175deg,
    rgba(255, 255, 255, 1) 0%,
    rgb(196 190 190) 42%,
    rgba(255, 255, 255, 0.9808298319327731) 100%
  ); */
  margin-bottom: 2%;
  border-radius: 2px;
  /* padding: 5px; */
  /* color: rgb(68 68 68); */
  color: white;
}

.rating {
  width: 37px;
  height: 37px;
  border: 2px solid rgba(255, 255, 255, 0.504);
  border-radius: 37px;
  background: hsla(0, 0%, 0%, 0.5);
  right: 3%;
  top: 7%;
  /* color: rgb(2, 2, 2); */
  color: white;
  font-size: 12px;
}
.rating > span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bolder;
}

.btn-wrapper {
  z-index: 2;
  bottom: -1px;
  right: 0;
}
.btn-detail-movie {
  background-color: gray;
  width: 4em;
  bottom: 0;
  margin: 0 !important;
  padding: 0 !important;
  border: 1px solid transparent;
  border-radius: 5px 0px 0px 0px;
  color: white;
}
.btn-detail-movie:hover {
  background-color: rgb(95, 124, 162);
}
</style>
