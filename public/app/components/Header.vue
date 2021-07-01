<template>
  <header class="header">
    <div class="top_bar big-screen">
      <div class="container">
        <div class="col d-flex flex-row">
          <a id="logo" href="/#/dashboard">SAAS PORTAL</a>
          <div class="top_bar_content ml-auto">
            <div class="top_bar_user">
              <div class="vertical-line"></div>
              <div class="left-text-styling">
                <a v-if="lefttext === 'LOG IN'" href="/#/login">{{lefttext}}</a>
                <a v-if="lefttext === 'DASHBOARD'" href="/#/dashboard">{{lefttext}}</a>
              </div>
              <div>
                <a v-if="righttext === 'LOG OUT'" v-on:click="logout">{{righttext}}</a>
                <a v-if="righttext === 'REGISTER'" href="/#/register">{{righttext}}</a>
              </div>
              <div>
                <Organizationsdropdown :showTheDropdown="showorganizationsdropdownorganizations"
                  v-if="showorganizationsdropdown === 'true'"></Organizationsdropdown>
              </div>
            </div>
          </div>
        </div>
    </div>    
  </header>
</template>

<script>

module.exports = {
  
  props: {
    lefttext: String,
    righttext: String,
    showorganizationsdropdown: String,
    showorganizationsdropdownorganizations: String
  }, 

  data: function () {
    return {
      showorganizationsdropdownorganizationsvalue: ""
    }
  },

  components: {
    'Organizationsdropdown': httpVueLoader('app/components/OrganizationsDropdown.vue'),
  },

  methods: {

    logout: function() {

      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      sessionStorage.removeItem("email");
      localStorage.removeItem("email");
      // Redirect to dashboard:
      window.location.href = "/#/login";

    }

  }
  
}

</script>