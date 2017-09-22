// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
// import FirebaseConfig from '@/FirebaseConfig.json'
import App from './App'
import RouterObj from './router'
import Firebase from 'firebase'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

let provider = new Firebase.auth.GoogleAuthProvider()
Vue.use(Vuetify)
Firebase.auth().onAuthStateChanged((user) => {
  function renderApp () {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router: RouterObj.router,
      template: '<App/>',
      components: { App }
    })
  }
  if (user) {
    // User is signed in.
    renderApp(user)
  } else {
    Firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      renderApp(result.user)
    })
  }
})
