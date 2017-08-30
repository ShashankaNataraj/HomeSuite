import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/Todos/TodoPage'
import Hello from '@/components/Hello'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/todos',
      name: 'TodoPage',
      component: TodoPage
    }
  ]
})
