<template>
  <navigation />
</template>

<script>
// Manual: https://parttimedeveloper.medium.com/how-to-create-a-navigation-bar-in-vue-js-8a70e7f29f80
// Manual: https://v3.vuejs.org/guide/single-file-component.html#introduction

/**
 * TODO: This app uses TS. Do you really need to use plain JS in component code? Looks wierd. 
 */

import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  }
};
</script>
