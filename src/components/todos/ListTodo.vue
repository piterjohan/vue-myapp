<script setup>
defineProps(['todos', 'eventCBName','isDone']);
</script>

<template>
  <ul>
    <template v-for="(todo, index) in todos">
      <li
        v-if="todo.isDone == isDone"
        :key="index"
        :class="{ 'undone-todo': todo.isDone == isDone}"
        @change="$emit(eventCBName)"
      >
        {{todo.isDone}}
        <input type="checkbox" :id="index" :value="todo.isDone" v-model="todo.isDone" />
        {{ todo.name }}
      </li>
    </template>
    <div class="total-todo">
      <small
        >Total ToDo Undone:
        <b>{{
          todos.filter((x) => {
            return x.isDone == isDone;
          }).length
        }}</b></small
      >
    </div>
  </ul>
</template>
