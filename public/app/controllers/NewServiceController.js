( function() {

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const urlRegex = /.*\..*/;
  
  saasApp.controllers.NewServiceController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue'),
      'Footercomp': httpVueLoader('app/components/Footer.vue')
    },

    data: function() {
      return {
        loader: false,
        serviceName: "",
        serviceEmail: "",
        organisationID: null,
        application: null,
        environment: null,
        serviceDomain: "",
        organizationArray: [],
        errorMessage: "",
        successMessage: ""
      }
    },
  
    methods: {
  
      load_user_organisations: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }
  
        self.loader = true;

        axios.get("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/organizations", 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {
  
          const objectResult = JSON.parse(result.request.response);
          self.organizationArray = objectResult.body;
          console.log(result.status);

          self.loader = false;
  
        })
        .catch(function (error) {

          console.log(error);
          self.errorMessage = "An error occured on this page. Please refresh and try again";

          self.loader = false;

        });
  
      },
  
      create_service: function() {
    
        const name = this.serviceName;
        const email = this.serviceEmail;
        const organization = this.organisationID;
        const application = this.application;
        const environment = this.environment;
        const domain = this.serviceDomain;

        let self = this;
  
        if ( name === "" ) {
          
          this.errorMessage = "Please fill in the name.";
          console.log("blank name");
        
        } else if ( name.length > 20 ) {

          this.errorMessage = "Name cannot be more than 20 characters.";
          console.log("Max 20 characters allowed for name");

        } else {
  
          if ( email === "" ) {
  
            this.errorMessage = "Please fill in the email.";
            console.log("blank email");
  
          } else if ( !(emailRegex.test(email)) ) {
  
            this.errorMessage = "Please check your email.";
            console.log("email format is wrong");
  
          } else {
  
            if ( organization === null || organization === undefined ) {
  
              this.errorMessage = "Please pick an organization.";
              console.log("please pick an organisation");
  
            } else {
  
              if ( application === null ) {
  
                this.errorMessage = "Please pick an application.";
                console.log("please pick an application");
  
              } else {
  
                if ( environment === null ) {
  
                  this.errorMessage = "Please pick an environment.";
                  console.log("please pick an environment");
  
                } else {
  
                  if ( domain === "" ) {
  
                    this.errorMessage = "Please fill in the domain.";
                    console.log("blank domain");
  
                  } else if ( !(urlRegex.test(domain)) ) {
  
                    this.errorMessage = "Domain format is wrong.";
                    console.log("domain is in wrong format");
  
                  } else {
  
                    let authToken;
                    if ( sessionStorage.getItem("token") !== null ) {
                      authToken = sessionStorage.getItem("token");
                    }
  
                    if ( localStorage.getItem("token") !== null ) {
                      authToken = localStorage.getItem("token");
                    }
  
                    self.loader = true;

                    axios.post("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/service", 
                      {
                        name,
                        email,
                        organization,
                        application,
                        environment,
                        domain
                      },
                      {
                        headers:  {
                          "Content-Type": "application/json",
                          "Authorization": "Bearer " + authToken,
                        } 
                      }
                    ).then(function (result) {

                      const objectResult = JSON.parse(result.request.response);
                      console.log(objectResult);
                      console.log(result.status);

                      if ( objectResult.response.code === 201 ) {
                        self.successMessage = "Service created.";
                        self.errorMessage = "";
                        self.loader = false;
                      } else {
                        self.successMessage = "";
                        self.errorMessage = objectResult.body.message;
                        self.loader = false;
                      }

                    })
                    .catch(function (error) {

                      console.log(error);
                      self.errorMessage = "There was an error on our end, please try again!";
                      self.successMessage = "";
                      self.loader = false;

                    });
  
                  }
  
                }
  
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
  
    mounted() {
      // Redirect to login page if user isn't logged in (i.e token can't be found in local or session storage):
      if ( sessionStorage.getItem("token") === null && localStorage.getItem("token") === null ) {
        window.location.href = "/#/login";
      }
  
      // Load user's organisations from DB:
      this.load_user_organisations();
  
    }

  };

})();