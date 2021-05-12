<template>
    <div>
        <Headercomp lefttext="DASHBOARD" leftlink="/#/dashboard" righttext="LOG OUT" rightlink="/#/login"></Headercomp>

        <div class="main-container">

          <h1>Dashboard</h1>

          <br>
          
          <div class="entry-content">

            <!-- ORGANIZATIONS -->
            <h2>Organizations</h2>

            <div>
              <select class="select-boxes" id="organizationSelect"><option value="" disabled="" 
              selected="">Select Organization</option></select>
            </div>

            <br>
            
            <div>
              <a class="no-decoration" href="javascript: void(0)" id="organization-table-toggle">Hide Organizations</a>
            </div>   

            <br>

            <div>
              <div id="organization-table_wrapper" class="dataTables_wrapper no-footer">
                <div class="dataTables_length" id="organization-table_length">
                  <label>Show <select name="organization-table_length" aria-controls="organization-table" class="select-boxes">
                    <option value="10">10</option>
                    <option value="25" selected="selected">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select> entries</label>
                </div>
                
                <div id="organization-table_filter" class="dataTables_filter">
                  <label>Search:<input type="search" class="select-boxes thin-border" placeholder="" aria-controls="organization-table"></label>
                </div>
                
                <table id="organization-table" width="100%" class="dataTable no-footer" role="grid" aria-describedby="organization-table_info" style="width: 100%;">
                  <thead>
                    <tr role="row">
                      <th class="sorting_asc" rowspan="1" colspan="1" style="width: 81px;" aria-label=""></th>
                      <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 81px;" aria-label=""></th>
                      <th class="sorting" tabindex="0" aria-controls="organization-table" rowspan="1" colspan="1" style="width: 232px;" aria-label="Name: activate to sort column ascending">Name</th>
                      <th class="sorting" tabindex="0" aria-controls="organization-table" rowspan="1" colspan="1" style="width: 249px;" aria-label="Owner: activate to sort column ascending">Owner</th>
                      <th class="sorting" tabindex="0" aria-controls="organization-table" rowspan="1" colspan="1" style="width: 319px;" aria-label="Members: activate to sort column ascending">Members</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr class="odd">
                      <td valign="top" colspan="5" class="dataTables_empty">No organizations.</td>
                      </tr>
                  </tbody>

                </table>
                
                <div class="dataTables_info" id="organization-table_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="organization-table_paginate">
                  <a class="paginate_button previous disabled" aria-controls="organization-table" data-dt-idx="0" tabindex="-1" id="organization-table_previous">Previous</a>
                  <span></span>
                  <a class="paginate_button next" aria-controls="organization-table" data-dt-idx="1" tabindex="0" id="organization-table_next">Next</a>
                  </div></div>
                </div> 

                <br>

                <div>
                  <a class="main-buttons" href="/#/new-organization">New Organization</a>
                </div>

                <br>
              
              </div>
                     
                <br>
                <!-- SERVICES -->
                <h2>Services</h2>
                
                <div>
                  <a class="no-decoration" href="javascript: void(0)" id="service-table-toggle">Hide Services</a>
                </div>

                <br>

                <div id="service-table_wrapper" class="dataTables_wrapper no-footer" style="">
                  <div class="dataTables_length" id="service-table_length">
                    <label>Show 
                      <select name="service-table_length" aria-controls="service-table" class="select-boxes">
                        <option value="10">10</option>
                        <option value="25" selected="selected">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select> entries</label>
                  </div>
                  
                  <div id="service-table_filter" class="dataTables_filter">
                    <label>Search:
                      <input type="search" class="select-boxes thin-border" placeholder="" aria-controls="service-table">
                    </label>
                  </div>
                  
                  <div class="dataTables_scroll">
                    <div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;">
                      <div class="dataTables_scrollHeadInner" style="box-sizing: content-box; width: 100%; padding-right: 0px;">
                        <table width="100%" class="dataTable no-footer" role="grid" style="margin-left: 0px; width: 100%;">
                          <thead>
                            <tr role="row">
                              <th class="sorting_asc" rowspan="1" colspan="1" style="width: 0px;" aria-label=""></th>
                              <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 0px;" aria-label=""></th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 48px;" aria-label="Name: activate to sort column ascending">Name</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 44px;" aria-label="Email: activate to sort column ascending">Email</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 104px;" aria-label="Organization: activate to sort column ascending">Organization</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 92.6667px;" aria-label="Application: activate to sort column ascending">Application</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 102.667px;" aria-label="Environment: activate to sort column ascending">Environment</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 63.3333px;" aria-label="Domain: activate to sort column ascending">Domain</th>
                              <th class="sorting" tabindex="0" aria-controls="service-table" rowspan="1" colspan="1" style="width: 50px;" aria-label="Status: activate to sort column ascending">Status</th>
                              <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 53.3333px;" aria-label="Action">Action</th>
                              <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 75.3333px;" aria-label="Snapshot">Snapshot</th>
                              <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 61.3333px;" aria-label="Restore">Restore</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                    
                    <div class="dataTables_scrollBody" style="position: relative; overflow: auto; width: 100%;">
                      <table id="service-table" width="100%" class="dataTable no-footer" role="grid" aria-describedby="service-table_info" style="width: 100%;">
                        <thead>
                          <tr role="row" style="height: 0px;">
                            <th class="sorting_asc" rowspan="1" colspan="1" style="width: 0px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;"></div>
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 0px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;"></div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 48px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Name: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Name</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 44px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Email: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Email</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 104px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Organization: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Organization</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 92.6667px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Application: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Application</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 102.667px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Environment: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Environment</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 63.3333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Domain: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Domain</div>
                            </th>
                            <th class="sorting" aria-controls="service-table" rowspan="1" colspan="1" style="width: 50px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Status: activate to sort column ascending">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Status</div>
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 53.3333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Action">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Action</div>
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 75.3333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Snapshot">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Snapshot</div>
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 61.3333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Restore">
                              <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Restore</div>
                            </th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          <tr class="odd">
                            <td valign="top" colspan="12" class="dataTables_empty">No services under this organization</td>
                          </tr>
                        </tbody>
                        
                      </table>
                    </div>
                  </div>
                  
                  <div class="dataTables_info" id="service-table_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
                    <div class="dataTables_paginate paging_simple_numbers" id="service-table_paginate">
                      <a class="paginate_button previous disabled" aria-controls="service-table" data-dt-idx="0" tabindex="-1" id="service-table_previous">Previous</a>
                      <span></span>
                      <a class="paginate_button next" aria-controls="service-table" data-dt-idx="1" tabindex="0" id="service-table_next">Next</a>
                    </div>
                  
                </div>

                  <br>

                  <div>
                    <a class="main-buttons" href="/#/new-service">New Service</a>
                  </div>

                  <br><br>

                  <div id="snapshot-table_wrapper" class="dataTables_wrapper no-footer">
                    <div class="dataTables_length" id="snapshot-table_length">
                      <label>Show 
                        <select name="snapshot-table_length" aria-controls="snapshot-table" class="select-boxes">
                          <option value="10">10</option>
                          <option value="25" selected="selected">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select> entries
                      </label>
                    </div>
                    
                    <div id="snapshot-table_filter" class="dataTables_filter">
                      <label>Search:
                        <input type="search" class="select-boxes thin-border" placeholder="" aria-controls="snapshot-table">
                        </label>
                    </div>
                    
                    <div class="dataTables_scroll">
                      <div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;">
                        <div class="dataTables_scrollHeadInner" style="box-sizing: content-box; width: 100%; padding-right: 0px;">
                          <table width="100%" class="dataTable no-footer" role="grid" style="margin-left: 0px; width: 100%;">
                            <thead>
                              <tr role="row">
                                <th class="sorting_asc" rowspan="1" colspan="1" style="width: 147.333px;" aria-label=""></th>
                                <th class="sorting" tabindex="0" aria-controls="snapshot-table" rowspan="1" colspan="1" style="width: 288px;" aria-label="Tag: activate to sort column ascending">Tag</th>
                                <th class="sorting" tabindex="0" aria-controls="snapshot-table" rowspan="1" colspan="1" style="width: 601.333px;" aria-label="Application: activate to sort column ascending">Application</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                      
                      <div class="dataTables_scrollBody" style="position: relative; overflow: auto; width: 100%;">
                        <table id="snapshot-table" width="100%" class="dataTable no-footer" role="grid" aria-describedby="snapshot-table_info" style="width: 100%;">
                          <thead>
                            <tr role="row" style="height: 0px;">
                              <th class="sorting_asc" rowspan="1" colspan="1" style="width: 147.333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="">
                                <div class="dataTables_sizing" style="height: 0px; overflow: hidden;"></div>
                              </th>
                              <th class="sorting" aria-controls="snapshot-table" rowspan="1" colspan="1" style="width: 288px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Tag: activate to sort column ascending">
                                <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Tag</div>
                              </th>
                              <th class="sorting" aria-controls="snapshot-table" rowspan="1" colspan="1" style="width: 601.333px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Application: activate to sort column ascending">
                                <div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Application</div>
                              </th>
                            </tr>
                          </thead>
                          
                          <tbody>
                            <tr class="odd">
                              <td valign="top" colspan="3" class="dataTables_empty">No snapshots under this organization</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div class="dataTables_info" id="snapshot-table_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
                    <div class="dataTables_paginate paging_simple_numbers" id="snapshot-table_paginate">
                      <a class="paginate_button previous disabled" aria-controls="snapshot-table" data-dt-idx="0" tabindex="-1" id="snapshot-table_previous">Previous</a>
                      <span></span>
                      <a class="paginate_button next" aria-controls="snapshot-table" data-dt-idx="1" tabindex="0" id="snapshot-table_next">Next</a>
                    </div>
                  </div>

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

$("document").ready(function() {

  $("#organization-table-toggle").click(function() {

    if ( $("#organization-table_wrapper").css("display") !== "none" ) {
      $("#organization-table_wrapper").css("display", "none");
      $("#organization-table-toggle").text("Show Organizations");
    } else {
      $("#organization-table_wrapper").css("display", "");
      $("#organization-table-toggle").text("Hide Organizations");
    }

  });

  $("#service-table-toggle").click(function() {

    if ( $("#service-table_wrapper").css("display") !== "none" ) {
      $("#service-table_wrapper").css("display", "none");
      $("#service-table-toggle").text("Show Services");
    } else {
      $("#service-table_wrapper").css("display", "");
      $("#service-table-toggle").text("Hide Services");
    }

  });

})

</script>