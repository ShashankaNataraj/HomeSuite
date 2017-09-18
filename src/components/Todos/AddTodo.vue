<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-btn absolute slot="activator" dark fab right hover class="pink">
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <v-toolbar dark class="primary">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add a new Todo item</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="onSave">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="Name" v-model="name" :rules="nameRules" :counter="true" required></v-text-field>
            <v-text-field label="Description" v-model="description" :rules="descriptionRules" :counter="true" required></v-text-field>
            <v-flex md12 lg4 class="hidden-lg-only">
              <v-date-picker v-model="deadline"></v-date-picker>
            </v-flex>
            <v-flex md12 lg4 class="hidden-md-and-down">
              <v-date-picker v-model="deadline" landscape></v-date-picker>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-snackbar :timeout="timeout" :error="context === 'error'" :success="context === 'success'" primary v-model="snackbar">
      {{snackbarMessage}}
    </v-snackbar>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['todos'],
  methods: {
    onSave () {
      if (this.name.trim() === '' || this.description.trim() === '' || this.deadline === '') {
        this.context = 'error'
        this.snackbar = true
        this.snackbarMessage = 'Correct all invalid values before proceeding'
        return false
      } else {
        this.context = 'success'
        this.snackbarMessage = 'Todo item saved successfully'
        this.dialog = false
        this.snackbar = true
        this.todos.push({
          name: this.name,
          description: this.description,
          deadline: this.deadline
        })
      }
    }
  },
  data () {
    return {
      name: '',
      description: '',
      categories: [],
      deadline: moment().format('YYYY-MM-DD'),
      dialog: false,
      valid: false,
      snackbar: false,
      timeout: 5000,
      context: 'error',
      snackbarMessage: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      descriptionRules: [
        (v) => !!v || 'Description is required',
        (v) => v.length <= 10 || 'Description must be less than 10 characters'
      ]
    }
  }
}
</script>

<style>

</style>
