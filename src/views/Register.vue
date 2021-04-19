<template>
  <div class="container">
    <div class="row">
      <h2 class="center-align">Регистрация</h2>
    </div>
    <div class="row">
      <div class="col s6 offset-s3">
        <div class="card-panel teal blue lighten-5">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="last_name" type="text" class="validate" />
                  <label for="last_name">Last Name</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">perm_identity</i>
                  <input id="first_name" type="text" class="validate" />
                  <label for="first_name">First Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">email</i>
                  <input id="icon_prefix" type="email" class="validate" />
                  <label for="icon_prefix">Email</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">https</i>
                  <input id="icon_telephone" type="password" class="validate" />
                  <label for="icon_telephone">Password</label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <router-link to="/login" class="link">
                    <i class="material-icons right">keyboard_backspace</i>
                  </router-link>
                </div>
                <div class="offset-s5 col s3">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
