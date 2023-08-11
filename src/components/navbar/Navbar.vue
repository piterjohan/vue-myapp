<script setup>
const navLink = [
  { name: 'todo_list', original_name: 'Todo List App' },
  { name: 'movie_app', original_name: 'Movie App' }
];
</script>

<template>
  <nav>
    <a href="#" v-for="(item, index) in navLink" :key="index" 
    @click="$emit('section', item.name)">
      {{ item.original_name }}
    </a>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

nav > a {
  display: flex;
  background-color: #78f3f3;
  color: black;
  text-decoration: none;
  font-size: 18px;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

nav > a:hover {
  color: #1d5d9b;
}
</style>
