<template>
  <div class="container">
    <div class="row">
      <h2 class="center-align">Авторизация</h2>
    </div>
    <div class="row">
      <div class="col s6 offset-s3">
        <div class="card-panel teal blue lighten-5">
          <div class="row">
            <div class="row">
              <Form
                @submit="submitClickHandler"
                :validation-schema="schema"
                class="col s12"
              >
                <div class="row">
                  <div class="input-field col s11">
                    <i class="material-icons prefix">email</i>

                    <Field id="icon_prefix" type="email" name="email" />
                    <ErrorMessage name="email" class="ErrorText" />
                    <label for="icon_prefix">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s11">
                    <i class="material-icons prefix">https</i>
                    <Field
                      id="icon_telephone"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage name="password" class="ErrorText" />
                    <label for="icon_telephone">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="offset-s1 col s4">
                    <router-link to="/forgot_password" class="link"
                      >Забыли пароль?</router-link
                    >
                  </div>
                  <div class="col offset-s3 s3">
                    <button
                      class="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Вход
                      <i class="material-icons right">send</i>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="offset-s1 col">
                    <router-link to="/register" class="link"
                      >Регистрация</router-link
                    >
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
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  setup() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    });

    return {
      schema,
    };
  },

  created() {
    M.AutoInit();
  },

  methods: {
    submitClickHandler(values) {
      const user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
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
