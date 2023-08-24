<script setup>
import { onMounted, ref } from 'vue';
import { movies, movieGenres } from '../../../api_list/tmdb/movie_list';
import { getStorage, setStorage } from '../../../utils/localStorage';
import cardNowPlaying from '../../components/movie/nowPlaying/cardNowPlaying.vue';

// list movies now playing
const moviesNowPlayingStorageName = 'movies_now_playing';
const movieNowPlayingListStorage = getStorage(moviesNowPlayingStorageName);

let moviesNowPlayingList = ref({ results: [] });
//check in localstorage
if (movieNowPlayingListStorage !== null) {
  const moviesNowPlayingStorage = JSON.parse(movieNowPlayingListStorage);
  moviesNowPlayingList = ref(moviesNowPlayingStorage);
}

// Genres
const movieGenresStorageName = 'movies_genres';
const movieGenresStorage = getStorage(movieGenresStorageName);

let movieGenreList = ref({ genres: [] });

if (movieGenresStorage !== null) {
  const moviesGenresStorage = JSON.parse(movieGenresStorage);
  movieGenreList = ref(moviesGenresStorage);
}

onMounted(() => {
  // Now Playing Movie
  if (movieNowPlayingListStorage == null) {
    movies()
      .then((response) => {
        console.log(response);
        moviesNowPlayingList.value = response.data;
        setStorage(moviesNowPlayingStorageName, moviesNowPlayingList.value);
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  // Genres
  // Movie
  if (movieGenresStorage == null) {
    movieGenres()
      .then((response) => {
        console.log(response);
        movieGenreList.value = response.data;
        setStorage(movieGenresStorageName, movieGenreList.value);
      })
      .catch(function (e) {
        console.log(e);
      });
  }
});

</script>

<template>
  <!-- now playing -->
  <div class="container">
    <div class="title-now-playing">
      <h1>Now Playing</h1>
    </div>

    <div class="flex-container">
      <cardNowPlaying 
      :nowPlaying="moviesNowPlayingList" 
      :movieGenres="movieGenreList"
      @detail-movie=" (atSection, movieId) => $emit('section', atSection, movieId)"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.title-now-playing {
  display: block;
  padding-left: 0.5em;
}

.title-now-playing > h1 {
  margin: 0.5rem;
}

.flex-container {
  overflow-x: hidden;
  justify-content: space-evenly;
}

</style>
