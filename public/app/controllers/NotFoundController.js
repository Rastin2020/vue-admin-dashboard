( function() {
  
  saasApp.controllers.NotFoundController = {

    components: {
    'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    mounted() {
      
      // Redirect to login page if user isn't logged in (i.e token can't be found in local or session storage):
      if ( sessionStorage.getItem("token") === null && localStorage.getItem("token") === null ) {
        window.location.href = "/#/login";
      }
  
    }

  };

})();