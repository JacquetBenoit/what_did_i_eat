<template>
    <div class="container is-centered has-text-centered">
        <!-- DATE PICKER -->
        <div class="columns is-centered">
            <div class="column">
                    <b-datepicker size="is-small" v-model="dateNow" 
                        inline>
                    </b-datepicker>
            </div>
            <!-- -->
            <!-- AUTOCOMPLETE SELECT -->
            <div class="column is-mobile">
                <section>
                    <p class="content"><b>Selected:</b> {{ selected }}</p>
                    <b-field label="Find or add food">
                        <b-autocomplete
                            rounded
                            v-model="foodName"
                            ref="autocomplete"
                            :data="filteredDataArray"
                            field="name"
                            placeholder="e.g. Orange"
                            @select="option => selected = option">
                            <template slot="header">
                                <a @click="showAddFood">
                                    <span> Add new... </span>
                                </a> 
                            </template>
                            <template slot="empty">No results for {{foodName}}</template>
                        </b-autocomplete>
                        <!-- -->
                    <!-- SELECT TIME -->
                    </b-field>
                    <b-field label="Select time">
                        <b-clockpicker
                            rounded
                            placeholder="Click to select..."
                            icon="clock"
                            :hour-format="format"
                            editable>
                        </b-clockpicker>
                    </b-field>
                    <b-button type="is-primary">Add to my day</b-button>
                </section>
            </div>
            <!-- -->
            <!-- TABS -->
            <div class="column">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="What did you eat ?">
                    Lorem ipsum dolor sit amet.
                    </b-tab-item>

                    <b-tab-item :visible="showBooks" label="Saved food">
                        <p v-for="food in foods" v-bind:key="food.id">{{food.name}}</p>
                    </b-tab-item>
                </b-tabs>
                <!-- -->
                <!-- FEELING SELECT :'( -->
                <b-field class="has-text-centered" label="How do you feel today ?">
                    <b-select placeholder=":()" rounded>
                        <option value="good">Good :)</option>
                        <option value="ok">Ok :|</option>
                        <option value="bad">Bad :(</option>
                    </b-select>
                </b-field>
                <!-- -->
                <b-button type="is-info">Save day</b-button>                  
            </div>
        </div>  
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Day',
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
        // ADD FOOD ITEM TO FIREBASE
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
        // GET FOOD ITEMS FROM FIREBASE
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

        // SHOW MODAL AND FIELD TO ADD NEW FOOD
        showAddFood() {
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
        //FILTER THE FOOD ARRAY ON OBJECT NAME AND RETURN FOOD OBJECT
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
.dropdown.is-inline .dropdown-menu {
    display: block;
}

.control {
    text-align: center;
}


</style>