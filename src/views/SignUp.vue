<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <router-link to="/login">Login</router-link> |
                <router-link to="/sign-up">Sign-up</router-link>               
                <h2 class="has-text-weight-bold">Sign-Up</h2>
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
                
                <b-button type="is-success" v-on:click="signUp" v-on:keyup.enter="signUp">Submit</b-button>
            </div>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name: 'SignUp',
    data() {
        return {
            email: '',
            password: ''
            
        }
    },
    methods: {
        signUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function (user) {
                    alert('Your Account has been created !')
                },
                function (err) {
                    alert('Oops. ' + err.message)
                }
            );
        },

    },
}
</script>