<script setup>
const routes = [
  { name: 'Todo', url: '/todo' },
  { name: 'Movie', url: '/movie' },
];
const appName = import.meta.env.VITE_APP_NAME;
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">{{ appName }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="bi bi-list"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <template v-for="(item, index) in routes" :key="index">
            <li class="nav-item">
                <router-link :to="item.url" class="nav-link active" aria-current="page">{{
                  item.name
                }}
                </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <nav></nav>
</template>

<style scoped>
.navbar{
  background-color: #3c3c3c !important;
}

.navbar .navbar-brand{
  color: white;
}

.navbar .navbar-toggler{
  border: 1px solid transparent;
  color: white;
}

.navbar-nav .nav-item > a {
  display: flex;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

.navbar-nav .nav-item > a:hover {
  color: #1d5d9b;
}
</style>
