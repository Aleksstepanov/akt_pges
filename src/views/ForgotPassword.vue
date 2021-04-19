<template>
  <div class="container">
    <div class="row">
      <h2 class="center-align">Восстановление пароля</h2>
      <div class="row">
        <div class="col s6 offset-s3">
          <div class="card-panel teal blue lighten-5">
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="email" class="validate" />
                    <label for="icon_prefix">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <router-link to="/" class="link">
                      <i class="material-icons right">keyboard_backspace</i>
                    </router-link>
                  </div>
                  <div class="offset-s5 col s3">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
