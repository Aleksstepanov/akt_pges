<template>
  <div class="row">
    <Form
      @submit="btnAddClickHandler"
      :validation-schema="schema"
      class="col s12"
    >
      <div class="row">
        <div class="input-field col s6">
          <Field placeholder="Объект" id="new_akt" type="text" name="new_akt" />
          <ErrorMessage name="new_akt" class="ErrorText" />
          <label for="new_akt">Новый акт</label>
        </div>
      </div>
      <div class="row">
        <input
          type="text"
          class="datepicker col s2"
          ref="datepicker"
          name="date"
        />
        <ErrorMessage name="date" class="ErrorText" />
        <button type="submit" class="col s3 btn offset-s1">Добавить</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";
import datapickerConfig from "../config/datapicker.config.js";

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
    };
  },

  created() {
    this.akts = JSON.parse(localStorage.getItem("AKT_PGES_AKTS"));
  },

  mounted() {
    M.Datepicker.init(this.$refs.datepicker, datapickerConfig);
  },

  methods: {
    async btnAddClickHandler(values) {
      const newAkt = {
        date_akt: values.date,
        date_create_record: new Date(),
        number_akt: "",
        object: values.new_akt,
      };
      console.log(Object.values(this.akts[this.lastYear][this.lastAkt]));
      console.log(this.akts[this.lastYear][this.lastAkt]);
      console.log(newAkt);
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
};
</script>

<style></style>
