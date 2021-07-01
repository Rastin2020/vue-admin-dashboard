<template>
  <div>
    <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true" 
    showorganizationsdropdownorganizations="true"></Headercomp>
    
    <div class="main-container small-screen-padding-reduced">

      <h1>Invoices</h1>
      <br>
      
      <table class="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Service(s)</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Billing Date</th>
            <!-- <th>Due Date</th> -->
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <td v-if="invoicesArray.length === 0">No invoices found.</td>
          <tr v-for="(invoice, index) in invoicesArray" :key="index">
            <td v-if="invoice.number !== null">{{invoice.number}}</td>
            <td v-else>In Progress...</td>
            <td>
              <div v-for="(invoiceItem, index) in invoice.lines.data" :key="index">
                <p>Description: {{invoiceItem.description}}</p>
                <p>Amount: {{invoiceItem.amount/100}} £</p>
              </div>
            </td>
            <td>{{invoice.total/100}} £</td>
            <td v-if="invoice.paid">YES</td>
            <td v-else>NO</td>
            <td>{{convert_epoch_seconds(invoice.created)}}</td>
            <!-- <td v-if="invoice.due_date !== null ">{{convert_epoch_seconds(invoice.due_date)}}</td>
            <td v-else-if="invoice.status === 'draft' ">In Progress...</td>
            <td v-else-if="invoice.status === 'paid' ">Paid</td>
            <td v-else-if="invoice.status === 'open'">Open Status</td> -->
            <td v-if="invoice.invoice_pdf !== null "><a :href="invoice.invoice_pdf"><img id="pdf-icon" 
              src="app/assets/icons/pdf.png" width="23px" height="30px"></a></td>
            <td v-else>In Progress...</td>
          </tr>         
        </tbody>
      </table>

    </div>

    <div class="loading-modal" v-if="loader">
      <div class="modal-content">
        <div class="spinning-loader"></div>
      </div>
    </div>

  </div>
  
</template>

<script>

module.exports = saasApp.controllers.InvoicesController;

</script>