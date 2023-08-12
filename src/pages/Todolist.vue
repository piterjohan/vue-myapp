<script setup>
import { ref } from 'vue';
import {getStorage, setStorage} from '../utils/localStorage';

const storageName = "todoStorage";
const todoStorage = getStorage(storageName);
// default todo
let todos = ref([{ isDone: false, name: 'Learning vue' }]);

//check in localstorage
if( todoStorage !== null){
  const itemStorage = JSON.parse(todoStorage);
  todos = ref(itemStorage);
}

const generateTodo = ["Golang", 'Flutter', 'Laravel','PHP','TypeScript'];
const randomNumber = Math.floor(Math.random() * generateTodo.length) ;

let todoInput = 'Learning ' + generateTodo[randomNumber];

const submitTodo = (event) => {
  const todoStorage = getStorage(storageName);
  todoInput = '';

  todos.value.push({ isDone: false, name: event.target.value });
  
  if( todoStorage === null){
    setStorage(storageName, todos.value);
    return;
  }

  setStorage(storageName, todos.value);
};

const checkedTodo = () => {
  setStorage(storageName, todos.value);
}

</script>

<template>
  <div class="container">
    <div class="input-todo">
      <input
        type="text"
        :value="todoInput"
        placeholder="Todo List"
        @keyup.enter="submitTodo($event)"
      />
    </div>

    <div class="wrapper-todo">
      <div class="title-todo">
        <h1>Todo List Undone</h1>
      </div>
      <div class="list-todo">
        <ul>
          <template v-for="(todo, index) in todos">
            <li v-if="!todo.isDone" :key="index" :class="{ 'undone-todo': !todo.isDone }" @change.prevent="checkedTodo">
              <input type="checkbox" :id="index" :value="todo.isDone" v-model="todo.isDone" />
              {{ todo.name }}
            </li>
          </template>
          <div class="total-todo">
            <small
              >Total ToDo Undone:
              <b>{{
                todos.filter((x) => {
                  return !x.isDone;
                }).length
              }}</b></small
            >
          </div>
        </ul>
      </div>

      <div class="list-todo">
        <div class="title-todo">
          <h1>Todo List Done</h1>
        </div>
        <ul>
          <template v-for="(todo, index) in todos">
            <li v-if="todo.isDone" :key="index" :class="{ 'done-todo': todo.isDone }">
              <input type="checkbox" :id="index" :value="todo.isDone" v-model="todo.isDone" @change.prevent="checkedTodo"/>
              {{ todo.name }}
            </li>
          </template>
        </ul>
        <div class="total-todo">
          <small
            >Total ToDo Done:
            <b>{{
              todos.filter((x) => {
                return x.isDone;
              }).length
            }}</b></small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: gray;
  display: block;
  text-align: center;
  margin: auto;
  width: 50%;
  padding: 1rem;
}

.input-todo {
  display: block;
  width: 100%;
}
.input-todo > input {
  width: 100%;
  height: 2.5rem;
  text-align: center;
}
.wrapper-todo {
  background: linear-gradient(190deg, #6eba7e, #7aeee7);
  color: black;
}

.undone-todo {
  color: red;
  font-weight: bolder;
}

.done-todo {
  text-decoration: line-through;
}

.list-todo > ul > li {
  list-style: none;
  font-size: 18px;
  text-align: left;
  padding: 0.5rem;
}

.total-todo {
  text-align: center;
  padding: 0.5rem;
}
</style>
