<template>
  <div class="row">
    <Form
      @submit="btnAddClickHandler"
      :validation-schema="schema"
      class="col s12"
    >
      <div class="row">
        <div class="input-field col m6 s12">
          <Field placeholder="Объект" id="new_akt" type="text" name="new_akt" />
          <ErrorMessage name="new_akt" class="ErrorText" />
          <label for="new_akt">Новый акт</label>
        </div>
      </div>
      <div class="row">
        <input
          type="text"
          class="datepicker col m2 s6"
          ref="datepicker"
          name="date"
        />
        <ErrorMessage name="date" class="ErrorText" />
        <button type="submit" class="col m3 s5 btn offset-s1 offset-m1">
          Добавить
        </button>
      </div>
      <div class="row" v-if="createRecord">
        <h4>{{ numberAkt }}</h4>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";
import datapickerConfig from "../config/datapicker.config.js";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  name: "Add",

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  setup() {
    const schema = yup.object({
      new_akt: yup.string().required().min(6),
      date: yup.string().required(),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      akts: null,
      user: null,
      createRecord: false,
      dateAkt: "",
      quantity: 0,
      datapicker: null,
      numberAkt: null,
    };
  },

  created() {
    this.akts = JSON.parse(localStorage.getItem("AKT_PGES_AKTS"));
    this.user = JSON.parse(localStorage.getItem("AKT_PGES_USER"));
  },

  mounted() {
    this.datapicker = M.Datepicker.init(
      this.$refs.datepicker,
      datapickerConfig
    );
  },

  methods: {
    async btnAddClickHandler(values) {
      console.log(this.datapicker.date);
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}`)
        .on("value", async (snapshot) => {
          const data = snapshot.val();
          const { quantity } = data;
          this.quantity = +quantity;
        });

      const { number_id, start_count, subdivision } = this.user;
      const newNumberAkt = this.quantity === 0 ? start_count : this.lastAkt + 1;
      this.numberAkt = `Д-${subdivision}-${number_id}-${new Date().getFullYear()}-${newNumberAkt}`;
      const newAkt = {
        dateCreateAkt: Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(this.datapicker.date),
        dateCreateRecord: Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
        object: values.new_akt,
        numberAkt: this.numberAkt,
      };

      if (this.quantity === 0) {
        await firebase
          .database()
          .ref(
            `akts/${
              firebase.auth().currentUser.uid
            }/${new Date().getFullYear()}/${this.user.start_count}/`
          )
          .set(newAkt);

        this.akts = {
          [new Date().getFullYear()]: {
            [this.user.start_count]: newAkt,
          },
        };
        localStorage.setItem("AKT_PGES_AKTS", JSON.stringify(this.akts));
      } else {
        await firebase
          .database()
          .ref(
            `akts/${firebase.auth().currentUser.uid}/${this.lastYear}/${
              this.lastAkt + 1
            }`
          )
          .set(newAkt);
        Object.assign(this.akts[this.lastYear], { [this.lastAkt + 1]: newAkt });
        localStorage.setItem("AKT_PGES_AKTS", JSON.stringify(this.akts));
      }
      this.quantity += 1;
      this.createRecord = true;
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}`)
        .update({ quantity: this.quantity.toString() });
    },

    maxElem(arr) {
      return arr.reduce(
        (acc, elem) => (elem > acc ? (acc = elem) : acc),
        arr[0]
      );
    },

    stringToNumberOfArray(arr) {
      return arr.map((el) => (el = +el));
    },
  },

  computed: {
    getArrayOfYears() {
      return Object.keys(this.akts);
    },

    lastYear() {
      return this.maxElem(this.stringToNumberOfArray(this.getArrayOfYears));
    },

    getArrayOfAkts() {
      return Object.keys(this.akts[this.lastYear]);
    },

    lastAkt() {
      return this.maxElem(this.stringToNumberOfArray(this.getArrayOfAkts));
    },
  },

  unmounted() {
    if (this.datapicker && this.datapicker.destroy) {
      this.datapicker.destroy();
    }
  },
};
</script>

<style></style>
