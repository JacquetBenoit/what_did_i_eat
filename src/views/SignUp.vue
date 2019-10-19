<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
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
                
                <button v-on:click="signUp" class="button is-primary">Submit</button> 
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