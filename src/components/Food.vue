<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <div class="field">
                    <label class="label">add food</label>
                    <div class="control">
                        <input class="input" v-model="foodName" type="text" placeholder="Text input">
                    </div>
                </div>
                <b-button v-on:click="addFood">Add</b-button>
            </div>
        </div>  
            <li  v-for="food in foods" :key="food.id"><br/>
                {{food.name}}
            </li>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Food',
    data() {
        return {
            foodName: '',
            foods: []
        }
    },
    methods: {
        addFood() {
            firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("food")
            .add({
                name: this.foodName,
                createdAt: new Date(),
            })
        },

        async getFoods() {
            var foodsRef = await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("food");

            foodsRef.onSnapshot(snap => {
                this.foods = [];
                snap.forEach(doc => {
                    var food = doc.data();
                    food.id = doc.id;
                    this.foods.push(food);
                })
            })
        }
    },
    created() {
        this.getFoods();
    },
}
</script>

<style>
</style>