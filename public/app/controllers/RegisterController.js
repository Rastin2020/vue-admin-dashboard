( function() {

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  
  saasApp.controllers.RegisterController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function() {
      return {
        loader: false,
        registerUsername: "",
        registerEmail: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        errorMessage: "",
        successMessage: ""
      }
    },
    
    methods: {
      
      register: function() {
    
        const username = this.registerUsername;
        const email = this.registerEmail;
        const password = this.registerPassword;
        const confirmPassword = this.registerPasswordConfirm;

        let self = this;
  
        if (username === "") {
  
          this.errorMessage = "Please fill in the username.";
          this.successMessage = "";
          console.log("blank username");
  
        } else {
  
          if (email === "") {
  
            this.errorMessage = "Please fill in the email.";
            this.successMessage = "";
            console.log("blank email");
  
          } else if ( !(emailRegex.test(email)) ) {
  
            this.errorMessage = "Please check your email.";
            this.successMessage = "";
            console.log("email format is wrong");
    
          } else {
  
            if ( password.length < 12 || !(passwordRegex.test(password)) ) {
  
              this.errorMessage = "Password doesn't match the required format.";
              this.successMessage = "";
              console.log("password format is wrong");
  
            } else {
  
              if (password === confirmPassword) {
  
                self.loader = true;

                axios.post(baseApiUrl + "/wp-json/wp/v2/users/register", 
                  {
                    username,
                    email,
                    password
                  }
                ).then(function (result) {

                  const objectResult = JSON.parse(result.request.response);
                  console.log(objectResult.code);
                  console.log(result.status);

                  self.successMessage = "Registration successful.";
                  self.errorMessage = "";
                  self.loader = false;
                  
                })
                .catch(function (error) {

                  self.errorMessage = error.response.data.message;
                  self.successMessage = "";
                  self.loader = false;

                });

              } else {

                this.errorMessage = "Passwords don't match.";
                console.log("PASSWORD DON'T MATCH");
                
              }
  
            }
  
          }
        }
  
      },

      scroll: function(refName) {

        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);

      }
  
    },

  };

})();
