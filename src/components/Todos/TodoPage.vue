<template>
  <v-flex xs12>
    <v-card>
      <v-list two-line>
        <v-list-tile avatar ripple v-for="(todo, index) in todosList" v-bind:key="todo.id">
          <v-list-tile-content>
            <v-list-tile-title>{{ todo.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{todo.deadline}}</v-list-tile-action-text>
            <v-menu bottom right>
              <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-icon class="grey--text text--lighten-1">check</v-icon>
                    Mark Done
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-icon class="grey--text text--lighten-1">edit</v-icon>
                    Edit
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-icon class="grey--text text--lighten-1">delete</v-icon>
                    Delete
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
          <v-divider v-if="index + 1 < todos.length"></v-divider>
        </v-list-tile>
      </v-list>
      <add-todo v-bind:todos="todos"></add-todo>
    </v-card>
  </v-flex>
</template>

<script>
import AddTodo from './AddTodo'
export default {
  components: {
    'add-todo': AddTodo
  },
  props: [
    'todos'
  ],
  firebase: function () {
    return {
      todosList: this.todos
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
