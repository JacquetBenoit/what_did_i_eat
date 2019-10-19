<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <h2 class="has-text-weight-bold">Login</h2>
                <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Email">
                </div>
                </div>

                <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Password">
                </div>
                </div>

                <button class="button is-primary">Submit</button> 
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'login',
    data() {
        return {
            
        }
    },
    methods: {

    },
}
</script>