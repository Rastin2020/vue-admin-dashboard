( function() {
  
  saasApp.controllers.LoginController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function () {
      return {
        loader: false,
        loginUsername: "",
        userPassword: "",
        rememberMe: false,
        errorMessage: "",
        successMessage: ""
      }
    },
    
    methods: {
  
      login: function() {
    
        const username = this.loginUsername; // This could either be the username OR email
        const password = this.userPassword;
        const rememberMe = this.rememberMe;

        let self = this;
  
        if ( username === "" ) {
  
          this.errorMessage = "Please fill in the username or email."
          this.successMessage = "";
          console.log("blank login");
  
        } else {
  
          if ( password === "" ) {
  
            this.errorMessage = "Please fill in the password.";
            this.successMessage = "";
            console.log("blank password");
  
          } else {

            self.loader = true;
  
            axios.post(baseApiUrl + "/wp-json/jwt-auth/v1/token", 
              {
                username,
                password
              }
            ).then(function (result) {
              
              console.log(result.status);
              const objectResult = JSON.parse(result.request.response);
              console.log(objectResult);
  
              if ( objectResult.code === "invalid_username") {
                self.errorMessage = "Invalid username.";
                self.successMessage = "";
                console.log("Incorrect username.");
                self.loader = false;
              } 
  
              else if ( objectResult.code === "incorrect_password" ) {
                self.errorMessage = "Invalid password.";
                self.successMessage = "";
                console.log("Incorrect password.");
                self.loader = false;
              }
  
              else if ( objectResult.code === "invalid_email" ) {
                self.errorMessage = "Invalid email.";
                self.successMessage = "";
                console.log("Incorrect email.");
                self.loader = false;
              }
  
              else if ( objectResult.success === true ) {
  
                // Storing of user token:
                const token = objectResult.data.token;
                const userEmail = objectResult.data.email;
                
                if (rememberMe) {
                  localStorage.setItem("token", token);
                  sessionStorage.removeItem("token");
                  localStorage.setItem("email", userEmail);
                  sessionStorage.removeItem("email");
                } 
  
                if (!rememberMe) {
                  sessionStorage.setItem("token", token);
                  localStorage.removeItem("token");
                  sessionStorage.setItem("email", userEmail);
                  localStorage.removeItem("email");
                }

                self.successMessage = "Login successful.";
                self.errorMessage= "";

                self.loader = false;
  
                // Redirect to dashboard:
                window.location.href = "/#/dashboard";
  
              } 

              else {

                self.errorMessage = objectResult.message;
                self.successMessage = "";
                self.loader = false;

              }
  
            })
            .catch(function (error) {

              self.errorMessage = "There was an error on our end, please try again!";
              self.successMessage = "";
              console.log(error);
              self.loader = false;

            });
  
          }
  
        }
  
      },

      scroll: function(refName) {

        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
  
      }
      
    },
  
    mounted() {
      // Redirect to login page if user isn't logged in (i.e token can't be found in local or session storage):
      if ( sessionStorage.getItem("token") !== null || localStorage.getItem("token") !== null ) {
        window.location.href = "/#/dashboard";
      }

    }

  };

})();