<template>
  <div>
    <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true"></Headercomp>

    <div class="main-container">

      <h2>Organizations</h2>

      <div class="main-card">

        <br>
        <button onclick="location.href = '/#/dashboard'" class="cancel-button">Services and Snapshots</button>
        <button onclick="location.href = '/#/new-organization'" class="top-bottom-margin unique-organizations 
          float-right">New Organization</button>
        <br><br><br>

        <div>

          <div v-if="showOrganizations">

            <br>
            <div class="paginate-background-area">
              <input v-on:keyup="load_user_organisation_details(orgSearchTerm)" v-model="orgSearchTerm" 
                type="search" id="org-search" class="search-bar" 
              placeholder="Search:">
            </div>

            <div class="background-area">
              <div class="casing">
                <div v-if="organizationsArray.length === 0" class="center-align">No Organizations Found.</div>
                <div v-for="(organisation, index) in organizationsArray" class="card-divs" :key="index">
                  <div class='col-sm card center-align'>
                    <div class="card p-3 mb-2">
                      <div class="mt-5">
                        <h6>{{organisation.owner}}</h6>
                      </div>
                      <div class="mt-5">
                        <h4 class="heading">{{organisation.name}}</h4>
                        <div class="mt-5">
                          <div class="mt-3">
                            <select :class="['members-list-style', 'members-list-'+ index]">
                              <option>Members</option>
                              <option v-for="(member, index) in organisation.members" :key="index">
                                {{member}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-buttons">
                      <div class="edit-button" v-on:click="open_org_modal(organisation)">
                        <img class="edit-icon pointer" src="app/assets/icons/edit.png">
                      </div>
                      <div class="select-service-button margin-left-fix" v-on:click="select_org_default(
                        organisation._id)">
                        <img class="vertical-margin-small" src="app/assets/icons/click.png" width="18px" 
                          height="24px">
                      </div>
                      <div class="delete-button" v-on:click="open_delete_confirm_modal(organisation.name, 
                        'org', organisation._id), scroll('orgError');">
                        <img class="delete-icon pointer" src="app/assets/icons/delete.png">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="edit-modal" v-if="showOrgEditModal">
              <div class="modal-content">
                <div class="main-container">
                  <div class="modal-container">
                    <h1>Edit Organization</h1>
                    <br>
                    <label for="organisation_name">Name <span class="required">*<span></label>
                    <br>
                    <input v-on:keyup.enter="submit_org_edit" class="form-input full-width" 
                      :placeholder="this.editName" 
                      type="text" name="organisation_name" v-model="editName">
                    <br><br>
                    <label for="organisation_members">Members <span class="required">*<span></label>
                    <br>
                    <textarea class="full-width top-margin" :placeholder="this.editMembers" 
                      name="organisation_members" 
                      rows="4"  v-model="editMembers"></textarea>
                    <p><i>Comma seperated list of emails.</i></p> 
                    <br>
                    <div v-if="orgErrorMessage !== ''" class="alerts-area" ref="error">
                      {{orgErrorMessage}}
                    </div>
                    <div v-if="orgSuccessMessage !== ''" class="success-area" ref="error">
                      {{orgSuccessMessage}}
                    </div>
                    <br>
                    <button v-on:click="close_edit_modal" class="close-edit-modal cancel-button">CLOSE</button>
                    <button v-on:click="submit_org_edit" class="edit-modal-submit float-right">SAVE</button>
                  </div>
                </div>                  
              </div>
            </div>

            <br>
            <div v-if="orgDeleteErrorMessage !== ''" class="alerts-area" ref="orgError">
              {{orgDeleteErrorMessage}}
            </div>
            
          </div>          

        </div>

      </div>

    </div>

    <div class="delete-confirm-modal" v-if="showDeleteConfirmModal">
      <div class="modal-content">
        <div class="main-container">
          <div class="modal-container">
            <h1>Confirm Delete</h1>
            <br>
            <label for="delete_name">Type in the name to delete <span class="required">*<span></label>
            <br>
            <input v-on:keyup.enter="submit_delete_confirm" class="form-input full-width" type="text" 
              name="delete_name" 
            :id="'delete-name-' + index" v-model="deleteNameConfirmInput">  
            <br><br>
            <p>Name: <span class="input-hints-format">{{this.deleteNameConfirm}}</span></p>
            <div v-if="confirmDeleteErrorMessage !== ''" class="alerts-area">
              {{confirmDeleteErrorMessage}}
            </div>
            <div v-if="confirmDeleteSuccessMessage !== ''" class="success-area">
              {{confirmDeleteSuccessMessage}}
            </div>
            <br>
            <button v-on:click="close_delete_confirm_modal" class="edit-modal-submit">CANCEL</button>
            <button v-on:click="submit_delete_confirm" class="close-edit-modal cancel-button 
              unique-organizations-delete float-right">DELETE</button>
          </div>
        </div>                  
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

module.exports = saasApp.controllers.OrganizationsController;

</script>