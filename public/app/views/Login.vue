<template>
    <div>
        <Headercomp righttext="REGISTER" rightlink="/#/register" lefttext="LOG IN" leftlink="/#/login"></Headercomp>
        
        <div class="main-container">

            <h1>Log In</h1>
            <form class="two-third" name="login" action="./login" method="post">
                <label for="user_login">Username or Email Address</label>
                <br>
                <input class="form-input full-width" type="text" name="log" id="user_login" required>
                <br><br>
                <label for="user_pass">Password</label>
                <br>
                <input class="form-input full-width" type="password" name="pwd" id="user_pass" required>
                <br><br>
                <input type="checkbox" name="rememberme" id="rememberme" value="forever">
                <label for="rememberme">Remember Me</label>
                <br><br>
                <button type="submit" name="submit" class="btn btn-animate">Log In</button>
                <br><br>
                <ul class="tml-links">
                    <li><a href="/#/register">Register New Account</a></li>
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
  }
}

</script>