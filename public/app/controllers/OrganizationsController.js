( function() {

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  saasApp.controllers.OrganizationsController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function () {
      return {
        loader: false,
        showOrganizations: true,
        updatePlan: false,
        organizationsArray: [],
        showOrgEditModal: false,
        showDeleteConfirmModal: false,
        confirmDeleteErrorMessage: "",
        confirmDeleteSuccessMessage: "",
        whichDeleteModal: "",
        deleteConfirmId: "",
        editName: "",
        deleteNameConfirmInput: "",
        deleteNameConfirm: "",
        editMembers: [],
        orgSearchTerm: "",
        selectedOrganisationID: "",
        orgErrorMessage: "",
        orgSuccessMessage: "",
        orgDeleteErrorMessage: "",
        orgInitialRendering: true
      }
    },
  
    methods: {

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
  
        axios.get("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/organizations", 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {

          const objectResult = JSON.parse(result.request.response);
          organizationsArray = objectResult.body;

          if ( orgSearchTerm === "" || orgSearchTerm === undefined ) {

            self.organizationsArray = objectResult.body;
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
            
            axios.put("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/organization", 
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
        if ( this.whichDeleteModal === "serv" ) {
          this.delete_service(this.deleteConfirmId);
        }
        if ( this.whichDeleteModal === "snap" ) {
          this.delete_snapshot(this.deleteConfirmId);
        }

        this.confirmDeleteErrorMessage = "";
        this.confirmDeleteSuccessMessage = "Deleted";
        this.close_delete_confirm_modal();

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
        
        axios.delete("https://saas-api-dev.encircle.technology/wp-json/saas-wp/v1/organization?id=" + organizationID, 
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

      select_org_default: function(orgID) {
        console.log("select function called");
        sessionStorage.setItem("orgID", orgID);
        window.location.href = "/#/dashboard";
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
  
      // Load the user organisation, services and snapshot initially into the DOM:
      this.load_user_organisation_details();
  
    }

  };

})();