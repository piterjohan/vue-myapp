import axios from '../../utils/axios';

const LANG_ISO ='en-US';
const LANG = 'en';

// Movie
export function moviesNowPlayingAPI(lang = LANG_ISO, page = 1) {
  return axios.get(`movie/now_playing?language=${lang}&page=${page}`);
}

export function movieByIDAPI(movieId=null, lang = LANG_ISO){
  return axios.get(`movie/${movieId}?language=${lang}`);
}

export function movieGenresAPI(lang= LANG){
  return axios.get(`genre/movie/list?language=${lang}`)
}

export function moviesPopularAPI(lang = LANG_ISO, page = 1) {
  return axios.get(`movie/popular?language=${lang}&page=${page}`);
}

export function movieVideoAPI(movieID){
  return axios.get(`movie/${movieID}/videos`);
}

// TV
export function tvGenresAPI(lang= LANG){
  return axios.get(`genre/tv/list?language=${lang}`)
}

export function tvAiringTodayAPI(lang = LANG_ISO, page = 1){
  return axios.get(`tv/airing_today?language=${lang}&page=${page}`);
}

export function tvPopularAPI(lang = LANG_ISO, page = 1) {
  return axios.get(`tv/popular?language=${lang}&page=${page}`);
}

export function tvByIDAPI(tvId=null, lang = LANG_ISO){
  return axios.get(`tv/${tvId}?language=${lang}`);
}

export function tvVideoAPI(seriesID){
  return axios.get(`tv/${seriesID}/videos`);
}