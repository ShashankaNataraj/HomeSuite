<template>
  <v-app light>
    <v-navigation-drawer
      temporary
      :clipped="clipped"
      v-model="drawer"
      :right="right"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :hidden="toolbarHidden">
      <v-toolbar-title>
        <router-link to="/" class="home-link">Home Suite</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="text-xl-right" @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <v-container grid-list-xs fluid>
          <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'list', title: 'Todos' },
          { icon: 'attach_money', title: 'Expenses' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        toolbarHidden: false
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  .home-link{
    text-decoration: none;
  }
</style>
