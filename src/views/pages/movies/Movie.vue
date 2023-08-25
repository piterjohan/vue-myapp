<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { onMounted, ref } from 'vue';
import { movies, movieGenres } from '../../../api_list/tmdb/movie_list';
import { getStorage, setStorage } from '../../../utils/localStorage';
import cardNowPlaying from '../../components/movie/nowPlaying/cardNowPlaying.vue';

// skeleton loading
let movieNowPlayingLoading = ref(true);
let movieGenreLoading = ref(true);

// list movies now playing
const moviesNowPlayingStorageName = 'movies_now_playing';
const movieNowPlayingListStorage = getStorage(moviesNowPlayingStorageName);

let moviesNowPlayingList = ref({ results: [] });
//check in localstorage
if (movieNowPlayingListStorage !== null) {
  const moviesNowPlayingStorage = JSON.parse(movieNowPlayingListStorage);
  moviesNowPlayingList = ref(moviesNowPlayingStorage.data);
  
  // setTimeout(() => {
    movieNowPlayingLoading.value = false
  // }, 2 * 1000);

}

// Genres
const movieGenresStorageName = 'movies_genres';
const movieGenresStorage = getStorage(movieGenresStorageName);

let movieGenreList = ref({ genres: [] });

if (movieGenresStorage !== null) {
  const moviesGenresStorage = JSON.parse(movieGenresStorage);
  movieGenreList = ref(moviesGenresStorage.data);
  
  // setTimeout(() => {
    movieGenreLoading.value = false;
  // }, 1 * 1000);
}

onMounted(async () => {
  // Now Playing Movie
  if (movieNowPlayingListStorage == null) {
    await movies()
      .then((response) => {
        console.log(response);
        moviesNowPlayingList.value = response.data;
        setStorage(moviesNowPlayingStorageName, moviesNowPlayingList.value);

        movieNowPlayingLoading.value = false;
      })
      .catch(function (e) {
        console.log(e);
        movieNowPlayingLoading.value = false;
      });
  }

  // Genres
  // Movie
  if (movieGenresStorage == null) {
    await movieGenres()
      .then((response) => {
        console.log(response);
        movieGenreList.value = response.data;
        setStorage(movieGenresStorageName, movieGenreList.value);

        movieGenreLoading.value = false;
      })
      .catch(function (e) {
        console.log(e);
        movieGenreLoading.value = true;
      });
  }
});

// Carousel Settings
const carouselSettings = {
  itemsToShow: 1,
  snapAlign: 'center'
};
const carouselBreakpoints = {
  // 700px and up
  700: {
    itemsToShow: 2,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start'
  }
};
</script>

<template>
  <div class="container-fluid">
    <!-- now playing -->
    <div class="title-now-playing">
      <h1>Now Playing</h1>
    </div>

    <v-skeleton-loader
      boilerplate
      v-if="movieNowPlayingLoading || movieGenreLoading"
      :loading="loading"
      class="skeleton-loading"
      type="table-heading, list-item-two-line, image, table-tfoot"
    >
    </v-skeleton-loader>
    
    <Carousel
      v-if="!movieNowPlayingLoading && !movieGenreLoading"
      :bind="carouselSettings"
      :breakpoints="carouselBreakpoints"
      :autoplay="2000"
      :wrap-around="true"
    >
      <Slide v-for="(movieSlide, index) in moviesNowPlayingList.results" :key="index">
        <cardNowPlaying :now-playing="movieSlide" :movieGenres="movieGenreList" />
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.title-now-playing {
  display: block;
}

.title-now-playing > h1 {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
/* media query */
@media only screen and (max-width: 360px) {
  .carousel__pagination{
    display: flex;
    overflow-x: hidden;
  }
}
</style>
