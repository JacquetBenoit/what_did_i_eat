<template>
    <div class="container is-centered has-text-centered">
        <!-- DATE PICKER -->
        <div class="columns is-centered">
            <div class="column">
                <b-datepicker size="is-small" v-model="date"
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
                    </b-field>
                    <!-- -->
                    <!-- CLOCK PICKER -->
                    <b-field label="Select time">
                        <b-clockpicker
                            rounded
                            v-model="time"
                            placeholder="Click to select..."
                            :hour-format="format"
                            editable>

                            <button class="button is-primary"
                                @click="time = new Date()">
                                <b-icon icon="clock"></b-icon>
                                <span>Now</span>
                            </button>

                            <button class="button is-danger"
                                @click="time = null">
                                <b-icon icon="close"></b-icon>
                                <span>Clear</span>
                            </button>
                        </b-clockpicker>
                    </b-field>
                    <button class="button is-primary" @click="addToDay">Add to my day</button>
                </section>
            </div>
            <!-- -->
            <!-- TABS -->
            <div class="column">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="What did you eat ?">
                        <div v-for="item in day" :key="item.id"> 
                            {{item.name}}
                            <a @click="deleteDayItem(item)" class="delete is-small"></a>
                        </div>
                    </b-tab-item>

                    <b-tab-item label="Saved food">
                        <p v-for="food in foods" v-bind:key="food.id">{{food.name}}</p>
                    </b-tab-item>
                </b-tabs>
                <!-- -->
                <!-- FEELING SELECT :'( -->
                <b-field class="has-text-centered" label="How do you feel today ?">
                    <b-select v-model="feeling" placeholder=":()" rounded>
                        <option value="good">Good :)</option>
                        <option value="ok">Ok :|</option>
                        <option value="bad">Bad :(</option>
                    </b-select>
                </b-field>
                <!-- -->
                <b-button v-if="!saved" @click="addDay" type="is-primary">Save day</b-button>
                <b-button v-if="saved" type="">Day is saved</b-button>            
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
        this.getDays();
        this.date.setHours(0,0,0,0);
        localStorage.dayItem? this.day = (JSON.parse(localStorage.dayItem)):null;
        // this.updateDayIfExisting();
    },
    data() {
        return {
            foodName: '',
            foods: [],
            selected: null,
            date: new Date(),
            day: [],
            days: [],
            time: new Date(),
            feeling: '',
            saved: false,

        }
    },
    watch: {
        date: function(){
            this.updateDayIfExisting();
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
        // ADD DAY TO FIREBASE WIP
        addDay() {
            if (!this.saved){
                firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("day")
                .add({
                    foods: this.day,
                    feeling: this.feeling,
                    date: this.date.toString(),
                    saved: true
                })
                this.saved = true;
            }
            this.getDays();
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
        // Get Days
        async getDays() {
            var dayRef = await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("day");

            dayRef.onSnapshot(snap => {
                this.days = [];
                snap.forEach(doc => {
                    var day = doc.data();
                    day.id = doc.id;
                    this.days.push(day);
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
            //ADD FOOD AND TIME TO DAY ARRAY
            addToDay() {
                let foodAndTimeObj = {name:this.selected.name, id:this.selected.id, time:this.time}
                this.day.push(foodAndTimeObj);
                localStorage.dayItem = JSON.stringify(this.day);
            },
            //DELETE DAY ITEM / UPDATE LOCAL STORAGE
            deleteDayItem(item) {
                this.day.splice(this.day.indexOf(item), 1);
                localStorage.dayItem = JSON.stringify(this.day);
            },
            // TEMPORARY FIND EXISTING DAY
            updateDayIfExisting() {
                for (const item of this.days){
                    if (this.date.toString() == item.date){
                        this.day = item.foods;
                        this.saved = item.saved;
                        this.feeling = item.feeling;
                        break;
                } else {
                    this.day = [];
                    this.saved = false;
                    this.feeling = '';
                }
            }
            }
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

.smallBtn
{
    width: 10%;
    height: 10%;
}
</style>