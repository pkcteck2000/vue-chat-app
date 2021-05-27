<template>
  <div id="app" class="container">
    <NavBar />
    <router-view class="router-view" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: { NavBar },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
#app {
  padding-bottom: 5rem;
}
</style>
