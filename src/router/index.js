import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/Todos/TodoPage'
import Expenses from '@/components/Expenses/ExpensesPage'
import Login from '@/components/Login/LoginPage'
import Home from '@/components/Home/HomePage'
import Error404 from '@/components/404/404'
import Notes from '@/components/Notes/NotesPage'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import FirebaseConfig from '@/FirebaseConfig.json'

// Use the router
Vue.use(Router)
// Firebase Stuff
Vue.config.productionTip = false
let firebaseDB = Firebase.initializeApp(FirebaseConfig).database()
let todos = firebaseDB.ref('todos')
let completedTodos = firebaseDB.ref('completed')
let expenses = firebaseDB.ref('expenses')
let books = firebaseDB.ref('books')
Vue.use(VueFire)
export default {
  router: new Router({
    routes: [
      {
        path: '/todos',
        name: 'TodoPage',
        component: TodoPage,
        props: { todos, completedTodos }
      }, {
        path: '/expenses',
        name: 'Expenses',
        component: Expenses
      }, {
        path: '/login',
        name: 'Login',
        component: Login
      }, {
        path: '/',
        name: 'Home',
        component: Home,
        props: {todos, completedTodos, expenses, books}
      }, {
        path: '/notes',
        name: 'notes',
        component: Notes,
        props: {books}
      }, {
        path: '*',
        name: 'Error404',
        component: Error404
      }
    ]
  })
}
