<template>
  <div>
    <todo-list v-bind:todos="firebaseTodos"></todo-list>
  </div>
</template>

<script>
import TodoList from './TodoList'
export default {
  props: [
    'todos'
  ],
  components: {
    'todo-list': TodoList
  },
  firebase: function () {
    return {
      firebaseTodos: this.todos
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
