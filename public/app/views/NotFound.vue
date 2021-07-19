<template>
  <div>
    <Headercomp lefttext="DASHBOARD" righttext="LOG OUT" showorganizationsdropdown="true" 
    showorganizationsdropdownorganizations="true"></Headercomp>

    <div class="main-container">
      <h1>404 - Page not found. Head back to the <a href="/">homepage</a>.</h1>
    </div>
  </div>
</template>

<script>

module.exports = saasApp.controllers.NotFoundController;

</script>