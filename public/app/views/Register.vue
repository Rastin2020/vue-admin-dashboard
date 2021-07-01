<template>
  <div>
    <Headercomp righttext="REGISTER" lefttext="LOG IN"></Headercomp>

    <div class="main-container">

      <h1>Register</h1>
      <br>

      <div class="two-third form-page">
        <label for="register_login">Username</label>
        <br>
        <input v-on:keyup.enter="register(); scroll('error');" class="form-input full-width" type="text" 
          name="register_username" v-model="registerUsername">
        <br><br>
        <label for="register_email">Email</label>
        <br>
        <input v-on:keyup.enter="register(); scroll('error');" class="form-input full-width" type="email" 
          name="register_email" v-model="registerEmail">
        <br><br>
        <label for="register_password">Password</label>
        <br>
        <input v-on:keyup.enter="register(); scroll('error');" class="form-input full-width" type="password" 
          name="register_password" autocomplete="off" v-model="registerPassword">
        <br><br>
        <label for="register_password_confirm">Confirm Password</label>
        <br>
        <input v-on:keyup.enter="register(); scroll('error');" class="form-input full-width" type="password" 
          name="register_password_confirm" 
         autocomplete="off" v-model="registerPasswordConfirm">
        <br><br>
        <p class="text-wrap high-line">Password must be at least twelve characters long, contain a number and 
          special character <span class="input-hints-format">
          ( ! " ? $ % ^ & )<span></p>
        <br>
        <button v-on:click="register(); scroll('error');" name="submit" class="main-button no-vertical-padding">
          Register</button>
        <br><br>
        
        <div v-if="errorMessage !== ''" class="alerts-area" ref="error">
          {{errorMessage}}
        </div>
        <div v-if="successMessage !== ''" class="success-area" ref="error">
          {{successMessage}}
        </div>

        <br>
        <ul class="tml-links">
            <li><a href="/#/login">Log in</a></li>
        </ul>
      </div>

    </div>

    <div class="loading-modal" v-if="loader">
      <div class="modal-content">
        <div class="spinning-loader"></div>
      </div>
    </div>

  </div>
</template>

<script>

module.exports = saasApp.controllers.RegisterController;

</script>