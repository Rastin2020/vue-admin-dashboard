<template>
    <div>
        <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true"
        showorganizationsdropdownorganizations="true"></Headercomp>

        <div class="main-container">

          <h1>Add Organization</h1>
          <br>

          <div class="two-third form-page">
            <label for="organisation_name">Name <span class="required">*<span></label>
            <br>
            <input v-on:keyup.enter="create_organisation(); scroll('error')" class="form-input full-width" 
            type="text" name="organisation_name" v-model="organisationName">
            <br><br>
            <label for="organisation_members">Members <span class="required">*<span></label>
            <br>
            <textarea class="full-width top-margin" name="organisation_members" rows="4" 
            v-model="organisationMembers">
            </textarea>
            <p><i>Comma seperated list of emails.</i></p> 
            <br>
            <div v-if="errorMessage !== ''" class="alerts-area" ref="error">
              {{errorMessage}}
            </div>
            <div v-if="successMessage !== ''" class="success-area" ref="error">
              {{successMessage}}
            </div>
            <br>
            <button onclick="location.href = '/#/organizations'" class="main-button cancel-button 
              no-vertical-padding">All Organizations</button>
            <button v-on:click="create_organisation(); scroll('error')" name="submit" class="main-button 
              no-vertical-padding unique-organizations-create float-right">Create</button>    
          </div>
          <br>
        
        </div> 

        <div class="loading-modal" v-if="loader">
          <div class="modal-content">
            <div class="spinning-loader"></div>
          </div>
        </div>       

    </div>
</template>

<script>

module.exports = saasApp.controllers.NewOrganizationController;

</script>