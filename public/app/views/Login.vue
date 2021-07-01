<template>
  <div>
    <Headercomp righttext="REGISTER" lefttext="LOG IN"></Headercomp>
    
    <div class="main-container">

      <h1>Log In</h1>
      <br>
      
      <div class="two-third form-page">
        <label for="user_login">Username or Email Address</label>
        <br>
        <input v-on:keyup.enter="login(); scroll('error');" class="form-input full-width" type="text" 
          name="log" v-model="loginUsername">
        <br><br>
        <label for="user_pass">Password</label>
        <br>
        <input v-on:keyup.enter="login(); scroll('error');" class="form-input full-width" type="password" 
          name="pwd" v-model="userPassword">
        <br><br>
        <input type="checkbox" name="rememberme" value="forever" v-model="rememberMe">
        <label for="rememberme">Remember Me</label>
        <br><br>
        <button v-on:click="login(); scroll('error');" name="submit" class="main-button no-vertical-padding">
          Log In</button>
        <br><br>
        <div v-if="errorMessage !== ''" class="alerts-area" ref="error">
          {{errorMessage}}
        </div>
        <div v-if="successMessage !== ''" class="success-area" ref="error">
          {{successMessage}}
        </div>
        <br>
        <ul class="tml-links">
            <li><a href="/#/register">Register New Account</a></li>
            <li><a href="/#/forgot-password">Forgot Your Password?</a></li>
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

module.exports = saasApp.controllers.LoginController;

</script>