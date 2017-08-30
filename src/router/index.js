import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/Todos/TodoPage'
import Expenses from '@/components/Expenses/ExpensesPage'
import Login from '@/components/Login/LoginPage'
import Error404 from '@/components/404/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/todos',
      name: 'TodoPage',
      component: TodoPage
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
