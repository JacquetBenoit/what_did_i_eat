<template>
  <div class="home">
    <Nav/>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    Nav
  },
  methods: {
  }
}
</script>
