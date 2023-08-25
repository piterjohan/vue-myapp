<script setup>
import { onMounted, ref } from 'vue';
import { movieByID } from '../../../api_list/tmdb/movie_list';
import { formatDate } from '../../../utils/date';
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = route.params.id;

let loading= true;
const baseIMGUrlOriginal = import.meta.env.VITE_IMG_URL_ORIGINAL;
const baseIMGUrlW500 = import.meta.env.VITE_IMG_URL_w500;

const movie = ref();
let releaseDate = '';

onMounted(async () => {
  await movieByID(movieId)
    .then((response) => {
      movie.value = response;
      releaseDate = formatDate(movie.value.data.release_date);
      loading = false;
    })
    .catch((e) => {
      console.log('movieByID');
      console.log(e);
      loading = false;

    });
});
</script>

<template>
  <div class="container">

  <v-skeleton-loader
     boilerplate
     v-if="loading"
     :loading="loading"
     class="skeleton-loading"
     type="table-heading, list-item-two-line, image, table-tfoot">
  </v-skeleton-loader>
  
  <!-- content -->
  <div
      v-if="movie?.data.backdrop_path && !loading"
      class="movie-detail bg-wrapper"
      :style="{ 'background-image': 'url(' + baseIMGUrlOriginal + movie?.data.backdrop_path + ')' }"
    >
      <div class="flex back-button">
        <router-link to="/movie">
          <button>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios/50/FFFFFF/left2.png"
              alt="back"
            />
          </button>
        </router-link>
      </div>

      <div class="color-wrapper">
        <div class="flex-container">
          <div class="detail-image">
            <img
              v-if="movie?.data.poster_path"
              class="img-fluid"
              :src="baseIMGUrlW500 + movie?.data.poster_path"
              :alt="movie?.data.title + ' ' + '(' + movie?.data.original_title + ')'"
            />
          </div>
          <div class="body-detail-movie">
            <div class="title-movie">
              <a :href="movie?.data.homepage" target="_blank">
                <h1>{{ movie?.data.title }}</h1>
              </a>
            </div>
            <div class="release-date">
              <p>Release Date: {{ releaseDate }}</p>
            </div>
            <div class="rating">
              <p>Rating: {{ Math.round( (movie?.data.vote_average * 100) / 10) }}%</p>
            </div>
            <div class="genre">
              <template v-for="(genre, indexGenre) in movie?.data.genres" :key="indexGenre">
                <p>{{ genre.name }}</p>
              </template>
            </div>

            <div class="description-wrapper">
              <h2>Overview</h2>
              <p>
                {{ movie?.data.overview }}
              </p>
            </div>

            <div class="producer-wrapper">
              <template
                v-for="(producer, indexProducer) in movie?.data.production_companies"
                :key="indexProducer"
              >
                <div class="producer-logo" v-if="producer.logo_path">
                  <img
                    :src="baseIMGUrlW500 + producer.logo_path"
                    :alt="producer.name"
                    width="125"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 1rem;
  width: 100%;
  text-align: left;
}
.flex-container {
  padding: 1rem;
  justify-content: center;
}
.movie-detail .back-button {
  position: absolute;
  z-index: 1;
  top: 2%;
  left: 2%;
}
.movie-detail .back-button button {
  /* width: 20vh; */
  /* padding: 5px; */
  border-radius: 5px;
  background-color: transparent;
  border-color: 1px solid white;
  cursor: pointer;
}
.movie-detail .title-movie > a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

.movie-detail .title-movie > a:hover {
  color: #35b724;
}

.movie-detail .body-detail-movie {
  position: relative;
  padding-top: 1rem;
  width: 50%;
  color: white;
  padding-left: 20px;
}
.movie-detail .genre > p {
  display: inline-block;
  margin-right: 0.5rem;
  margin-top: 0px;
  margin-bottom: 0px;
}
.movie-detail .genre > p {
  padding: 5px;
  background-color: rgb(84, 152, 62);
  border-top-left-radius: 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 5px;
}

.movie-detail .description-wrapper {
  text-align: justify;
}
.bg-wrapper {
  /* border-bottom: 1px solid var(--primaryColor); */
  /* background-position: left calc((50vw - 170px) - 340px) top; */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
}
.color-wrapper {
  background-image: linear-gradient(
    to right,
    rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px),
    rgba(31.5, 31.5, 31.5, 0.84) 50%,
    rgba(31.5, 31.5, 31.5, 0.84) 100%
  );
}

.producer-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.producer-wrapper .producer-logo {
  background: rgb(255, 255, 255);
  margin: 5px;
  padding: 0.5rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 20px;
}
/* media query */
@media only screen and (max-width: 1024px) {
  .movie-detail .body-detail-movie{
    width: 100%;
  }
  .movie-detail .genre > p{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
