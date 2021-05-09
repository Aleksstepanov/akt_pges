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
  mounted() {
    M.Datepicker.init(this.$refs.datepicker, datapickerConfig);
  },
  methods: {
    async btnAddClickHandler() {
      const snapshotAkts = JSON.parse(localStorage.getItem("AKT_PGES_AKTS"));
      const year = new Date().getFullYear();
      const akts = snapshotAkts[year.toString()];

      console.log(akts);
    },
  },
};
</script>

<style></style>
