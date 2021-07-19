( function() {
  
  saasApp.controllers.BillingController = {

    components: {
    'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function () {
      return {
        loader: false,
        invoicesArray: [],
        currentPlan: "",
        planSelection: "Select a Plan",
        availablePlans: [],
        planError: "",
        billingConfigKey: ""
      }
    },
  
    methods: {

      load_user_invoices: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }
  
        self.loader = true;
  
        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/billing/invoices", 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {
  
          invoicesArray = result.data.body.invoices.data;
          console.log(invoicesArray);
          self.invoicesArray = invoicesArray;
          self.loader = false;
  
        })
        .catch(function (error) {
          console.log(error);
          self.loader = false;
        });

      },

      subscribe: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }

        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        if ( this.planSelection === "Select a Plan") {
          
          this.planError = "Please select a plan";
          return;
          
        } else {

          const stripe = Stripe(this.billingConfigKey);

          axios.post(baseApiUrl + "/wp-json/saas-wp/v1/billing/upgrade", {}, 
            {
              headers:  {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
              },
              params: {
                plan: this.planSelection
              }
            }
          ).then(function (result) {
            const resultJSON = JSON.parse(JSON.stringify(result));
            const sessionId = resultJSON.data.body.sessionId;
            const message = resultJSON.data.body.message;
            self.planError = message;
            stripe.redirectToCheckout({sessionId});
            self.get_current_plan();

            if ( !self.updatePlan ) {
              self.updatePlan = true;
            } else {
              self.updatePlan = false;
            }

          })
          .catch(function (error) {
            self.get_current_plan();
            
            if ( !self.updatePlan ) {
              self.updatePlan = true;
            } else {
              self.updatePlan = false;
            }

            console.log(error);
          });

        }
        
      },

      get_available_plans: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }
  
        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/billing/plans", 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {
          const objectResult = JSON.parse(result.request.response);
          self.availablePlans = objectResult.body.plans;
        })
        .catch(function (error) {
          console.log(error);
        });

      },

      get_current_plan: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }
  
        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/user/plan", 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {

          const objectResult = JSON.parse(result.request.response);
          self.currentPlan = objectResult.body.plan;

        })
        .catch(function (error) {

          console.log(error);

        });

      },

      config_billing: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }

        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/billing/config",
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            }
          }
        ).then(function (result) {
          self.billingConfigKey = result.data.body.key;
        })
        .catch(function (error) {
          console.log(error);
        });

      },

      convert_epoch_seconds: function(seconds) {

        const timestamp = seconds;
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return day + "/" + month + "/" + year;

      }

    },

    mounted() {

       // Redirect to login page if user isn't logged in (i.e token can't be found in local or session storage):
       if ( sessionStorage.getItem("token") === null && localStorage.getItem("token") === null ) {
        window.location.href = "/#/login";
      }

      this.get_current_plan();
      this.get_available_plans();
      this.config_billing();
      this.load_user_invoices();
    }

  };

})();