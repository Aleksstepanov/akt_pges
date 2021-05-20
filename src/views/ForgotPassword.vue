<template>
  <div class="container">
    <div class="row">
      <h3 class="center-align">Восстановление пароля</h3>
      <div class="row">
        <div class="col s12">
          <div class="card-panel teal blue lighten-5">
            <div class="row">
              <Form
                class="col s12"
                @submit="submitClickHandler"
                :validation-schema="schema"
              >
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <Field id="icon_prefix" type="email" name="email" />
                    <ErrorMessage name="email" class="ErrorText" />
                    <label for="icon_prefix">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <router-link to="/login" class="link">
                      <i class="material-icons right">keyboard_backspace</i>
                    </router-link>
                  </div>
                  <div class="col s3">
                    <button
                      class="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Восстановить
                      <i class="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ForgotPassword",
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  setup() {
    const schema = yup.object({
      email: yup.string().required().email(),
    });

    return {
      schema,
    };
  },

  methods: {
    submitClickHandler(values) {
      console.log(values.email);
    },
  },
};
</script>

<style lang="scss" scouped>
.ErrorText {
  margin-left: 45px;
  color: red;
}
</style>
