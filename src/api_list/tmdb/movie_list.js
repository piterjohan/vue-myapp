import axios from '../../utils/axios';

const LANG ='en-US';

export function movies(lang = LANG, page = 1) {
  return axios.get(`movie/now_playing?language=${lang}&page=${page}`);
}

export function movieByID(movieId=null, lang = LANG){
  return axios.get(`movie/${movieId}?language=${lang}`);
}

export function movieGenres(lang= 'en'){
  return axios.get(`genre/movie/list?language=${lang}`)
}