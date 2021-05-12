<template>
    <div>
      <Headercomp righttext="REGISTER" rightlink="/#/register" lefttext="LOG IN" leftlink="/#/login"></Headercomp>

      <div class="main-container">

        <h1>Register</h1>

        <div class="alerts-area">
          <!-- Errors will be appended here: -->
          <ul id="register-errors">
          </ul>
        </div>

        <form class="two-third">
          <label for="register_login">Username</label>
          <br>
          <input class="form-input full-width" type="text" name="register_username" id="register_username">
          <br><br>
          <label for="register_email">Email</label>
          <br>
          <input class="form-input full-width" type="email" name="register_email" id="register_email">
          <br><br>
          <label for="register_password">Password</label>
          <br>
          <input class="form-input full-width" type="password" name="register_password" id="register_password" 
          autocomplete="off">
          <br><br>
          <label for="register_password_confirm">Confirm Password</label>
          <br>
          <input class="form-input full-width" type="password" name="register_password_confirm" 
          id="register_password_confirm" autocomplete="off">
          <br><br>
          <p class="text-wrap high-line">Hint: The password should be at least twelve characters long. To make it stronger, 
            use upper and lower case letters, numbers, and symbols like <span class="input-hints-format">
            ! " ? $ % ^ & )<span></p>
          <br>
          <button v-on:click="register" id="register-submit" name="submit" class="btn btn-animate">Register</button>
          <br><br>
          <ul class="tml-links">
              <li><a href="/#/login">Log in</a></li>
              <li><a href="/#/login">Forgot Your Password?</a></li>
          </ul>
        </form>

      </div>

      <Footercomp></Footercomp>
    </div>
</template>

<script>

module.exports = {
  components: {
    'Headercomp': httpVueLoader('app/components/Header.vue'),
    'Footercomp': httpVueLoader('app/components/Footer.vue')
  },
  methods: {
    register
  }
}

function register(event) {

  event.preventDefault();

  const username = $("#register_username").val();
  const email = $("#register_email").val();
  const password = $("#register_password").val();
  const confirmPassword = $("#register_password_confirm").val();

  if (username === "") {

    console.log("blank username");
    return;

  } else {

    if (email === "") {

      console.log("blank email");

    } else if ( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) ) {

      console.log("email format is wrong");

      // DON'T FORGET TO PUT VALIDATION FOR CHECKING IF EMAIL ALREADY EXISTS IN DB BELOW THIS CHECK:

    } else {

      if ( password.length < 12 || !(/^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(password)) ) {

        console.log("password format is wrong");

      } else {

        if (password === confirmPassword) {

          $.ajax({
            url : "https://saas-admin-dev.encircle.technology/wp-json/wp/v2/users",
            type : "POST",
            dataType : "JSON",
            beforeSend: function ( xhr ) { xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce ) },
            data : { username, email, password },
            success: function (result) {
              console.log(result.responseJSON);
              console.log(result.status);
            },
            error: function(error) {
              console.log(error.responseJSON);
              console.log(error.status);
            }
          });

        } else {
          console.log("PASSWORD DON'T MATCH");
        }

      }

    }
  }

};

</script>