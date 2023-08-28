<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import { onMounted, ref, watch } from 'vue';
import {
  moviesNowPlayingAPI,
  moviesPopularAPI,
  movieGenresAPI,
  tvAiringTodayAPI,
  tvGenresAPI,
  tvPopularAPI
} from '../../../api_list/tmdb/movieList';
import { getStorage, setStorage } from '../../../utils/localStorage';
import CardMovie from '../../components/movie/CardMovie.vue';
import CardTV from '../../components/movie/CardTV.vue';

//checked
const checkedMovie = ref('nowPlaying');
const checkedTV = ref('tvAiringToday');

// skeleton loading
let movieLoading = ref(true);
let movieGenreLoading = ref(true);
let tvLoading = ref(true);
let tvGenreLoading = ref(true);

// list movies now playing
const moviesNowPlayingStorageName = 'movies_now_playing';
const movieNowPlayingListStorage = getStorage(moviesNowPlayingStorageName);

let moviesNowPlayingList = ref({ results: [] });
//check in localstorage
if (movieNowPlayingListStorage !== null) {
  const moviesNowPlayingStorage = JSON.parse(movieNowPlayingListStorage);
  moviesNowPlayingList = ref(moviesNowPlayingStorage.data);

  movieLoading.value = false;
}

// Genres
const movieGenresStorageName = 'movies_genres';
const movieGenresStorage = getStorage(movieGenresStorageName);

let movieGenreList = ref({ genres: [] });

if (movieGenresStorage !== null) {
  const moviesGenresStorage = JSON.parse(movieGenresStorage);
  movieGenreList = ref(moviesGenresStorage.data);

  movieGenreLoading.value = false;
}

const tvGenresStorageName = 'tv_genres';
const tvGenresStorage = getStorage(tvGenresStorageName);

let tvGenreList = ref({ genres: [] });

if (tvGenresStorage !== null) {
  const tvsGenresStorage = JSON.parse(tvGenresStorage);
  tvGenreList = ref(tvsGenresStorage.data);

  tvGenreLoading.value = false;
}

//Popular
const moviePopularStorageName = 'movies_popular';
const moviePopularStorage = getStorage(moviePopularStorageName);

let moviesPopular = ref({ results: [] });

if (moviePopularStorage !== null) {
  const moviesPopularStorage = JSON.parse(moviePopularStorage);
  moviesPopular = ref(moviesPopularStorage.data);

  movieLoading.value = false;
}

// TV airing today
const tvAiringTodayStorageName = 'tv_airing_today';
const tvAiringTodayStorage = getStorage(tvAiringTodayStorageName);

let tvAiringToday = ref({ results: [] });

if (tvAiringTodayStorage !== null) {
  const tvsAiringTodayStorage = JSON.parse(tvAiringTodayStorage);
  tvAiringToday = ref(tvsAiringTodayStorage.data);

  tvLoading.value = false;
}

// TV Popular
const tvPopularStorageName = 'tv_popular';
const tvPopularStorage = getStorage(tvPopularStorageName);

let tvsPopular = ref({ results: [] });

if (tvPopularStorage !== null) {
  const tvsPopularStorage = JSON.parse(tvPopularStorage);
  tvsPopular = ref(tvsPopularStorage.data);

  tvLoading.value = false;
}

onMounted(async () => {
  // Now Playing Movie
  if (movieNowPlayingListStorage == null) {
    await moviesNowPlayingAPI()
      .then((response) => {
        // console.log(response);
        moviesNowPlayingList.value = response.data;
        setStorage(moviesNowPlayingStorageName, moviesNowPlayingList.value);

        movieLoading.value = false;
      })
      .catch(function (e) {
        console.log('onMounted now playing', e);
        movieLoading.value = false;
      });
  }

  // Genres
  if (movieGenresStorage == null) {
    await movieGenresAPI()
      .then((response) => {
        // console.log(response);
        movieGenreList.value = response.data;
        setStorage(movieGenresStorageName, movieGenreList.value);

        movieGenreLoading.value = false;
      })
      .catch(function (e) {
        console.log(e);
        movieGenreLoading.value = true;
      });
  }

  if (tvGenresStorage == null) {
    await tvGenresAPI()
      .then((response) => {
        // console.log(response);
        tvGenreList.value = response.data;
        setStorage(tvGenresStorageName, tvGenreList.value);

        tvGenreLoading.value = false;
      })
      .catch(function (e) {
        console.log(e);
        tvGenreLoading.value = true;
      });
  }

  // TV
  if (tvAiringTodayStorage == null) {
    await tvAiringTodayAPI()
      .then((response) => {
        tvAiringToday.value = response.data;
        setStorage(tvAiringTodayStorageName, tvAiringToday.value);

        tvLoading.value = false;
      })
      .catch(function (e) {
        console.log('onMounted tv airing today', e);
        tvLoading.value = false;
      });
  }
});

// watch movie
watch(checkedMovie, async (newCheckedMovie) => {
  // now playing
  if (moviesNowPlayingList.value.results.length == 0 && newCheckedMovie == 'nowPlaying') {
    movieLoading.value = true;
    await moviesNowPlayingAPI()
      .then((response) => {
        // console.log(response);
        moviesNowPlayingList.value = response.data;
        setStorage(moviesNowPlayingStorageName, moviesNowPlayingList.value);

        movieLoading.value = false;
      })
      .catch(function (e) {
        console.log('onMounted now playing', e);
        movieLoading.value = false;
      });
  }

  // Popular
  if (moviesPopular.value.results.length == 0 && newCheckedMovie == 'popular') {
    movieLoading.value = true;

    await moviesPopularAPI()
      .then((response) => {
        moviesPopular.value = response.data;
        setStorage(moviePopularStorageName, moviesPopular.value);

        movieLoading.value = false;
      })
      .catch(function (e) {
        console.log('watch popular', e);
        movieLoading.value = true;
      });
  }
});

// watch TV
watch(checkedTV, async (newCheckedTV) => {
  console.log('tv', newCheckedTV);
  // airing now
  if (tvAiringToday.value.results.length == 0 && newCheckedTV == 'tvAiringToday') {
    tvLoading.value = true;
    await tvAiringTodayAPI()
      .then((response) => {
        tvAiringToday.value = response.data;
        setStorage(tvAiringTodayStorageName, tvAiringToday.value);

        tvLoading.value = false;
      })
      .catch(function (e) {
        console.log('onMounted tv Airing now', e);
        tvLoading.value = false;
      });
  }

  // tv popular
  if (tvsPopular.value.results.length == 0 && newCheckedTV == 'tvPopular') {
    tvLoading.value = true;
    await tvPopularAPI()
      .then((response) => {
        tvsPopular.value = response.data;
        setStorage(tvPopularStorageName, tvsPopular.value);

        tvLoading.value = false;
      })
      .catch(function (e) {
        console.log('onMounted tv Popular', e);
        tvLoading.value = false;
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
  <section class="mb-3" id="movies">
    <div class="container-fluid">
      <div class="d-flex movies">
        <div class="title-movies me-3 my-2">
          <h1>Movie</h1>
        </div>

        <!-- section -->
        <div
          class="btn-group btn-group-sm tab-movie"
          role="group-movies"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check btn-movie-check"
            name="btnradio"
            id="btn-now-playing"
            autocomplete="off"
            value="nowPlaying"
            v-model="checkedMovie"
          />
          <label class="btn btn-primary" for="btn-now-playing">Now Playing</label>

          <input
            type="radio"
            class="btn-check btn-movie-check"
            name="btnradio"
            id="btn-popular"
            autocomplete="off"
            value="popular"
            v-model="checkedMovie"
          />
          <label class="btn btn-primary" for="btn-popular">Popular</label>
        </div>
      </div>

      <v-skeleton-loader
        boilerplate
        v-if="movieLoading || movieGenreLoading"
        :loading="movieLoading"
        class="skeleton-loading"
        type="table-heading, list-item-two-line, image, table-tfoot"
      >
      </v-skeleton-loader>

      <!-- Now Playing -->
      <Carousel
        v-if="!movieLoading && !movieGenreLoading && checkedMovie == 'nowPlaying'"
        :bind="carouselSettings"
        :breakpoints="carouselBreakpoints"
        :autoplay="3000"
        :wrap-around="true"
      >
        <template v-for="(movieSlide, index) in moviesNowPlayingList.results" :key="index">
          <Slide v-if="movieSlide.poster_path">
            <CardMovie :movies="movieSlide" :movieGenres="movieGenreList" />
          </Slide>
        </template>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>

      <!-- Popular -->
      <Carousel
        v-if="!movieLoading && !movieGenreLoading && checkedMovie == 'popular'"
        :bind="carouselSettings"
        :breakpoints="carouselBreakpoints"
        :autoplay="2000"
        :wrap-around="true"
      >
        <template v-for="(moviePopular, indexPopular) in moviesPopular.results" :key="indexPopular">
          <Slide v-if="moviePopular.poster_path">
            <CardMovie :movies="moviePopular" :movieGenres="movieGenreList" />
          </Slide>
        </template>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>

  <section class="mb-3" id="tv">
    <div class="container-fluid">
      <div class="d-flex tv">
        <div class="title-tv me-3 my-2">
          <h1>TV</h1>
        </div>

        <!-- section -->
        <div
          class="btn-group btn-group-sm tab-tv"
          role="group-tv"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check btn-tv-check"
            name="btnTVRadio"
            id="btn-tv-airing-today"
            autocomplete="off"
            value="tvAiringToday"
            v-model="checkedTV"
          />
          <label class="btn btn-primary" for="btn-tv-airing-today">Airing Today</label>

          <input
            type="radio"
            class="btn-check btn-tv-check"
            name="btnTVRadio"
            id="btn-tv-popular"
            autocomplete="off"
            value="tvPopular"
            v-model="checkedTV"
          />
          <label class="btn btn-primary" for="btn-tv-popular">Popular</label>
        </div>
      </div>

      <v-skeleton-loader
        boilerplate
        v-if="movieLoading || movieGenreLoading"
        :loading="movieLoading"
        class="skeleton-loading"
        type="table-heading, list-item-two-line, image, table-tfoot"
      >
      </v-skeleton-loader>
      <!-- Airing today -->
      <Carousel
        v-if="!tvLoading && !tvGenreLoading && checkedTV == 'tvAiringToday'"
        :bind="carouselSettings"
        :breakpoints="carouselBreakpoints"
        :autoplay="300000"
        :wrap-around="true"
      >
        <template v-for="(tvSlide, indexAiring) in tvAiringToday.results" :key="indexAiring">
          <Slide v-if="tvSlide.poster_path">
            <CardTV :tvs="tvSlide" :tvGenres="tvGenreList" />
          </Slide>
        </template>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>

      <!-- TV Popular -->
      <Carousel
        v-if="!tvLoading && !tvGenreLoading && checkedTV == 'tvPopular'"
        :bind="carouselSettings"
        :breakpoints="carouselBreakpoints"
        :autoplay="2000"
        :wrap-around="true"
      >
        <template v-for="(tvPopular, indexPopular) in tvsPopular.results" :key="indexPopular">
          <Slide v-if="tvPopular.poster_path">
            <CardTV :tvs="tvPopular" :tvGenres="tvGenreList" />
          </Slide>
        </template>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
@import '../../../assets/movie.css';
</style>
