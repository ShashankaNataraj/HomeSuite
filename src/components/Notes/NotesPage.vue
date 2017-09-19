<template>
  <v-layout row text-xs-center>
    <v-flex xs3 sm3 column offset-xs1>
      <v-card row class="purple white--text">
        <v-list>
          <v-subheader>
            <v-icon>
              book
            </v-icon>
            Books
          </v-subheader>
          <v-divider></v-divider>
          <v-list-tile avatar v-for="note in booksList" v-bind:key="note.title" v-bind:class="selectedBookKey === note['.key']?'deep-purple lighten-4':''" @click="selectBook(note)">
            <v-list-tile-content>
              <v-list-tile v-text="note.title"></v-list-tile>
            </v-list-tile-content>
          </v-list-tile>
          <v-footer v-bind:class="[isAddingBook?'footer-adding-book':'footer-normal']">
            <v-flex xs12>
              <v-spacer v-if="!isAddingBook"></v-spacer>
              <v-btn flat outline block secondary @click="addNewBook()" v-if="!isAddingBook">
                <v-icon>
                  add
                </v-icon>Add New Book
              </v-btn>
              <div v-if="isAddingBook" row wrap>
                <v-text-field label="New Book Name" column width="50px" v-model="newBookName"></v-text-field>
                <v-btn @click="saveBookName()">
                  <v-icon>
                    check
                  </v-icon>
                  Save
                </v-btn>
              </div>
            </v-flex>
          </v-footer>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs7 sm7 column>
      <v-card>
          <textarea :value="currentNoteMarkdown" @input="update"></textarea>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Note from './Note'
import marked from 'marked'
import _ from 'lodash'
export default {
  methods: {
    update: _.debounce(function (e) {
      this.currentNoteMarkdown = e.target.value
    }, 300),
    addNewBook () {
      this.isAddingBook = true
    },
    saveBookName () {
      this.isAddingBook = false
      this.books.push({
        title: this.newBookName
      })
      this.newBookName = ''
    },
    selectBook (note) {
      this.selectedBookKey = note['.key']
    }
  },
  components: {
    'note': Note
  },
  props: ['books'],
  firebase () {
    return {
      booksList: this.books
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.currentNoteMarkdown, { sanitize: true })
    }
  },
  data () {
    return {
      isAddingBook: false,
      newBookName: '',
      selectedBookKey: '',
      currentNoteMarkdown: '# hello'
    }
  }
}
</script>

<style>
.footer-adding-book {
  height: 140px;
  padding-top:50px;
}
.footer-normal {
  height:50px;
}
</style>
