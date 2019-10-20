<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <h2 class="has-text-weight-bold">Login</h2>
                <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="email" class="input" type="text" placeholder="Email">
                </div>
                </div>

                <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="password" class="input" type="password" placeholder="Password">
                </div>
                </div>

                <button v-on:click="login" v-on:keyup.enter="login" class="button is-primary">Login</button> 
            </div>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                function(user){
                    // ERREUR this is undefined a fixer pour redirection
                    this.$router.replace('home')
                },
                function(err){
                    alert('Oops. ' + err.message)
                }
            )
        },

    },
}
</script>