<template>
  <div>
    <v-card>
      <v-list two-line>
          <v-list-tile avatar ripple v-for="(todo, index) in todos" v-bind:key="todo.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ todo.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text text--darken-4">{{ todo.headline }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon class="grey--text text--lighten-1">star_border</v-icon>
            </v-list-tile-action>
            <v-divider v-if="index + 1 < todo.length"></v-divider>
          </v-list-tile>
        </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    'todos'
  ],
  created () {

  }
}
</script>

<style>

</style>
