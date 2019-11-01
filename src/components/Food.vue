<template>
    <div class="container is-centered">
        <div class="columns is-mobile is-centered">
            <div class="cloumn is-half ">
                    <b-datepicker v-model="dateNow" 
                        inline 
                        >
                    </b-datepicker>
            </div>
            <div class="column is-two-fifths">
                <section>
                    <p class="content"><b>Selected:</b> {{ selected }}</p>
                    <b-field label="Find or add food">
                        <b-autocomplete
                            v-model="foodName"
                            ref="autocomplete"
                            :data="filteredDataArray"
                            field="name"
                            placeholder="e.g. Orange"
                            @select="option => selected = option">
                            <template slot="header">
                                <a @click="showAddFruit">
                                    <span> Add new... </span>
                                </a> 
                            </template>
                            <template slot="empty">No results for {{foodName}}</template>
                        </b-autocomplete>
                    </b-field>
                </section>
            </div>
        </div>  
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Food',
    created() {
        this.getFoods();
    },
    data() {
        return {
            foodName: '',
            foods: [],
            selected: null,
            dateNow: new Date(),

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
        },
        showAddFruit() {
                this.$buefy.dialog.prompt({
                    message: `Food`,
                    inputAttrs: {
                        placeholder: 'e.g. Watermelon',
                        maxlength: 50,
                        value: this.foodName
                    },
                    confirmText: 'Add',
                    onConfirm: (value) => {
                        this.$refs.autocomplete.setSelected(value);
                        this.addFood();
                    }
                })
            },
        },

    computed: {
        filteredDataArray() {
                return this.foods.filter((option) => {
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.foodName.toLowerCase()) >= 0
                })
            },
    }
}
</script>

<style>
</style>