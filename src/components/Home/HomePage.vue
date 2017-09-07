<template>
  <v-app standalone>
    <main>
      <v-container
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card class="blue-grey darken-2 white--text">
              <v-card-title primary-title>
                <div class="headline">Todos</div>
                <div>You have {{pendingTasksRef.length}} pending tasks and {{completedTodosRef.length}} finished tasks</div>
              </v-card-title>
              <v-card-actions class="text-xl-right">
                  <router-link :to="'/todos'" class="white--text">
                    <v-btn>View list</v-btn>
                  </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="cyan darken-2 white--text">
              <v-card-title primary-title>
                <div class="headline">Expenses</div>
                <div>You have {{expensesRef.length}} expenses logged this month</div>
              </v-card-title>
              <v-card-actions>
                  <router-link :to="'/expenses'" class="white--text">
                    <v-btn>View list</v-btn>
                  </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="purple darken-2 white--text">
              <v-card-title primary-title>
                <div class="headline">Notes</div>
                <div>You have {{notesRef.length}} active notes and {{archivedNotesRef.length}} archived notes in firebase</div>
              </v-card-title>
              <v-card-actions>
                  <router-link :to="'/expenses'" class="white--text">
                    <v-btn>View list</v-btn>
                  </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>
content_copy


<script>
export default {
  props: [
    'todos',
    'completedTodos',
    'expenses',
    'notes',
    'archivedNotes'
  ],
  firebase () {
    return {
      pendingTasksRef: this.todos,
      completedTodosRef: this.completedTodos,
      expensesRef: this.expenses,
      notesRef: this.notes,
      archivedNotesRef: this.archivedNotes
    }
  }
}
</script>

<style>

</style>
