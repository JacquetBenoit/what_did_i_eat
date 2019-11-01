<template>
  <div class="home">
    <Nav/>
    <img alt="Vue logo" src="../assets/logo.png">
    <Food/>

  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Food from '@/components/Food.vue'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    'Nav': Nav,
    'Food': Food
  },
  methods: {
  }
}
</script>
