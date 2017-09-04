import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/Todos/TodoPage'
import Expenses from '@/components/Expenses/ExpensesPage'
import Login from '@/components/Login/LoginPage'
import Error404 from '@/components/404/404'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import FirebaseConfig from '@/FirebaseConfig.json'
// Use the router
Vue.use(Router)
// Firebase Stuff
Vue.config.productionTip = false
let firebaseDB = Firebase.initializeApp(FirebaseConfig).database()
let todos = firebaseDB.ref('todos')
Vue.use(VueFire)

export default new Router({
  routes: [
    {
      path: '/todos',
      name: 'TodoPage',
      component: TodoPage,
      props: {todos}
    }, {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '*',
      name: 'Error404',
      component: Error404
    }
  ]
})
