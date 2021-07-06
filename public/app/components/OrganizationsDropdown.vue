<template>

  <div>

    <img class="general-margin" id="user-profile-icon" src="app/assets/icons/profile-icon.png" width="35px" 
      height="35px" v-on:click="toggleOrganizationsDropdown">
    
    <div style="margin-right: 0;" class="org-dropdown-menu" v-if="showOrganizationsDropdownContent">

      <div class="dropdown-card card-divs">
        <div class='col-sm card center-align theme-blue'>
          <div class="card p-3 mb-2 theme-blue">
            <div class="mt-5">
              <a class="general-margin no-hover-pointer">{{userEmail}}</a>
              <br>
              <a href="/#/invoices" class="profile-dropdown-link general-margin">Invoices</a>
              <br>
              <a href="/#/dashboard" class="profile-dropdown-link general-margin">{{currentPlan}} Plan</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showthedropdown === 'true'" class="full-width">

        <hr>

        <div v-if="organizationsArray.length === 0" class="center-align general-margin ninety-two-width">
          <p>No Organizations Found.</p>
          <a href="/#/new-organization"><img src="app/assets/icons/plus.png" class="pointer" width="30px" 
            height="30px"></a>
        </div>
        <div v-else class="full-width">
          <h4 class="center-align general-margin">Organizations</h4>
          <a href="/#/organizations" class="main-button see-all small-text">See All</a>
          <a class="float-right margin-right" href="/#/new-organization"><img src="app/assets/icons/plus.png" 
            class="pointer" width="30px" height="30px"></a>
        </div>
        <div class="full-width general-padding">
          <input v-on:keyup="load_user_organisation_details(orgSearchTerm)" v-model="orgSearchTerm" type="search" 
            class="search-bar" placeholder="Search:"> 
        </div>
        <div v-if="orgDeleteErrorMessage !== ''" class="alerts-area left-spaced" ref="orgError">
          {{orgDeleteErrorMessage}}
        </div>

        <div v-for="(organisation, index) in organizationsArray" class="dropdown-card card-divs" :key="index">
          <div class='col-sm card center-align'>
          <div class="card p-3 mb-2">
              <div class="mt-5">
                <p class="heading general-margin">{{organisation.name}}</p>
              </div>
              <br>
              <div class="mt-5">
                <select class="margin-auto">
                  <option>Members</option>
                  <option v-for="(member, index) in organisation.members" :key="index">{{member}}</option>
                </select>
              </div>
            </div>
            <br><br><br>
            <div class="card-buttons no-left-space ">
              <div class="edit-button" v-on:click="open_org_modal(organisation)">
                <img class="general-margin-small" src="app/assets/icons/edit.png" width="17px" height="18px">
              </div>
              <div class="select-button" v-on:click="select_org_default(organisation._id)">
                <img class="vertical-margin-small" src="app/assets/icons/click.png" width="15px" height="20px">
              </div>
              <div class="delete-button" v-on:click="open_delete_confirm_modal(organisation.name, 'org', 
                organisation._id)">
                <img class="general-margin-small" src="app/assets/icons/delete.png" width="14px" height="18px">
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="edit-modal" v-if="showOrgEditModal">
      <div class="modal-content">
        <div class="main-container full-width">
          <div class="modal-container left-spaced-middle">
            <h1>Edit Organization</h1>
            <br>
            <label for="organisation_name">Name <span class="required">*<span></label>
            <br>
            <input v-on:keyup.enter="submit_org_edit(); scroll('error');" class="form-input full-width" 
              :placeholder="this.editName" type="text" name="organisation_name" v-model="editName">
            <br><br>
            <label for="organisation_members">Members <span class="required">*<span></label>
            <br>
            <textarea class="full-width top-margin" :placeholder="this.editMembers" name="organisation_members" 
              rows="4" v-model="editMembers"></textarea>
            <p><i>Comma seperated list of emails.</i></p> 
            <div v-if="orgErrorMessage !== ''" class="alerts-area" ref="error">
              {{orgErrorMessage}}
            </div>
            <div v-if="orgSuccessMessage !== ''" class="success-area" ref="error">
              {{orgSuccessMessage}}
            </div>
            <br><br>
            <button v-on:click="close_edit_modal" class="close-edit-modal cancel-button">CLOSE</button>
            <button v-on:click="submit_org_edit" class="edit-modal-submit float-right">SAVE</button>
          </div>
        </div>                  
      </div>
    </div>

    <div class="delete-confirm-modal" v-if="showDeleteConfirmModal">
      <div class="modal-content">
        <div class="main-container full-width">
          <div class="modal-container left-spaced-middle">
            <h1>Confirm Delete</h1>
            <br>
            <label for="delete_name">Type in the name to delete <span class="required">*<span></label>
            <br>
            <input v-on:keyup.enter="submit_delete_confirm(); scroll('error');" class="form-input full-width" 
              type="text" name="delete_name" v-model="deleteNameConfirmInput">  
            <br><br>
            <p>Name: <span class="input-hints-format">{{this.deleteNameConfirm}}</span></p>
            <div v-if="confirmDeleteErrorMessage !== ''" class="alerts-area">
              {{confirmDeleteErrorMessage}}
            </div>
            <div v-if="confirmDeleteSuccessMessage !== ''" class="success-area">
              {{confirmDeleteSuccessMessage}}
            </div>
            <br><br>
            <button v-on:click="close_delete_confirm_modal" class="edit-modal-submit">CANCEL</button>
            <button v-on:click="submit_delete_confirm" class="close-edit-modal cancel-button float-right">
              DELETE</button>
          </div>
        </div>                  
      </div>
    </div>

    <div class="loading-modal center-align" v-if="loader">
      <div class="modal-content">
        <div class="spinning-loader"></div>
      </div>
    </div>

  </div>

</template>

<script>

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports = {

  props: {
    update: Boolean,
    showthedropdown: String
  }, 

  data: function () {
    return {
      loader: false,
      showOrganizationsDropdownContent: false,
      organizationsArray: [],
      orgSearchTerm: "",
      showOrgEditModal: false,
      editName: "",
      editMembers: [],
      orgErrorMessage: "",
      orgSuccessMessage: "",
      orgDeleteErrorMessage: "",
      showDeleteConfirmModal: false,
      deleteNameConfirmInput: "",
      deleteNameConfirm: "",
      confirmDeleteErrorMessage: "",
      confirmDeleteSuccessMessage: "",
      editOrganizationID: "",
      whichDeleteModal: "",
      deleteConfirmId: "",
      orgInitialRendering: true,
      currentPlan: "",
      userEmail: ""
    }
  },

  methods: {

    toggleOrganizationsDropdown: function() {

      if ( !this.showOrganizationsDropdownContent ) {
        this.showOrganizationsDropdownContent = true;
      } else {
        this.showOrganizationsDropdownContent = false;
      }

    },

    delete_organization: function(organisationID) {

      let self = this;

      let authToken;
      if ( sessionStorage.getItem("token") !== null ) {
        authToken = sessionStorage.getItem("token");
      }

      if ( localStorage.getItem("token") !== null ) {
        authToken = localStorage.getItem("token");
      }

      const organizationID = organisationID;
      
      self.loader = true;

      self.orgDeleteErrorMessage = "";
      
      axios.delete(baseApiUrl + "/wp-json/saas-wp/v1/organization?id=" + organizationID, 
        {
          headers:  {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken,
          }
        }
      ).then(function (result) {
        
        console.log(result.request.response);
        console.log(result.status);
        const objectResult = JSON.parse(result.request.response);

        if ( objectResult.response.message === "Conflict" ) {
          self.orgDeleteErrorMessage = "Organization has to be empty of service to delete.";
          self.loader = false;
        } else {
          self.load_user_organisation_details();
          self.orgDeleteErrorMessage = "";
          self.loader = false;
        }

      })
      .catch(function (error) {
        console.log(error);
        self.orgDeleteErrorMessage = "There was an error on our end, please try again!";
        self.loader = false;
      });

    },

    open_org_modal: function(organisation) {

      this.showOrgEditModal = true;
      this.editName = organisation.name;
      this.editMembers = organisation.members;
      this.editOrganizationID = organisation._id;

    },

    close_edit_modal: function() {
      this.orgErrorMessage = "";
      this.orgSuccessMessage = "";
      this.showOrgEditModal = false;
    },

    open_delete_confirm_modal: function(name, whichDeleteModal, ID) {
      this.deleteNameConfirm = name;
      this.whichDeleteModal = whichDeleteModal;
      this.deleteConfirmId = ID;
      this.showDeleteConfirmModal = true;
    },

    close_delete_confirm_modal: function() {
      this.deleteNameConfirm = "";
      this.whichDeleteModal = "";
      this.deleteConfirmId = "";
      this.deleteNameConfirmInput = "";
      this.confirmDeleteErrorMessage = "";
      this.confirmDeleteSuccessMessage = "";
      this.showDeleteConfirmModal = false;
    },

    submit_delete_confirm: function() {

      if ( this.deleteNameConfirmInput !== this.deleteNameConfirm ) {
        this.confirmDeleteErrorMessage = "Incorrect. Please try again.";
        this.confirmDeleteSuccessMessage = "";
        return;
      }

      if ( this.whichDeleteModal === "org" ) {
        this.delete_organization(this.deleteConfirmId);
      }

      this.confirmDeleteErrorMessage = "";
      this.confirmDeleteSuccessMessage = "Deleted";
      this.close_delete_confirm_modal();

    },

    submit_org_edit: function() {

      let self = this;

      const name = this.editName;
      const members = (this.editMembers).toString();

      if ( name === "" ) {
      
        this.orgErrorMessage = "Please fill in the name.";
        this.orgSuccessMessage = "";
        console.log("blank name");

      } else if ( name.length > 24 ) {

        this.orgErrorMessage = "Name cannot be more than 24 characters long.";
        this.orgSuccessMessage = "";
        console.log("Max 24 characters allowed for name");

      } else {

        if ( members === "" ) {

          this.orgErrorMessage = "Please fill in the members.";
          this.orgSuccessMessage = "";
          console.log("blank members")

        } else {

          const membersArray = members.split(",");
          let membersArrayProcessed = [];

          for (i=0; i<membersArray.length; i++) {
            membersArrayProcessed.push(membersArray[i].trim());
          }

          for (i=0; i<membersArray.length; i++) {
            if ( !(emailRegex.test(membersArrayProcessed[i])) ) {
              console.log("one or more email is in the wrong format");
              this.orgErrorMessage = "Please check your email(s).";
              this.orgSuccessMessage = "";
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
          
          axios.put(baseApiUrl + "/wp-json/saas-wp/v1/organization", 
            {
              name,
              members: membersArrayProcessed
            },
            {
              headers:  {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
              },
              params: {
                id: this.editOrganizationID
              }
            },
          ).then(function (result) {
            const objectResult = JSON.parse(result.request.response);

            if ( objectResult.response.message === "Unprocessable Entity" ) {
              console.log("one or more email is in the wrong format");
              console.log(result.status);
              self.orgErrorMessage = "Please check your email(s).";
              self.orgSuccessMessage = "";
              self.loader = false;
            } else {
              self.load_user_organisation_details();
              self.orgSuccessMessage = "Organization edited.";
              self.orgErrorMessage = "";
              self.loader = false;
            }

          })
          .catch(function (error) {
            console.log(error);
            self.orgErrorMessage = "There was an error on our end, please try again!";
            self.orgSuccessMessage = "";
            self.loader = false;
          });

        }

      }

    },

    load_user_organisation_details: function(orgSearchTerm) {

      let authToken;
      let self = this;
      if ( sessionStorage.getItem("token") !== null ) {
        authToken = sessionStorage.getItem("token");
      }

      if ( localStorage.getItem("token") !== null ) {
        authToken = localStorage.getItem("token");
      }

      if ( orgSearchTerm === "" && this.orgInitialRendering ) {
        self.loader = true;
      }

      axios.get(baseApiUrl + "/wp-json/saas-wp/v1/organizations", 
        {
          headers:  {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken,
          } 
        }
      ).then(function (result) {

        const objectResult = JSON.parse(result.request.response);
        organizationsArrayResponse = objectResult.body;
        organizationsArray = [];

        if ( organizationsArrayResponse.length > 5 ) {
          for( i=0; i<5; i++ ) {
            organizationsArray.push(organizationsArrayResponse[i]);
          }
        } else {
          organizationsArray = organizationsArrayResponse;
        }

        if ( orgSearchTerm === "" || orgSearchTerm === undefined ) {

          self.organizationsArray = organizationsArray;
          self.orgInitialRendering = false;
          self.loader = false;

        } else {

          let filteredArray = [];

          for ( i=0; i<organizationsArray.length; i++ ) {
            
            if ( (organizationsArray[i].name).toLowerCase().includes(orgSearchTerm.toLowerCase()) ||  
            (organizationsArray[i].owner).toLowerCase().includes(orgSearchTerm.toLowerCase()) || 
            ((organizationsArray[i].members).toString()).toLowerCase().includes(orgSearchTerm.toLowerCase()) ) {

              filteredArray.push(organizationsArray[i]);

            }
          }

          self.organizationsArray = filteredArray;
          self.orgInitialRendering = false;
          self.loader = false;

        }

      })
      .catch(function (error) {
        console.log(error);
        self.orgInitialRendering = false;
        self.loader = false;
      });

    },

    select_org_default: function(orgID) {
      sessionStorage.setItem("orgID", orgID);
     if ( this.$route.fullPath === "/dashboard" ) {
        location.reload();
      } else {
        window.location.href = "/#/dashboard";
      };
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

    }

  },

  mounted() {
    this.load_user_organisation_details();
    this.get_current_plan();
    
    if ( sessionStorage.getItem("email") !== null) {
      this.userEmail = sessionStorage.getItem("email");
    } else if ( localStorage.getItem("email") !== null ) {
      this.userEmail = localStorage.getItem("email");
    }

  }
  
}

</script>