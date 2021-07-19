( function() {
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  saasApp.controllers.DashboardController = {

    components: {
      'Headercomp': httpVueLoader('app/components/Header.vue')
    },

    data: function () {
      return {
        loader: false,
        serviceArrayEmptyMessage: '{"message":"No such organization"}',
        serviceArrayEmptyMessage2: '{"message":"Not a valid ID"}',
        showServSnapshotModal: false,
        showDeleteConfirmModal: false,
        showServDetailsModal: false,
        showRestoreConfirmModal: false,
        showScanModal: false,
        organizationsArray: [],
        confirmDeleteErrorMessage: "",
        confirmDeleteSuccessMessage: "",
        confirmRestoreSuccessMessage: "",
        confirmRestoreErrorMessage: "",
        scanErrorMessage: "",
        scanSuccessMessage: "",
        whichDeleteModal: "",
        deleteConfirmId: "",
        restoreConfirmId: "",
        editName: "",
        deleteNameConfirmInput: "",
        deleteNameConfirm: "",
        snapshotTagConfirmInput: "",
        restoreTagConfirmInput: "",
        orgSearchTerm: "",
        showOrganizations: true,
        organisationToggleText: "Hide Organizations",
        serviceArray: [],
        serviceScansArray: [],
        showServices: true,
        serviceToggleText: "Hide Services",
        selectedOrganisationID: "",
        scanServiceId: "",
        servSearchTerm: "",
        servSnapshotID: "",
        snapshotName: "",
        restoreSnapshotOption: "Snapshots",
        orgSnapshots: [],
        orgSnapshotsRestoreArray: [],
        snapshotSearchTerm: "",
        orgErrorMessage: "",
        orgSuccessMessage: "",
        snapshotErrorMessage: "",
        snapshotSuccessMessage: "",
        orgDeleteErrorMessage: "",
        serviceDeleteErrorMessage: "",
        setInterval_ID: "",
        snapshotToggleText: "Hide Snapshots",
        showSnapshots: true,
        orgInitialRendering: true,
        servInitialRendering: true,
        snapshotInitialRendering: true,
        updatePlan: false,
        serviceApplication: "",
        serviceDomain: "",
        serviceEmail: "",
        serviceSize: "",
        serviceEnvironment: "",
        serviceName: "",
        serviceOrganization: "",
        serviceRuntime: "",
        serviceStartTimeEpoch: "",
        serviceStartTimeFinalFormat: "", 
        serviceStatus: "",
        snapshotStatus: "",
        serviceBasicAuthPassword: "",
        serviceBasicAuthUsername: "",
        serviceDatabaseStorage: "",
        serviceSqlDatabaseName: "",
        serviceSqlDatabasePass: "",
        serviceSqlDatabaseUser: "",
        serviceWebrootStorage: "",
        serviceWordpressAdminEmail: "",
        serviceWordpressAdminPass: "",
        serviceDrupalAdminPass: "",
        serviceWordpressAdminUser: "",
        serviceDrupalAdminUser: "",
        serviceWordpressSiteTitle: "",
        serviceDrupalSiteTitle: "",
        serviceWordpressTablePrefix: "",
        serviceShhIp: "",
        serviceShhKey: ""
      }
    },
  
    methods: {

      close_edit_modal: function() {
        this.orgErrorMessage = "";
        this.orgSuccessMessage = "";
        this.showOrgEditModal = false;
      },

      open_serv_snapshot_modal: function(service) {

        this.showServSnapshotModal = true;
        this.servSnapshotID = service._id;

      },

      close_serv_snapshot_modal: function() {
        this.snapshotName = "";
        this.snapshotErrorMessage = "";
        this.snapshotSuccessMessage = "";
        this.showServSnapshotModal = false;
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

      open_serv_details_modal: function(service) {
        this.serviceApplication = service.application;
        this.serviceDomain = service.domain;
        this.serviceEmail = service.email;
        this.serviceSize = service.size;
        this.serviceEnvironment = service.environment;
        this.serviceName = service.name;
        this.serviceOrganization = service.organization_name;
        this.serviceRuntime = service.runtime; 
        this.serviceStartTimeEpoch = service.start_time;
        this.serviceStartTimeFinalFormat = this.convert_epoch_seconds(this.serviceStartTimeEpoch);
        this.serviceStatus = service.status;
        this.serviceBasicAuthPassword = service.variables.basicauth_password;
        this.serviceBasicAuthUsername = service.variables.basicauth_username;
        this.serviceDatabaseStorage = service.variables.database_storage;
        this.serviceSqlDatabaseName = service.variables.mysql_db_name;
        this.serviceSqlDatabasePass = service.variables.mysql_db_pass;
        this.serviceSqlDatabaseUser = service.variables.mysql_db_user;
        this.serviceWebrootStorage = service.variables.webroot_storage;
        this.serviceWordpressAdminEmail = service.variables.wp_admin_email;
        this.serviceWordpressAdminPass = service.variables.wp_admin_pass;
        this.serviceWordpressAdminUser = service.variables.wp_admin_user;
        this.serviceWordpressSiteTitle = service.variables.wp_site_title;
        this.serviceWordpressTablePrefix = service.variables.wp_table_prefix;    
        this.serviceDrupalAdminPass = service.variables.dr_admin_pass;
        this.serviceDrupalAdminUser = service.variables.dr_admin_user;
        this.serviceDrupalSiteTitle = service.variables.dr_site_title;
        this.serviceShhIp = service.ssh_ip;
        this.serviceShhKey = service.ssh_key;
        this.showServDetailsModal = true;
      },

      close_serv_details_modal: function() {
        this.serviceApplication = "";
        this.serviceDomain = "";
        this.serviceEmail = "";
        this.serviceSize = "";
        this.serviceEnvironment = "";
        this.serviceName = "";
        this.serviceOrganization = "";
        this.serviceRuntime = ""; 
        this.serviceStartTimeEpoch = "";
        this.serviceStartTimeFinalFormat = ""; // this is a string
        this.serviceStatus = "";
        this.serviceBasicAuthPassword = "";
        this.serviceBasicAuthUsername = "";
        this.serviceDatabaseStorage = "";
        this.serviceSqlDatabaseName = "";
        this.serviceSqlDatabasePass = "";
        this.serviceSqlDatabaseUser = "";
        this.serviceWebrootStorage = "";
        this.serviceWordpressAdminEmail = "";
        this.serviceWordpressAdminPass = "";
        this.serviceWordpressAdminUser = "";
        this.serviceWordpressSiteTitle = "";
        this.serviceWordpressTablePrefix = ""; 
        this.serviceDrupalAdminPass = "";
        this.serviceDrupalAdminUser = "";
        this.serviceDrupalSiteTitle = ""; 
        this.serviceShhIp = "";
        this.serviceShhKey = "";      
        this.showServDetailsModal = false;
      },

      open_restore_confirm_modal: function(serviceID) {
        this.restoreConfirmId = serviceID;
        this.showRestoreConfirmModal = true;
      },

      close_restore_confirm_modal: function() {
        this.restoreSnapshotOption = "Snapshots";
        this.restoreConfirmId = "";
        this.restoreTagConfirmInput = "";
        this.confirmRestoreSuccessMessage = "";
        this.confirmRestoreErrorMessage = "";
        this.showRestoreConfirmModal = false;
      },

      open_scan_modal: function(serviceID) {
        this.scanServiceId = serviceID;
        this.load_service_scans("initial");
        this.showScanModal = true;
      },

      close_scan_modal: function() {
        this.scanErrorMessage = "";
        this.scanSuccessMessage = "",
        this.scanServiceId = "";
        this.showScanModal = false;
      },

      submit_scan: function() {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        self.scanSuccessMessage = "";
        self.scanErrorMessage = "";

        this.loader = true;

        axios.post(baseApiUrl + "/wp-json/saas-wp/v1/scan?service=" + this.scanServiceId, {},
        {
          headers:  {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken,
          } 
        }
        ).then(function (result) {
          console.log(result);
          
          const responseCode = result.data.response.code;
          const responseMessage = result.data.body.message;

          if ( responseCode === 200 ) {

            self.scanSuccessMessage = "Scan initiated. Once ready it will be loaded into the bottom of the list below.";
            self.scanErrorMessage = "";
            self.loader = false;

          } else {

            self.scanSuccessMessage = "";
            self.scanErrorMessage = responseMessage;
            self.loader = false;

          }
          
        })
        .catch(function (error) {

          console.log(error);
          self.scanErrorMessage = error.response;
          self.scanSuccessMessage = "";
          self.loader = false;

        });

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

      submit_restore_confirm: function() {

        if ( this.restoreTagConfirmInput !== this.restoreSnapshotOption ) {
          this.confirmRestoreErrorMessage = "Incorrect. Please try again.";
          this.confirmRestoreSuccessMessage = "";
          return;
        } 

        this.confirmRestoreErrorMessage = "";
        this.confirmRestoreSuccessMessage = "Restoring...";
        this.action_service(this.restoreConfirmId, 'restore');
        this.close_restore_confirm_modal();

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
  
      load_user_service_details: function(servSearchTerm) {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        if ( this.selectedOrganisationID === "" ) {
          return;
        }

        if ( servSearchTerm === "" && this.servInitialRendering ) {
          self.loader = true;
        }
  
        const organisationID = this.selectedOrganisationID;
  
        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/services?organization=" + organisationID,
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {
          const objectResult = JSON.parse(result.request.response);
          const serviceArray = objectResult.body;

          if ( servSearchTerm === "" || servSearchTerm === undefined || typeof servSearchTerm === "object" ) {
              const possibleEmptyMessage = JSON.stringify(serviceArray);

            if ( possibleEmptyMessage === '{"message":"No such organization"}' ) {

              self.serviceArray = '{"message":"No such organization"}';
              self.servInitialRendering = false;
              self.loader = false;

            } else if ( possibleEmptyMessage === '{"message":"Not a valid ID"}' ) {

              self.serviceArray = '{"message":"Not a valid ID"}';
              self.servInitialRendering = false;
              self.loader = false;

            } else {

              self.serviceArray = serviceArray;
              self.servInitialRendering = false;
              self.loader = false;

            }

          } else {

            let filteredArray = [];

            for ( i=0; i<serviceArray.length; i++ ) {
              
              if ( (serviceArray[i].name).toLowerCase().includes(servSearchTerm.toLowerCase()) ||  
              (serviceArray[i].application).toLowerCase().includes(servSearchTerm.toLowerCase()) ||
              (serviceArray[i].email).toLowerCase().includes(servSearchTerm.toLowerCase()) || 
              (serviceArray[i].environment).toLowerCase().includes(servSearchTerm.toLowerCase()) ||
              (serviceArray[i].domain).toLowerCase().includes(servSearchTerm.toLowerCase()) ||
              (serviceArray[i].status).toLowerCase().includes(servSearchTerm.toLowerCase()) ) {

                filteredArray.push(serviceArray[i]);

              }
            }

            self.serviceArray = filteredArray;
            self.servInitialRendering = false;
            self.loader = false;

          }

        })
        .catch(function (error) {
          console.log(error.response);
          self.servInitialRendering = false;
          self.loader = false;
        });
  
      },

      load_org_snapshots: function(snapshotSearchTerm) {

        const organization = this.selectedOrganisationID;
        
        let authToken;
        let self = this;
          if ( sessionStorage.getItem("token") !== null ) {
            authToken = sessionStorage.getItem("token");
          }

          if ( localStorage.getItem("token") !== null ) {
            authToken = localStorage.getItem("token");
          }
          
          let snapshotArray = [];

          if ( snapshotSearchTerm === "" && this.snapshotInitialRendering ) {
            self.loader = true;
          }

          axios.get(baseApiUrl + "/wp-json/saas-wp/v1/snapshots",
            {
              headers:  {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
              },
              params: {
                organization
              }
            }
          ).then(function (result) {
            const objectResult = JSON.parse(result.request.response);

            for (i=0; i<objectResult.body.length; i++) {
              snapshotArray.push(
              {"_id": objectResult.body[i]._id, 
              "application": objectResult.body[i].application,
              "namespace": objectResult.body[i].namespace,
              "organization": objectResult.body[i].organization,
              "status": objectResult.body[i].status,
              "public": objectResult.body[i].public,
              "service":objectResult.body[i].service,
              "tag": objectResult.body[i].tag,
              "name": ((objectResult.body[i].tag).split(":"))[1],
              "org_name": ((objectResult.body[i].tag).split("/"))[0],
              "volumes": objectResult.body[i].volumes}
              );
            }

            let filteredSnapshotArray = [];

            if ( snapshotSearchTerm === "" || snapshotSearchTerm === undefined || typeof snapshotSearchTerm === "object") {

              self.orgSnapshots = snapshotArray;
              self.snapshotInitialRendering = false;
              self.loader = false;

            } else {

              for (i=0; i<snapshotArray.length; i++) {

                if ( (snapshotArray[i].application).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) || 
                (snapshotArray[i].namespace).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) ||
                (snapshotArray[i].organization).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) ||
                (snapshotArray[i].service).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) || 
                (snapshotArray[i].tag).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) || 
                (snapshotArray[i].name).toLowerCase().includes(snapshotSearchTerm.toLowerCase()) ) {
                  filteredSnapshotArray.push(snapshotArray[i]);
                }
  
              }

              self.orgSnapshots = filteredSnapshotArray;
              self.snapshotInitialRendering = false;
              self.loader = false;

            }

            self.orgSnapshotsRestoreArray = snapshotArray;
            self.snapshotInitialRendering = false;
            self.loader = false;

          })
          .catch(function (error) {
            console.log(error);
            self.snapshotInitialRendering = false;
            self.loader = false;
          });

      },

      load_service_scans: function(status) {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        const serviceID = this.scanServiceId;
        if( status === "initial" ) {
          this.loader = true;
        }
  
        axios.get(baseApiUrl + "/wp-json/saas-wp/v1/scans?service=" + serviceID, 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            }
          }
        ).then(function (result) {
          console.log(result.data.body);
          self.serviceScansArray = result.data.body;
          self.loader = false;
        })
        .catch(function (error) {
          console.log(error.response);
          self.loader = false;
        });

      },

      service_toggle: function() {

        if ( this.showServices ) {
          this.showServices = false;
        } else {
          this.showServices = true;
        }

        if ( this.serviceToggleText === "Hide Services" ) {
          this.serviceToggleText = "Show Services";
        } else {
          this.serviceToggleText = "Hide Services";
        }

      },

      snapshot_toggle: function() {

        if ( this.showSnapshots ) {
          this.showSnapshots = false;
        } else {
          this.showSnapshots = true;
        }

        if ( this.snapshotToggleText === "Hide Snapshots" ) {
          this.snapshotToggleText = "Show Snapshots";
        } else {
          this.snapshotToggleText = "Hide Snapshots";
        }

      },

      select_org_default: function(orgID) {
        sessionStorage.setItem("orgID", orgID);
       if ( this.$route.fullPath === "/dashboard" ) {
          location.reload();
        } else {
          window.location.href = "/#/dashboard";
        };
      },

      action_service: function(serviceID, action) {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }

        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        if ( action === "restore" && this.restoreSnapshotOption === "Snapshots" ) {
          this.confirmRestoreErrorMessage = "Select a snapshot to restore.";
          return;
        }

        if ( action === "restore" && this.restoreSnapshotOption !== "Snapshots" ) {

          axios.post(baseApiUrl + "/wp-json/saas-wp/v1/service/action", {}, 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            },
            params: {
              id: serviceID,
              action,
              snapshot: this.restoreSnapshotOption
            }
          }
        ).then(function (result) {
          const objectResult = JSON.parse(result.request.response);
          self.load_user_service_details();
        })
        .catch(function (error) {
          console.log(error);
        });

        } else {

          axios.post(baseApiUrl + "/wp-json/saas-wp/v1/service/action", {}, 
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            },
            params: {
              id: serviceID,
              action,
            }
          }
          ).then(function (result) {
            const objectResult = JSON.parse(result.request.response);
            console.log(objectResult);
            self.load_user_service_details();
          })
          .catch(function (error) {
            console.log(error);
          });

        }

      },

      set_restore_snapshot_option: function(event) {
        this.restoreSnapshotOption = event.target.value;
      },

      delete_service: function(serviceID) {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }

        self.serviceDeleteErrorMessage = "";
    
        axios.delete(baseApiUrl + "/wp-json/saas-wp/v1/service?id=" + serviceID,
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            } 
          }
        ).then(function (result) {
          const objectResult = JSON.parse(result.request.response);
          const message = objectResult.response.message;
          
          if ( message === "OK" ) {
            self.load_user_service_details();
            self.serviceDeleteErrorMessage = "";
          } else if ( message === "Bad Request" ) {
            self.serviceDeleteErrorMessage = "Cannot delete running service.";
          }  else {
            self.serviceDeleteErrorMessage = "Something unexpected happened. Please try again.";
          }
          
        })
        .catch(function (error) {

          console.log(error);
          self.serviceDeleteErrorMessage = "There was an error on our end, please try again!";

        });

      },

      submit_serv_snapshot: function() {

        const name = this.snapshotName;
        const snapshotID = this.servSnapshotID;

        let self = this;

        if ( name === "" ) {
        
          this.snapshotErrorMessage = "Please fill in the name.";
          this.snapshotSuccessMessage = "";
  
        } else if ( name.length > 20 ) {
  
          this.snapshotErrorMessage = "Name cannot be more than 20 characters long.";
          this.snapshotSuccessMessage = "";
  
        } else {

          let authToken;
          if ( sessionStorage.getItem("token") !== null ) {
            authToken = sessionStorage.getItem("token");
          }

          if ( localStorage.getItem("token") !== null ) {
            authToken = localStorage.getItem("token");
          }

          self.loader = true;
          
          axios.post(baseApiUrl + "/wp-json/saas-wp/v1/snapshot", {}, 
            {
              headers:  {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
              },
              params: {
                id: snapshotID,
                name: name
              }
            }
          ).then(function (result) {
            const objectResult = JSON.parse(result.request.response);

            if ( objectResult.body.message === "Service must be running to snapshot" ) {
              self.snapshotErrorMessage = "Service must be running to snapshot.";
              self.snapshotSuccessMessage = "";
              self.loader = false;
            } else if ( objectResult.body.message === "Service already being snapshotted" ) {
              self.snapshotErrorMessage = "Service already being snapshotted.";
              self.snapshotSuccessMessage = "";
              self.loader = false;
            } else if ( objectResult.response.message === "OK" ) {
              self.snapshotSuccessMessage = "Snapshot successful.";
              self.load_user_service_details();
              self.load_org_snapshots();
              self.snapshotErrorMessage = "";
              self.loader = false;
              self.showServSnapshotModal = false;
              document.getElementById('snapshot-area').scrollIntoView();
            } else {
              self.snapshotErrorMessage =  objectResult.body.message;
              self.snapshotSuccessMessage = "";
              self.loader = false;
            }

          })
          .catch(function (error) {
            console.log(error);
            self.snapshotErrorMessage = "There was an error on our end, please try again!";
            self.snapshotSuccessMessage = "";
            self.loader = false;
          });
    
        }

      },

      delete_snapshot: function(snapshotID) {

        let authToken;
        let self = this;
        if ( sessionStorage.getItem("token") !== null ) {
          authToken = sessionStorage.getItem("token");
        }
  
        if ( localStorage.getItem("token") !== null ) {
          authToken = localStorage.getItem("token");
        }
    
        axios.delete(baseApiUrl + "/wp-json/saas-wp/v1/snapshot?id=",
          {
            headers:  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
            },
            params: {
              id: snapshotID
            }
          }
        ).then(function (result) {
          const objectResult = JSON.parse(result.request.response);
          self.load_org_snapshots();
        })
        .catch(function (error) {
          console.log(error);
          console.log("An error occured on this page. Please refresh and try again");
        });

      },

      re_render_arrays: function () {
        let self = this;
        self.setInterval_ID = setInterval(function () { 
          self.load_user_organisation_details();
          self.load_user_service_details(self.servSearchTerm);
          self.load_org_snapshots(self.snapshotSearchTerm);
          self.load_service_scans();
        }, 3000);
      },

      scroll: function(refName) {

        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
  
      },

      copyToClipboard: function(id) {

        const textToCopy = document.getElementById(id);

        /* Select the text field */
        textToCopy.select();
        textToCopy.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

      },

      convert_epoch_seconds: function(epochSeconds) {

        const timestamp = epochSeconds;
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return year + "/" + month + "/" + day + " - " + hours + ":" + minutes + ":" + seconds;

      }

    },
    
    mounted() {
      
      // Redirect to login page if user isn't logged in (i.e token can't be found in local or session storage):
      if ( sessionStorage.getItem("token") === null && localStorage.getItem("token") === null ) {
        window.location.href = "/#/login";
      }

      if ( sessionStorage.getItem("orgID") !== null ) {
        this.selectedOrganisationID = sessionStorage.getItem("orgID");
      }
  
      // Load the user organisation, services and snapshot initially into the DOM:
      this.load_user_organisation_details();
      this.load_user_service_details();
      this.load_org_snapshots();
      this.re_render_arrays();
  
    },

    beforeDestroy() {
      clearInterval(this.setInterval_ID);
    }

  };

})();