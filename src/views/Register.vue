<template>
  <div class="container">
    <div class="row">
      <h3 class="center-align">Регистрация</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="card-panel teal blue lighten-5">
          <div class="row">
            <Form
              @submit="registerClickHandler"
              :validation-schema="schema"
              class="col s12"
            >
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">person</i>
                  <Field id="last_name" type="text" name="lastName" />
                  <ErrorMessage name="lastName" class="ErrorText" />
                  <label for="last_name">Last Name</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">perm_identity</i>
                  <Field id="first_name" type="text" name="firstName" />
                  <ErrorMessage name="firstName" class="ErrorText" />
                  <label for="first_name">First Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">email</i>
                  <Field id="icon_prefix" type="email" name="email" />
                  <ErrorMessage name="email" class="ErrorText" />
                  <label for="icon_prefix">Email</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">https</i>
                  <Field id="icon_telephone" type="password" name="password" />
                  <ErrorMessage name="password" class="ErrorText" />
                  <label for="icon_telephone">Password</label>
                </div>
                <div class="input-field col m4 s12">
                  <i class="material-icons prefix">directions_run</i>
                  <Field id="start_count" type="text" name="start_count" />
                  <ErrorMessage name="start_count" class="ErrorText" />
                  <label for="start_count">Начало отсчета</label>
                </div>
                <div class="input-field col m4 s12">
                  <i class="material-icons prefix">domain</i>
                  <select
                    ref="select"
                    as="select"
                    name="subdivision"
                    v-model="subdivision"
                  >
                    <option value="ОЭПУЭ">ОЭПУЭ</option>
                    <option value="ОАИИС">ОАИИС</option>
                  </select>
                  <label>Подразделение</label>
                </div>
                <div class="input-field col m4 s12">
                  <i class="material-icons prefix">star_border</i>
                  <Field id="number_id" type="text" name="numberID" />
                  <ErrorMessage name="numberID" class="ErrorText" />
                  <label for="number_id">Индивид. номер</label>
                </div>
              </div>
              <div class="row">
                <div class="offset-s1 col s1">
                  <router-link to="/login" class="link">
                    <i class="material-icons right">keyboard_backspace</i>
                  </router-link>
                </div>
                <div class="col s3 offset-s4 m3 offset-m6">
                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Регистрация
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
    const schema = yup.object({
      lastName: yup.string().required().min(3),
      firstName: yup.string().required().min(3),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      start_count: yup.number().required().min(1),
      numberID: yup.number().required(),
    });
    const subdivision = "ОЭПУЭ";
    return {
      schema,
      subdivision,
    };
  },

  data() {
    return {
      dropdown: null,
    };
  },

  mounted() {
    this.dropdown = M.FormSelect.init(this.$refs.select);
  },

  unmounted() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },

  methods: {
    async registerClickHandler(values) {
      const db = firebase.database();
      await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({
            displayName: `${values.lastName} ${values.firstName}`,
          });
        })
        .then(async () => {
          await db.ref(`/users/${firebase.auth().currentUser.uid}`).set({
            email: firebase.auth().currentUser.email,
            start_count: values.start_count,
            subdivision: this.subdivision,
            date_register: Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(new Date()),
            number_id: values.numberID,
            quantity: "0",
          });
        })
        .then(() => this.$router.push("/home/dashboard"))
        .catch((err) => alert(err.message));
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
