<template>
  <div class="all-news-list">
    <span class="header-text">All News</span>
    <div class="mt-4"><top-news /></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TopNews from "@/components/TopNews.vue";

@Component({
  components: {
    TopNews,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.all-news-list {
  margin-top: 4rem;
  padding: 0rem 1.5rem;
  @media screen and (max-width: 768px) {
    padding: 0rem 1.1rem;
  }
  .header-text {
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 2px solid red;
  }
}
</style>
