( function() {

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  saasApp.controllers.NewOrganizationController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function() {
      return {
        loader: false,
        organisationName: "",
        organisationMembers: "",
        errorMessage: "",
        successMessage: ""
      }
    },

    methods: {
  
      create_organisation: function() {
    
        const name = this.organisationName;
        const members = this.organisationMembers;

        let self = this;
  
        if ( name === "" ) {
          
          this.errorMessage = "Please fill in the name.";
          this.successMessage = "";
          console.log("blank name");
  
        } else if ( name.length > 20 ) {
  
          this.errorMessage = "Name cannot be more than 20 characters.";
          this.successMessage = "";
          console.log("Max 20 characters allowed for name");
  
        } else {
  
          if ( members === "" ) {
  
            this.errorMessage = "Please fill in the members.";
            this.successMessage = "";
            console.log("blank members")
  
          } else {
  
            const membersArray = members.split(",");
            let membersArrayProcessed = [];
  
            for (i=0; i<membersArray.length; i++) {
              membersArrayProcessed.push(membersArray[i].trim());
            }
  
            for (i=0; i<membersArray.length; i++) {
              if ( !(emailRegex.test(membersArrayProcessed[i])) ) {
                this.errorMessage = "Please check your email(s).";
                this.successMessage = "";
                console.log("one or more email is in the wrong format");
                return;
              }
            }
  
            let authToken;
            if ( sessionStorage.getItem("token") !== null ) {
              authToken = sessionStorage.getItem("token");
            }
  
            if ( localStorage.getItem("token") !== null ) {
              authToken = localStorage.getItem("token");
            }
  
            self.loader = true;

            axios.post(baseApiUrl + "/wp-json/saas-wp/v1/organization", 
              {
                name,
                members: membersArrayProcessed
              },
              {
                headers:  {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + authToken,
                } 
              }
            ).then(function (result) {
              const objectResult = JSON.parse(result.request.response);
              console.log(objectResult.response.code);
              console.log(result.status);

              if ( objectResult.response.code === 201 ) {
                self.successMessage = "Organization created.";
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
    }

  };

})();