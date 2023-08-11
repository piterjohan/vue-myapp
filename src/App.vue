<script setup>
import { ref } from 'vue';
import Navbar from './components/navbar/Navbar.vue';
import TodoList from './pages/todolist.vue';
import Movie from "./pages/Movie.vue";

let atSection = ref('todo_list');

function setSection(section) {
  console.log(`section at: ${section}`)
  atSection.value = section;
}

</script>

<template>
  <Navbar @section="(atSection) => setSection(atSection)"/>

  <TodoList v-if="atSection === 'todo_list'" />
  
  <Movie v-if="atSection === 'movie_app'"/>
</template>

<style scoped></style>
