<script setup>
import { ref } from 'vue';
import { getStorage, setStorage } from '../utils/localStorage';
import ListTodoComponent from '../components/todos/ListTodo.vue';

const storageName = 'todoStorage';
const todoStorage = getStorage(storageName);
// default todo
let todos = ref([{ isDone: false, name: 'Learning vue' }]);

//check in localstorage
if (todoStorage !== null) {
  const itemStorage = JSON.parse(todoStorage);
  todos = ref(itemStorage);
}

const generateTodo = ['Golang', 'Flutter', 'Laravel', 'PHP', 'TypeScript'];
const randomNumber = Math.floor(Math.random() * generateTodo.length);
let todoInput = ref('Learning ' + generateTodo[randomNumber]);

const submitTodo = (event) => {
  console.log('trigger submitTodo');
  todoInput.value = "";

  const todoStorage = getStorage(storageName);

  todos.value.push({ isDone: false, name: event.target.value });

  if (todoStorage === null) {
    setStorage(storageName, todos.value);
    return;
  }

  setStorage(storageName, todos.value);
};

const checkedTodo = () => {
  console.log('trigger checkedTodo');
  setStorage(storageName, todos.value);
};

const deleteTodo = (index) => {
  console.log('trigger deleteTodo');
  todos.value.splice(index,1);
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
        <ListTodoComponent
          :todos="todos"
          @checked-event="checkedTodo"
          @delete-todo="deleteTodo"
          eventCBName="checkedEvent"
          :isDone="false"
        />
      </div>

      <div class="list-todo">
        <div class="title-todo">
          <h1>Todo List Done</h1>
        </div>
        <ListTodoComponent
          :todos="todos"
          @checked-event="checkedTodo"
          @delete-todo="deleteTodo"
          eventCBName="checkedEvent"
          :isDone="true"
        />
      </div>
    </div>
  </div>
</template>

<style>
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

.todo-delete{
  background:red;
  border: 1px solid gray;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  padding: 0.25rem;
}

.total-todo {
  text-align: center;
  padding: 0.5rem;
}
</style>
