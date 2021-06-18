<template>
  <div>
    <Headercomp righttext="REGISTER" lefttext="LOG IN"></Headercomp>
    
    <div class="main-container">

      <h1>Forgot Password</h1>
      <br>
      
      <div class="two-third form-page">
        <label for="recover_email">Please enter your email address</label>
        <br>
        <input class="form-input full-width" type="email" name="log" id="recover_email" v-model="userLogin">
        <br><br>
        <button v-on:click="recover_password(); scroll('error')" name="submit" class="main-button no-vertical-padding">Recover Password</button>
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
        </ul>
      </div>

    </div>

    <div class="loading-modal" v-if="loader">
      <div class="modal-content">
        <div class="spinning-loader"></div>
      </div>
    </div>

    <Footercomp></Footercomp>
  </div>
  
</template>

<script>

module.exports = saasApp.controllers.ForgotPasswordController;

</script>