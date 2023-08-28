import { createRouter, createWebHistory } from 'vue-router';
import Todo from '../views/pages/todo/Todolist.vue';
import Movie from '../views/pages/movies/Movie.vue';
import MovieDetail from '../views/pages/movies/MovieDetail.vue'
import TvDetail from '../views/pages/movies/TvDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Todo
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo
  },
  // movie
  {
    path: '/movie',
    name: 'movie',
    component: Movie
  },
  {
    path: '/movie/:id',
    name: 'movie_detail',
    component: MovieDetail,
  },
  {
    path: '/tv/:id',
    name: 'tv_detail',
    component: TvDetail,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
