( function() {
  
  saasApp.controllers.InvoicesController = {

    components: {
    'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function () {
      return {
        loader: false,
        invoicesArray: []
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
  
        axios.get("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/billing/invoices", 
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
      this.load_user_invoices();
    }

  };

})();