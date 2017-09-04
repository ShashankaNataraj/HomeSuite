<template>
    <v-flex xs12>
      <v-card>
        <v-list two-line>
          <v-list-tile avatar ripple v-for="(todo, index) in todosList" v-bind:key="todo.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ todo.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="grey--text text--darken-4">{{ todo.deadline }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>asd</v-list-tile-action-text>
              <v-icon class="grey--text text--lighten-1">star_border</v-icon>
            </v-list-tile-action>
            <v-divider v-if="index + 1 < todos.length"></v-divider>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</template>

<script>
export default {
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
