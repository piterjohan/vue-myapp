<script setup>
defineProps(['nowPlaying', 'movieGenres']);
</script>

<template>
  <div
    class="card"
    style="width: 18rem"
    v-for="(movie, indexMovie) in nowPlaying.results"
    :key="indexMovie"
  >
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      class="card-img-top"
      :alt="movie.title + ' ' + '(' + movie.original_title + ')'"
    />

    <div class="card-body">
      <h5 class="card-title movie-title">{{ movie.title.toUpperCase() }}</h5>
      <div class="flex genre-list">
        <template v-for="(genre, indexGenre) in movie.genre_ids" :key="indexGenre">
          <span class="badge">
            {{ movieGenres.genres.find((genreList) => genreList.id === genre).name }}
          </span>
        </template>
      </div>
      <p>
        <b>{{ movie.original_langugage }}</b>
      </p>
      <p>Adult: {{ movie.adult ? 'Yes' : 'No' }}</p>
      <p>Release: {{ movie.release_date }}</p>
      <p>Rating: {{ (movie.vote_average * 100) / 10 }}%</p>
      <p class="card-text movie-synopsis">
        {{ movie.overview }}
      </p>

      <div class="flex-end">
        <router-link :to="{ name: 'movie_detail', params: { id: movie.id } }">
          <button class="detail-movie">Detail Movie</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid white;
  margin: 0.75rem;
}

.card-img-top {
  width: 100%;
}
.card-body {
  background-color: gray;
  display: block;
  padding: 0.75rem;
  color: white;
}
.card .card-title {
  margin: 0 !important;
  font-size: 16px;
}

.card .card-text {
  color: white;
  font-size: 18px;
  text-align: justify;
}
.movie-synopsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6; /* Number of lines displayed before it truncate */
  overflow: hidden;
}
.card > .card-body > a {
  text-align: right;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.card > .card-body > a:hover {
  color: rgb(195, 232, 75);
}
.genre-list {
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
}

.genre-list > span {
  background: linear-gradient(
    175deg,
    rgba(255, 255, 255, 1) 0%,
    rgb(196 190 190) 42%,
    rgba(255, 255, 255, 0.9808298319327731) 100%
  );
  margin-top: 3%;
  border-radius: 5px;
  padding: 5px;
  color: rgb(68 68 68);
}
.detail-movie {
  background: rgb(118 118 118);
  padding: 0.5rem;
  color: rgb(236, 236, 236);
  cursor: pointer;
}
</style>
