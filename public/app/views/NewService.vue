<template>
  <div>
      <Headercomp lefttext="DASHBOARD" leftlink="/#/dashboard" righttext="LOG OUT" rightlink="/#/login"></Headercomp>

      <div class="main-container">

        <h1>Add Service</h1>

        <form class="two-third" name="new-service" action="./new-service" method="post">
          <label for="service_name">Name <span class="required">*<span></label>
          <br>
          <input class="form-input full-width" type="text" name="service_name" id="service_name" required>
          <br><br>
          <label for="service_email">Email <span class="required">*<span></label>
          <br>
          <input class="form-input full-width" type="email" name="service_email" id="service_email" required>
          <br><br>
          <label for="service_organisation">Organization</label>
          <br>
          <select class="form-input full-width" name="service_organisation" id="service_organisation">
            <option><option>
          </select>
          <br><br>
          <label for="service_application">Application <span class="required">*</span></label>
          <br>
          <select class="form-input full-width" name="service_application" id="service_application" required>
            <option>Wordpress</option>
            <option>Drupal 7</option>
            <option>Drupal 8</option>
          </select>
          <br><br>
          <label for="service_environment">Environment <span class="required">*</span></label>
          <br>
          <select class="form-input full-width" name="service_environment" id="service_environment" required>
            <option>Test</option>
            <option>UAT</option>
            <option>Production</option>
          </select>
          <br><br>
          <label for="service_domain">Domain <span class="required">*</span></label>
          <br>
          <input class="form-input full-width" placeholder="mywordpress.encircle.technology" type="url" 
          name="service_domain" id="service_domain" required>
          <p><i>Please start the domain with <span class="input-hints-format">http://</span></i></p>
          <br>
          <button type="submit" name="submit" class="btn btn-animate">Create</button>    
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