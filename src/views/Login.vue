<template>
  <div class="container" v-if="!isLoader">
    <div class="row">
      <h3 class="center-align">Авторизация</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="card-panel teal blue lighten-5">
          <div class="row">
            <div class="row">
              <Form
                @submit="loginClickHandler"
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
                  <div class="col s3 offset-s3">
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
  <div class="container" v-else>
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  name: "Login",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  setup() {
    const isLoader = false;
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    });

    return {
      schema,
      isLoader,
    };
  },

  methods: {
    async loginClickHandler(values) {
      this.isLoader = true;
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          this.isLoader = false;
        })
        // .then(async () => {
        //   const db = await firebase.database();
        //   const { uid } = await firebase.auth().currentUser;
        //   db.ref(`users/${uid}`).on("value", async (snapshot) => {
        //     const data = await snapshot.val();
        //     localStorage.setItem("AKT_PGES", JSON.stringify(data));
        //   });
        // })
        .then(() => this.$router.push("/home/dashboard"))
        .catch((err) => {
          M.toast({ html: `${err.message}` });
        });
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
