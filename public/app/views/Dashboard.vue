<template>
  <div :key="componentKey">
    <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true" 
    showorganizationsdropdownorganizations="true" :key="updatePlan"></Headercomp>

    <div class="main-container">

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <h2>Dashboard</h2>
          </div>
          <div class="col-sm plan-area">
            <label for="plan-select" class="main-card-color general-padding">{{currentPlan}} Plan</label>
            <select name="plan-select" class="general-padding" v-model="planSelection">
              <option>Select a Plan</option>
              <option v-for="(details, plan, index) in availablePlans" v-bind:value="plan" :key="index">{{plan}}</option>
            </select>
            <button class="main-button general-margin no-vertical-padding" v-on:click="subscribe">Subscribe</button>
            <br>
            <div v-if="planError !=='' ">
              {{planError}}
            </div>
            <br>
          </div>
        </div>
      </div>

      <!------------------------------------ SERVICES ------------------------------------>
      <div class="main-card">

        <br>
        <a href="/#/organizations" class="main-button">See All Organizations</a>
        <br>
        <hr>

        <h2>Services</h2>
      
        <div>
          <a v-on:click="service_toggle" class="no-decoration" href="javascript: void(0)" id="service-table-toggle">{{serviceToggleText}}</a>
        </div>

        <div>

          <div v-if="showServices" id="service-table_wrapper" class="dataTables_wrapper no-footer" style="">
            
            <br>
            <label for="org-select">Select Organization:</label>
            <select v-on:change="load_user_service_details(); load_org_snapshots();" name="org-select" class="org-select" v-model="selectedOrganisationID">
              <option v-if="organizationsArray.length === 0">No organizations found.</option>
              <option v-for="(organisation, index) in organizationsArray" v-bind:value="organisation._id" :key="index">{{organisation.name}}</option>
            </select>
            <br><br>

            <div class="paginate-background-area">
              <input v-on:keyup="load_user_service_details(servSearchTerm)" v-model="servSearchTerm" type="search" id="serv-search" class="search-bar" 
              placeholder="Search:">
            </div>

            <div class="background-area scroll">
              <div class="outer">
                <div v-if="serviceArray.length === 0" class="center-align">No Services Found Under This Organization.</div>
                <div v-for="(service, index) in serviceArray" class="card-divs low-line" :key="index">
                  <div class='col-sm card center-align'>
                    <div class="card p-3 mb-2">
                      <div class="mt-5">
                        <img src="app/assets/logos/wordpress-logo.png" width="70px" height="70px" v-if="service.application === 'Wordpress'">
                        <img src="app/assets/logos/drupal-7.png" width="70px" height="70px" v-if="service.application === 'Drupal 7'">
                        <img src="app/assets/logos/drupal-8.png" width="70px" height="70px" v-if="service.application === 'Drupal 8'">
                        <img src="app/assets/logos/drupal-9.png" width="70px" height="70px" v-if="service.application === 'Drupal 9'">
                      </div>
                      <div class="mt-5">
                        <h4 class="heading">{{service.name}}</h4>
                        <div class="mt-5">
                          <div class="mt-3" :class="{ serviceHeightCompensator: service.ssh_ip === undefined || 
                          service.ssh_key === undefined }">
                            <p>{{service.email}}</p>
                            <p>{{service.environment}}</p>
                            <p>{{service.domain}}</p>
                            <label>Status: <span class="status">{{service.status}}</span></label>
                            <br><br>
                            <p v-if="service.ssh_ip !== undefined">SSH IP: {{service.ssh_ip}} 
                              <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" height="20px" 
                              v-on:click="copyToClipboard('ip-clip-' + index)">
                            </p>
                            <p v-if="service.ssh_key !== undefined">SSH Key (click to copy):  
                              <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" height="20px" 
                              v-on:click="copyToClipboard('ssh-clip-' + index)">
                            </p>
                            <textarea class="hidden-with-value" :id="'ip-clip-'+index">{{service.ssh_ip}}</textarea>
                            <textarea class="hidden-with-value" :id="'ssh-clip-'+index">{{service.ssh_key}}</textarea>
                          </div>
                            <button class="small-screen-margins" v-if="service.status === 'Built' || service.status === 'Starting' || service.status === 'Failed' ||
                            service.status === 'Stopped' || service.status === 'Error' || service.status === 'Deleting'" 
                            v-on:click="action_service(service._id, 'start')">Start</button>
                            <button class="small-screen-margins" v-if="service.status === 'Running' || service.status === 'Snapshotting' || 
                            service.status === 'Stopping' || service.status === 'Restoring'" v-on:click="action_service(service._id, 'stop')">Stop</button>
                            <button class="small-screen-margins" v-on:click="open_serv_snapshot_modal(service)">Snapshot</button>
                            <br><br><br>
                            <button class="small-screen-margins" v-on:click="action_service(service._id, 'restore')">Restore</button>
                            <select class="restore-select" v-model="restoreSnapshotOption">
                              <option>Snapshots</option>
                              <option v-for="(snapshot, index) in orgSnapshots" v-bind:value="snapshot._id" :key="index">{{snapshot.name}}</option>
                            </select>
                            <br><br><br>
                        </div>
                      </div>
                    </div>
                    <div class="card-buttons">
                      <!-- Uncomment this once edit functionality is required for services:
                      <div class="edit-button" v-on:click="open_serv_edit_modal(service)">
                        <img class="edit-icon pointer" 
                        src="app/assets/icons/edit.png">
                      </div> -->
                      <div class="edit-button" v-on:click="open_serv_details_modal(service)">
                        <img class="info-icon pointer" src="app/assets/icons/info.png" width="">
                      </div>
                      <div class="delete-button" v-on:click="open_delete_confirm_modal(service.name, 'serv', service._id)">
                        <img class="delete-icon pointer" src="app/assets/icons/delete.png">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="edit-modal" v-if="showServSnapshotModal">
              <div class="modal-content">
                <div class="main-container">
                  <div class="modal-container">
                    <h1>Snapshot Service</h1>
                    <br>
                    <label for="service_snapshot_name">Enter Snapshot Name<span class="required">*<span></label>
                    <br>
                    <input class="form-input full-width" type="text" 
                    name="service_snapshot_name" v-model="snapshotName">
                    <br><br>
                    <div v-if="snapshotErrorMessage !== ''" class="alerts-area" ref="error">
                      {{snapshotErrorMessage}}
                    </div>
                    <div v-if="snapshotSuccessMessage !== ''" class="success-area" ref="error">
                      {{snapshotSuccessMessage}}
                    </div>
                    <br>
                    <button v-on:click="close_serv_snapshot_modal" class="close-edit-modal cancel-button">CLOSE</button>
                    <button v-on:click="submit_serv_snapshot" class="edit-modal-submit float-right">SNAPSHOT</button>
                  </div>
                </div>                  
              </div>
            </div>

            <div class="service-details-modal" v-if="showServDetailsModal">
              <div class="modal-content">
                <div class="main-container">
                  <div class="modal-container">
                    <h1>{{serviceName}}</h1>
                    <hr>
                    <div class="container">

                      <div class="row">
                        <div class="col-sm">
                          <p>Application: {{serviceApplication}}</p>
                        </div>
                        <div class="col-sm">
                          <p>Domain: {{serviceDomain}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>Email: {{serviceEmail}}</p>
                        </div>
                        <div class="col-sm">
                          <p>Environment: {{serviceEnvironment}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>Organization: {{serviceOrganization}}</p>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm">
                          <p>Runtime: {{serviceRuntime}} s</p>
                        </div>
                        <div class="col-sm">
                          <p>Database Storage: {{serviceDatabaseStorage}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>Status: {{serviceStatus}}</p>
                        </div>
                        <div v-if="serviceStartTimeFinalFormat !== '1970-01-01T00:00:00.000Z'" class="col-sm">
                          <p>Start Time: {{serviceStartTimeFinalFormat}}</p>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm">
                          <p>SQL_Database User: {{serviceSqlDatabaseUser}}</p>
                        </div>
                        <div class="col-sm">
                          <p>SQL_Database Password (click to copy):
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                            height="20px" v-on:click="copyToClipboard('sql-db-pass-' + serviceSqlDatabasePass)">
                          </p>
                          <textarea class="hidden-with-value" :id="'sql-db-pass-' + serviceSqlDatabasePass">{{serviceSqlDatabasePass}}</textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>SQL_Database Name: {{serviceSqlDatabaseName}}</p>
                        </div>
                        <div class="col-sm">
                          <p>SQL_Database Host: {{serviceSqlDatabaseHost}} </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>Web Root Storage: {{serviceWebrootStorage}} </p>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-sm">
                          <p>Basic_Auth Username: {{serviceBasicAuthUsername}}</p>
                        </div>
                          <div class="col-sm">
                          <p>Basic_Auth Password (click to copy):
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                            height="20px" v-on:click="copyToClipboard('basic-auth-pass-' + serviceBasicAuthPassword)">
                            <textarea class="hidden-with-value" :id="'basic-auth-pass-' + serviceBasicAuthPassword">{{serviceBasicAuthPassword}}</textarea>
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="serviceWordpressAdminUser !== undefined " class="col-sm">
                          <p>Wordpress Admin User: {{serviceWordpressAdminUser}}</p>
                        </div>
                        <div v-if="serviceDrupalAdminUser !== undefined " class="col-sm">
                          <p>Drupal Admin User: {{serviceDrupalAdminUser}}</p>
                        </div>
                        <div v-if="serviceWordpressAdminPass !== undefined " class="col-sm">
                          <p>Wordpress Admin Password (click to copy):
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                            height="20px" v-on:click="copyToClipboard('wordpress-admin-pass-' + serviceWordpressAdminPass)">
                          </p>
                          <textarea class="hidden-with-value" :id="'wordpress-admin-pass-' + serviceWordpressAdminPass">{{serviceWordpressAdminPass}}</textarea>
                        </div>
                        <div v-if="serviceDrupalAdminPass !== undefined " class="col-sm">
                          <p>Drupal Admin Password (click to copy):
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                            height="20px" v-on:click="copyToClipboard('drupal-admin-pass-' + serviceDrupalAdminPass)">
                          </p>
                          <textarea class="hidden-with-value" :id="'drupal-admin-pass-' + serviceDrupalAdminPass">{{serviceDrupalAdminPass}}</textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="serviceWordpressAdminEmail !== undefined " class="col-sm">
                          <p>Wordpress Admin Email: {{serviceWordpressAdminEmail}}</p>
                        </div>
                        <div v-if="serviceDrupalSiteTitle !== undefined " class="col-sm">
                          <p>Drupal Site Title: {{serviceDrupalSiteTitle}}</p>
                        </div>
                        <div v-if="serviceWordpressSiteTitle !== undefined " class="col-sm">
                          <p>Wordpress Site Title: {{serviceWordpressSiteTitle}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="serviceWordpressTablePrefix !== undefined " class="col-sm">
                          <p>Wordpress Table Prefix: {{serviceWordpressTablePrefix}}</p>
                        </div>
                      </div>

                    </div>
                    
                    <br>
                    <button v-on:click="close_serv_details_modal" class="close-edit-modal cancel-button">CLOSE</button>
                  </div>
                </div>                  
              </div>
            </div>

            <br>
            <div v-if="serviceDeleteErrorMessage !== ''" class="alerts-area">
              {{serviceDeleteErrorMessage}}
            </div>

          </div>

        </div>
          
        <br>
        <div>
          <a class="main-button" href="/#/new-service">New Service</a>
        </div>

        <hr>
        
        <h2>Snapshots</h2>

        <div>
          <a v-on:click="snapshot_toggle" class="no-decoration" href="javascript: void(0)" id="snapshot-table-toggle">{{snapshotToggleText}}</a>
        </div>
        <br>

        <div v-if="showSnapshots" id="snapshot-table_wrapper" class="dataTables_wrapper no-footer">
          
          <div class="paginate-background-area">
              <input v-on:keyup="load_org_snapshots(snapshotSearchTerm)" v-model="snapshotSearchTerm" type="search" id="snap-search" class="search-bar" 
              placeholder="Search:">
          </div>

          <div class="background-area scroll">
            <div class="outer">
              <div v-if="orgSnapshots.length === 0" class="center-align">No Snapshots Found Under This Organization.</div>
              <div v-for="(snapshot, index) in orgSnapshots" class="card-divs" :key="index">
                <div class='col-sm card center-align'>
                  <div class="card p-3 mb-2">
                    <div class="mt-5">
                      <h4 class="heading">{{snapshot.tag}}</h4>
                    </div>
                  </div>
                  <br>
                  <div class="card-buttons">
                    <div class="delete-button bottom-rounded full-width" v-on:click="open_delete_confirm_modal(snapshot.name, 'snap', snapshot._id)">
                      <img class="delete-icon pointer" src="app/assets/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="main-card">
        <h2>Invoices</h2>
        <br>
        <a href="/#/invoices" class="main-button">See Your Invoices</a>
      </div>
      <!--------------------------------------------------------------------------------------->

      
    </div>

    <div class="delete-confirm-modal" v-if="showDeleteConfirmModal">
      <div class="modal-content">
        <div class="main-container">
          <div class="modal-container">
            <h1>Confirm Delete</h1>
            <br>
            <label for="delete_name">Type in the name to delete <span class="required">*<span></label>
            <br>
            <input class="form-input full-width" type="text" name="delete_name" 
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
            <button v-on:click="submit_delete_confirm" class="close-edit-modal cancel-button float-right">DELETE</button>
          </div>
        </div>                  
      </div>
    </div>

    <div class="loading-modal" v-if="loader">
      <div class="modal-content">
        <div class="spinning-loader"></div>
      </div>
    </div>
    
    <Footercomp></Footercomp>
  </div>
</template>

<script>

module.exports = saasApp.controllers.DashboardController;

</script>