<template>
  <div>
      <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true"
      showorganizationsdropdownorganizations="true"></Headercomp>

      <div class="main-container">

        <h1>Add Service</h1>
        <br>

        <div class="two-third form-page">
          <label for="service_name">Name <span class="required">*<span></label>
          <br>
          <input v-on:keyup.enter="create_service(); scroll('error');" class="form-input full-width" 
            type="text" name="service_name" v-model="serviceName">
          <br><br>
          <label for="service_email">Email <span class="required">*<span></label>
          <br>
          <input v-on:keyup.enter="create_service(); scroll('error');" class="form-input full-width" 
            type="email" name="service_email" v-model="serviceEmail">
          <br><br>
          <label for="service_organisation">Organization <span class="required">*<span></label>
          <br>
          <select class="form-input full-width" name="service_organisation" v-model="organisationID">
            <option hidden disabled selected value> -- Select -- </option>
            <option v-if="organizationArray.length === 0">No organizations found.</option>
            <option v-for="(organisation, index) in organizationArray" v-bind:value="organisation._id" 
              :key="index">{{organisation.name}}</option>
          </select>
          <br><br>
          <label for="service_size">Size <span class="required">*<span></label>
          <br>
          <select class="form-input full-width" name="service_size" v-model="serviceSize">
            <option hidden disabled selected value> -- Select -- </option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <br><br>
          <label for="service_application">Application <span class="required">*</span></label>
          <br>
          <select class="form-input full-width" name="service_application" v-model="application">
            <option hidden disabled selected value> -- Select -- </option>
            <option>Wordpress</option>
            <option>Drupal 7</option>
            <option>Drupal 8</option>
            <option>Drupal 9</option>
          </select>
          <br><br>
          <label for="service_environment">Environment <span class="required">*</span></label>
          <br>
          <select class="form-input full-width" name="service_environment" v-model="environment">
            <option hidden disabled selected value> -- Select -- </option>
            <option>Test</option>
            <option>UAT</option>
            <option>Production</option>
          </select>
          <br><br>
          <label for="service_domain">Domain <span class="required">*</span></label>
          <br>
          <input v-on:keyup.enter="create_service(); scroll('error');" class="form-input full-width" 
          placeholder="(for example) mydomainname.co.uk or mydomainname.encircle.technology" type="url" 
          name="service_domain" v-model="serviceDomain">
          <br><br>
          <p><i>Note: if you want us to handle your DNS, please attach <span class="input-hints-format">
            .encircle.technology</span> to the <strong>end</strong> of your domain name.</i></p>
          <br><br>
          <div v-if="errorMessage !== ''" class="alerts-area" ref="error">
          {{errorMessage}}
          </div>
          <div v-if="successMessage !== ''" class="success-area" ref="error">
            {{successMessage}}
          </div>
          <br>
          <div class="buttons-area">
            <button onclick="location.href = '/#/dashboard'" class="main-button cancel-button 
              no-vertical-padding">
            Return to Dashboard</button>
            <button v-on:click="create_service(); scroll('error');" name="submit" 
            class="main-button no-vertical-padding unique-services float-right">Create</button>    
          </div>
          <br>
        </div>

      </div>

      <div class="loading-modal" v-if="loader">
        <div class="modal-content">
          <div class="spinning-loader"></div>
        </div>
      </div>

  </div>
</template>

<script>

module.exports = saasApp.controllers.NewServiceController;

</script>