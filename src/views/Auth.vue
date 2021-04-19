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
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s6 offset-s3">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="email" class="validate" />
                    <label for="icon_prefix">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6 offset-s3">
                    <i class="material-icons prefix">https</i>
                    <input
                      id="icon_telephone"
                      type="password"
                      class="validate"
                    />
                    <label for="icon_telephone">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="offset-s2 col s3">
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
                  <div class="offset-s2 col">
                    <router-link to="/register" class="link"
                      >Регистрация</router-link
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";

export default {
  name: "Auth",
  components: {},
  created() {
    M.AutoInit();
  },
};
</script>
