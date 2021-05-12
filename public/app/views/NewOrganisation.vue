<template>
    <div>
        <Headercomp lefttext="DASHBOARD" leftlink="/#/dashboard" righttext="LOG OUT" rightlink="/#/login"></Headercomp>

        <div class="main-container">

          <h1>Add Organization</h1>

          <form class="two-third" name="new-organisation" action="./new-organisation" method="post">
            <label for="organisation_name">Name <span class="required">*<span></label>
            <br>
            <input class="form-input full-width" type="text" name="organisation_name" id="organisation_name" required>
            <br><br>
            <label for="organisation_members">Members <span class="required">*<span></label>
            <br>
            <textarea class="full-width top-margin" name="organisation_members" id="organisation_members" rows="4">
            </textarea>
            <p><i>Comma seperated list of emails.</i></p> 
            <button type="submit" name="submit" class="btn btn-animate">Create</button>    
          </form>
        
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

</script>