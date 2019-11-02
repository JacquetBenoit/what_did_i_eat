<template>
  <div class="home">
    <Nav/>
    <Food/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Day from '@/components/Day.vue'

export default {
  name: 'home',
  components: {
    'Nav': Nav,
    'Food': Day
  },
  methods: {
  }
}
</script>
