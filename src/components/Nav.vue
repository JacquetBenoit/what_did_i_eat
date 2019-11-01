<template>
<div>
    <template>
        <b-navbar>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <!-- <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    > -->
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item href="#" id="hoverbale-item">
                    Home
                </b-navbar-item>
                <b-navbar-item href="#" id="hoverbale-item">
                    Documentation
                </b-navbar-item>
                <!-- <b-navbar-dropdown label="Info">
                    <b-navbar-item href="#">
                        About
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Contact
                    </b-navbar-item>
                </b-navbar-dropdown> -->
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a v-on:click="logout" class="button is-danger">
                            Logout
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </template>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Nav',
  props: {
    msg: String
  },
  methods: {
      logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hoverable-item:hover {
  background-color: gold;
}
</style>
