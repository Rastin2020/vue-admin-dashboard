<template>
    <div class="header">
        <a id="portal-text">SaaS Portal</a>
        <a class="right-align spaced underline" :href="`${this.rightlink}`">{{this.righttext}}</a>
        <a class="right-align spaced underline" :href="`${this.leftlink}`">{{this.lefttext}}</a>
    </div>
</template>

<script>

module.exports = {
  name: 'Header',
  // To use props, they must be declared
  props: {
    lefttext: String,
    leftlink: String,
    righttext: String,
    rightlink: String
  }
}

</script>