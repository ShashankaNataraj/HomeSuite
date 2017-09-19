<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex row xs12 wrap>
      <v-breadcrumbs row xs12 icons divider="forward">
        <v-breadcrumbs-item
          v-for="path in currentUserPath" :key="path"
        >
          {{ path }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-flex>
    <v-flex xs12 sm12 column v-if="!isBookSelected">
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
    <v-flex xs12 sm12 column v-if="isBookSelected && !isPageSelected">
      <v-card row class="purple white--text">
        <v-list>
          <v-subheader>
            <v-icon>
              page
            </v-icon>
            Pages
          </v-subheader>
          <v-divider></v-divider>
          <v-list-tile avatar v-for="note in notesInCurrentBook" v-bind:key="note.title" v-bind:class="selectedBookKey === note['.key']?'deep-purple lighten-4':''" @click="selectPage(note)">
            <v-list-tile-content>
              <v-list-tile v-text="note.title"></v-list-tile>
            </v-list-tile-content>
          </v-list-tile>
          <v-footer v-bind:class="[isAddingPage?'footer-adding-book':'footer-normal']">
            <v-flex xs12>
              <v-spacer v-if="!isAddingPage"></v-spacer>
              <v-btn flat outline block secondary @click="addNewPage()" v-if="!isAddingPage">
                <v-icon>
                  add
                </v-icon>Add New Page
              </v-btn>
              <div v-if="isAddingPage" row wrap>
                <v-text-field label="New Page Name" column width="50px" v-model="newPageName"></v-text-field>
                <v-btn @click="savePageNameToBook()">
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
    <v-flex xs12 sm12 column v-if="isBookSelected && isPageSelected">
      <v-layout row>
        <v-flex column xs12 lg6>
          <v-card row>
            <v-text-field
              label="Markdown"
              multi-line
              v-model="currentPageMarkdown"
              auto-grow
            ></v-text-field>
          </v-card>
          <v-card>
            <v-btn @click="savePageToBook()">
              <v-icon>save</v-icon>Save
            </v-btn>
          </v-card>
        </v-flex>
        <v-flex column xs12 lg6>
          <v-card row>
            <div column v-html="compiledMarkdown"></div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import Note from './Note'
import marked from 'marked'
export default {
  methods: {
    addNewBook () {
      this.isAddingBook = true
    },
    addNewPage () {
      this.isAddingPage = true
    },
    saveBookName () {
      this.isAddingBook = false
      this.books.push({
        title: this.newBookName
      })
      this.newBookName = ''
    },
    savePageNameToBook () {
      this.isAddingPage = false
      let currentBook = {...this.getCurrentSelectedBook()}
      let currentPages = currentBook['pages'] || []
      let newPageObj = {
        title: this.newPageName,
        md: '# Hello there!'
      }
      currentPages.push(newPageObj)
      currentBook['pages'] = currentPages
      this.updateBook(currentBook)
      this.newPageName = ''
    },
    savePageToBook () {
      this.isAddingPage = false
      let currentBook = {...this.getCurrentSelectedBook()}
      let currentPage = currentBook['pages']
        .find(page => page.title === this.selectedPageName.title, this)
      currentPage.md = this.currentPageMarkdown
      this.updateBook(currentBook)
    },
    updateBook (book) { // Accepts Updates a book object with the passed book
      let currentSelectedBookObj = this.getCurrentSelectedBook()
      let relevantBookKey = currentSelectedBookObj['.key']
      delete book['.key']
      this.books.child(relevantBookKey).set(book)
    },
    selectBook (book) { // Triggers selection of a book on the UI by setting internal vars
      this.currentUserPath.push(book.title)
      this.selectedBookKey = book['.key']
    },
    selectPage (page) {
      this.currentUserPath.push(page.title)
      this.selectedPageName = page
      this.currentPageMarkdown = page.md
    },
    getCurrentSelectedBook () {
      return this.booksList
              .find(book => book['.key'] === this.selectedBookKey, this)
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
      return marked(this.currentPageMarkdown, { sanitize: true })
    },
    notesInCurrentBook () {
      let pages
      if (this.booksList.length > 0) {
        let currentBook = this.getCurrentSelectedBook()
        if (currentBook) {
          pages = currentBook['pages']
        }
      }
      return pages || []
    },
    isBookSelected () {
      return this.selectedBookKey !== ''
    },
    isPageSelected () {
      return this.selectedBookKey !== '' && this.selectedPageName !== ''
    }
  },
  data () {
    return {
      isAddingBook: false, // Is the user in new book adding mode? Book add form is toggled based on this flag
      isAddingPage: false, // Same as isAddingBook, but for pages
      newBookName: '', // New book name being entered by the user
      newPageName: '', // New page name being entered by the user
      selectedBookKey: '', // Current clicked books key
      selectedPageName: '', // Current clicked page name
      currentPageMarkdown: '# hello', // Current markdown text being edited
      currentUserPath: [] // Tracks users selections on the screen mainly to show breadcrumbs
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
