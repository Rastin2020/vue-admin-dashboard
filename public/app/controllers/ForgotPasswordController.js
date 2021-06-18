( function() {

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  saasApp.controllers.ForgotPasswordController = {

    components: {
    'Headercomp': httpVueLoader('app/components/Header.vue'),
    'Footercomp': httpVueLoader('app/components/Footer.vue')
    },

    data: function () {
      return {
        loader: false,
        userLogin: "",
        errorMessage: "",
        successMessage: ""
      }
    },
  
    methods: {

      recover_password: function() {

        const user_login = this.userLogin;

        let self = this;

        if ( user_login === "" ) {

          this.errorMessage = "Please fill in the email.";
          this.successMessage = "";
          console.log("blank email");

        } else if ( !(emailRegex.test(user_login)) ) {

          this.errorMessage = "Please check your email.";
          this.successMessage = "";
          console.log("wrong email format");

        } else {

          self.loader = true; 

          axios.post("https://saas-api-dev.encircle.technology/wp-json/wp/v2/users/lost-password", 
            {
              user_login,
            }
          ).then(function (result) {
            console.log(result.request.response);
            console.log(result.status);
            self.successMessage = "Password reset has been sent to the email.";
            self.errorMessage = "";
            self.loader = false;
          })
          .catch(function (error) {
            console.log(error);
            console.log("Please check your email and try again");
            self.errorMessage = "Incorrect email address.";
            self.successMessage = "";
            self.loader = false;
          });

        }

      },

      scroll: function(refName) {

        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
  
      }

    }

  };

})();