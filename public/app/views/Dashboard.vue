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
          <a v-on:click="service_toggle" class="no-decoration" href="javascript: void(0)">
            {{serviceToggleText}}</a>
        </div>

        <div>

          <div v-if="showServices">
            
            <br>
            <label for="org-select">Select Organization:</label>
            <select v-on:change="load_user_service_details(); load_org_snapshots(); select_org_default(selectedOrganisationID)" name="org-select" 
              class="org-select" v-model="selectedOrganisationID">
              <option v-if="organizationsArray.length === 0">No organizations found.</option>
              <option v-for="(organisation, index) in organizationsArray" v-bind:value="organisation._id" 
                :key="index">{{organisation.name}}</option>
            </select>
            <br><br>

            <div class="paginate-background-area">
              <input v-on:keyup="load_user_service_details(servSearchTerm)" v-model="servSearchTerm" 
                type="search" id="serv-search" class="search-bar" placeholder="Search:">
            </div>

            <div class="background-area">
              <div class="casing">
                <div v-if="serviceArray.length === 0 || serviceArray === serviceArrayEmptyMessage || 
                serviceArray === serviceArrayEmptyMessage2" class="center-align">No Services Found Under This 
                  Organization.</div>
                <div v-else v-for="(service, index) in serviceArray" class="card-divs low-line" :key="index">
                  <div class='col-sm card center-align'>
                    <div class="card p-3 mb-2">
                      <div class="mt-5">
                        <img src="app/assets/logos/wordpress-logo.png" width="70px" height="70px" 
                          v-if="service.application === 'Wordpress'">
                        <img src="app/assets/logos/drupal-7.png" width="70px" height="70px" 
                          v-if="service.application === 'Drupal 7'">
                        <img src="app/assets/logos/drupal-8.png" width="70px" height="70px" 
                          v-if="service.application === 'Drupal 8'">
                        <img src="app/assets/logos/drupal-9.png" width="70px" height="70px" 
                          v-if="service.application === 'Drupal 9'">
                      </div>
                      <div class="mt-5">
                        <h4 class="heading">{{service.name}}</h4>
                        <div class="mt-5">
                          <div class="mt-3">
                            <p>{{service.domain}}</p>
                            <label>Status: <span class="status">{{service.status}}</span></label>
                            <br>
                          </div>
                          <div class="horizontal-margin">
                            <button class="small-screen-margins" v-if="service.status === 'Built' || 
                              service.status === 'Starting' || service.status === 'Failed' || 
                              service.status === 'Stopped' || service.status === 'Error' || 
                              service.status === 'Deleting'" 
                            v-on:click="action_service(service._id, 'start')">Start</button>
                            <button class="small-screen-margins" v-if="service.status === 'Running' ||
                              service.status === 'Snapshotting' || service.status === 'Stopping' || 
                              service.status === 'Restoring'" v-on:click="action_service(service._id, 'stop')">
                              Stop</button>
                            <button class="small-screen-margins" v-on:click="open_serv_snapshot_modal(service)">
                              Snapshot</button>
                          </div>
                          <div class="general-margin">
                            <button class="small-screen-margins full-width" v-on:click="open_restore_confirm_modal(service._id)">
                              Restore</button>
                            <br><br><br>
                            <button class="small-screen-margins full-width cancel-button" 
                              v-on:click="open_scan_modal(service._id)">Scan</button>
                          </div>
                          <br><br><br><br>
                        </div>
                      </div>
                    </div>
                    <div class="card-buttons">
                      <div class="info-button pointer hover" v-on:click="open_serv_details_modal(service)">
                        <img class="info-icon" src="app/assets/icons/info.png" width="">
                      </div>
                      <div class="delete-service-button pointer hover" v-on:click="open_delete_confirm_modal(
                        service.name, 'serv', service._id)">
                        <img class="delete-icon" src="app/assets/icons/delete.png">
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
                    <input v-on:keyup.enter="submit_serv_snapshot" class="form-input full-width" type="text" 
                    name="service_snapshot_name" v-model="snapshotName">
                    <br><br>
                    <div v-if="snapshotErrorMessage !== ''" class="alerts-area" ref="error">
                      {{snapshotErrorMessage}}
                    </div>
                    <div v-if="snapshotSuccessMessage !== ''" class="success-area" ref="error">
                      {{snapshotSuccessMessage}}
                    </div>
                    <br>
                    <button v-on:click="close_serv_snapshot_modal" class="close-edit-modal cancel-button">
                      CLOSE</button>
                    <button v-on:click="submit_serv_snapshot" class="edit-modal-submit float-right">
                      SNAPSHOT</button>
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
                        <div class="col-sm">
                          <p>Size: {{serviceSize}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p v-if="serviceShhIp !== undefined">SSH IP: {{serviceShhIp}} 
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                              height="20px" v-on:click="copyToClipboard('ip-clip-' + index)">
                          </p>
                        </div>
                        <div class="col-sm">
                          <p v-if="serviceShhKey !== undefined">SSH Key (click to copy):  
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                              height="20px" v-on:click="copyToClipboard('ssh-clip-' + index)">
                          </p>
                        </div>
                      </div>
                      <textarea class="hidden-with-value" :id="'ip-clip-'+index">{{serviceShhIp}}</textarea>
                      <textarea class="hidden-with-value" :id="'ssh-clip-'+index">{{serviceShhKey}}</textarea>
                      <hr>
                      <div class="row">
                        <!-- <div class="col-sm">
                          <p>Runtime: {{serviceRuntime}} s</p>
                        </div> -->
                        <div class="col-sm">
                          <p>Database Storage: {{serviceDatabaseStorage}}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>Status: {{serviceStatus}}</p>
                        </div>
                        <!-- <div v-if="serviceStartTimeFinalFormat !== '1970/1/1 - 1:0:0'" class="col-sm">
                          <p>Start Time: {{serviceStartTimeFinalFormat}}</p>
                        </div> -->
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
                          <textarea class="hidden-with-value" :id="'sql-db-pass-' + serviceSqlDatabasePass">
                            {{serviceSqlDatabasePass}}</textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <p>SQL_Database Name: {{serviceSqlDatabaseName}}</p>
                        </div>
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
                            height="20px" v-on:click="copyToClipboard('basic-auth-pass-' + 
                              serviceBasicAuthPassword)">
                            <textarea class="hidden-with-value" :id="'basic-auth-pass-' + serviceBasicAuthPassword">
                              {{serviceBasicAuthPassword}}</textarea>
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
                            height="20px" v-on:click="copyToClipboard('wordpress-admin-pass-' + 
                              serviceWordpressAdminPass)">
                          </p>
                          <textarea class="hidden-with-value" :id="'wordpress-admin-pass-' + 
                            serviceWordpressAdminPass">{{serviceWordpressAdminPass}}</textarea>
                        </div>
                        <div v-if="serviceDrupalAdminPass !== undefined " class="col-sm">
                          <p>Drupal Admin Password (click to copy):
                            <img class="pointer click-indicator" src="app/assets/icons/copy.png" width="18px" 
                            height="20px" v-on:click="copyToClipboard('drupal-admin-pass-' + serviceDrupalAdminPass)">
                          </p>
                          <textarea class="hidden-with-value" :id="'drupal-admin-pass-' + serviceDrupalAdminPass">
                            {{serviceDrupalAdminPass}}</textarea>
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
                    <button v-on:click="close_serv_details_modal" class="close-edit-modal cancel-button">
                      CLOSE</button>
                  </div>
                </div>                  
              </div>
            </div>

            <div class="scan-modal" v-if="showScanModal">
              <div class="modal-content">
                <div class="scans main-container">
                  <div class="modal-container">
                    <h1>Scan Service</h1>
                    <br>
                    <button v-on:click="close_scan_modal" class="close-edit-modal cancel-button">
                      CLOSE</button>
                    <button v-on:click="submit_scan" class="edit-modal-submit float-right">
                      SCAN</button>
                    <br><br>
                    <div v-if="scanErrorMessage !== ''" class="alerts-area">
                      {{scanErrorMessage}}
                    </div>
                    <div v-if="scanSuccessMessage !== ''" class="success-area">
                      {{scanSuccessMessage}}
                    </div>
                    <br>
                    
                    <div v-if="serviceScansArray.length === 0" class="container">
                      <div class="row">
                        <div class="col-sm">
                          <p>No data found. Start a scan on this service.</p>
                        </div>
                      </div>
                    </div>

                    <div v-else v-for="serviceScan in serviceScansArray" :key="serviceScan._id" class="main-card">

                      <h2>* Scan Date: {{serviceScan.date}}</h2>
                      
                      <hr>
                    
                      <div class="container">

                        <div v-if="serviceScan.data.length === 0" class="row">
                          <div class="col-sm">
                            <p>No Vulnerabilities Found.</p>
                          </div>
                        </div>

                        <div v-for="serviceScanData in serviceScan.data" class="vuns-card general-padding-large">
                          <div class="row">
                            <div class="col-sm">
                              <p>Target: {{serviceScanData.Target}}</p>
                            </div>
                          </div>

                          <div v-if="serviceScanData.Vulnerabilities === undefined" class="row">
                            <div class="col-sm">
                              <p>No Vulnerabilities Found.</p>
                            </div>
                          </div>

                          <div v-else v-for="serviceScanVuns in serviceScanData.Vulnerabilities">
                            
                            <hr>

                            <div class="row">
                              <div class="col-sm">
                                <p>Vulnerability ID <span class="input-hints-format">{{serviceScanVuns.VulnerabilityID}}
                                  </span></p>
                              </div>
                              <div class="col-sm">
                                <p v-if="serviceScanVuns.Severity === 'HIGH'">Severity <span 
                                class="input-hints-format severe-color"><b>{{serviceScanVuns.Severity}}</b></span></p>
                                 <p v-if="serviceScanVuns.Severity === 'MEDIUM'">Severity <span 
                                class="input-hints-format medium-color"><b>{{serviceScanVuns.Severity}}</b></span></p>
                                 <p v-if="serviceScanVuns.Severity === 'LOW'">Severity <span 
                                class="input-hints-format low-color"><b>{{serviceScanVuns.Severity}}</b></span></p>
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-sm">
                                <p><u>CVSS</u></p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm">
                                <p>Score <span class="input-hints-format">{{serviceScanVuns.CVSS.nvd.V3Score}}</span></p>
                              </div>
                              <div class="col-sm">
                                <p>Package Name <span class="input-hints-format">{{serviceScanVuns.PkgName}}</span></p>
                              </div>
                            </div>
                            <div class="row">
                               <p>Primary URL <a :href="serviceScanVuns.PrimaryURL" class="input-hints-format" 
                                target="_blank">{{serviceScanVuns.PrimaryURL}}</a></p>
                            </div>
                          </div>
                        </div>
                        <br>

                      </div>

                    </div>

                    <br>
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
          <a v-on:click="snapshot_toggle" class="no-decoration" href="javascript: void(0)">{{snapshotToggleText}}</a>
        </div>
        <br>

        <div v-if="showSnapshots">
          
          <div class="paginate-background-area">
              <input v-on:keyup="load_org_snapshots(snapshotSearchTerm)" v-model="snapshotSearchTerm" 
                type="search" class="search-bar" placeholder="Search:">
          </div>

          <div id="snapshot-area" class="background-area">
            <div class="casing">
              <div v-if="orgSnapshots.length === 0" class="center-align">No Snapshots Found Under This 
                Organization.</div>
              <div v-for="(snapshot, index) in orgSnapshots" class="card-divs" :key="index">
                <div class='col-sm card center-align'>
                  <div class="card p-3 mb-2">
                    <div class="mt-5">
                      <h4 class="heading">{{snapshot.tag}}</h4>
                      <p>Status: {{snapshot.status}}</p>
                    </div>
                  </div>
                  <br>
                  <div v-if="snapshot.status !== 'Preparing'" class="card-buttons">
                    <div class="delete-button bottom-rounded full-width" v-on:click="open_delete_confirm_modal(
                        snapshot.name, 'snap', snapshot._id)">
                      <img class="delete-icon pointer" src="app/assets/icons/delete.png">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            <input v-on:keyup.enter="submit_delete_confirm" class="form-input full-width" type="text" 
            name="delete_name" v-model="deleteNameConfirmInput">  
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
            <button v-on:click="submit_delete_confirm" class="close-edit-modal cancel-button float-right">
              DELETE</button>
          </div>
        </div>                  
      </div>
    </div>

    <div class="restore-confirm-modal" v-if="showRestoreConfirmModal">
      <div class="modal-content">
        <div class="main-container">
          <div class="modal-container">
            <h1>Confirm Restore</h1>
            <br>
            <p>Select a snapshot to restore: <p>
            <select class="restore-select" name="snapshot-selection" v-on:change="set_restore_snapshot_option">
              <option>Snapshots</option>
              <option v-for="(snapshot, index) in orgSnapshots" v-bind:value="snapshot._id" 
                :key="index">{{snapshot.tag}}</option>
            </select>
            <br>
            <label for="delete_name">Type in the snapshot id to restore <span class="required">*<span></label>
            <br>
            <input v-on:keyup.enter="submit_restore_confirm" class="form-input full-width" type="text" 
              name="delete_name" v-model="restoreTagConfirmInput">  
            <br><br>
            <p v-if="this.restoreSnapshotOption === 'Snapshots'">Snapshot ID: <span class="input-hints-format">Please select a Snapshot!</span></p>
            <p v-else>Snapshot ID: <span class="input-hints-format">{{this.restoreSnapshotOption}}</span></p>
            <div v-if="confirmRestoreErrorMessage !== ''" class="alerts-area">
              {{confirmRestoreErrorMessage}}
            </div>
            <div v-if="confirmRestoreSuccessMessage !== ''" class="success-area">
              {{confirmRestoreSuccessMessage}}
            </div>
            <br>
            <button v-on:click="close_restore_confirm_modal" class="edit-modal-submit">CANCEL</button>
            <button v-on:click="submit_restore_confirm" class="unique-restore close-edit-modal cancel-button float-right">
              RESTORE</button>
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

module.exports = saasApp.controllers.DashboardController;

</script>