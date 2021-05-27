<template>
  <div class="tool-bar fixed-top" md-elevation="0">
    <div class="options container p-1">
      <h3 class="brand">News</h3>
      <router-link class="text-decoration-none ms-auto" to="/"
        ><span class="mx-3 link-text">Home</span></router-link
      >
      <div class="dropdown">
        <button data-bs-toggle="dropdown" aria-expanded="false">Section</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('arts')"
          >
            Arts
          </li>
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('health')"
          >
            Health
          </li>
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('technology')"
          >
            Technology
          </li>
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('movies')"
          >
            Movies
          </li>
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('science')"
          >
            Science
          </li>
          <li
            class="dropdown-item text-dark text-decoration-none"
            @click="loadNews('home')"
          >
            World
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { newsActions } from "@/utils/types";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const news = namespace("News");

@Component
export default class NavBar extends Vue {
  @news.Action(newsActions.TOP_NEWS)
  public topNews!: (section: string) => void;

  loadNews(section: string) {
    this.topNews(section);
  }
}
</script>

<style lang="scss">
.tool-bar {
  padding-top: 0.5rem;
  background: white !important;
  .options {
    padding: 0.5rem 2.2rem !important;
    display: flex;
    @media screen and (max-width: 768px) {
      padding: 0rem 1.1rem;
    }
    .link-text {
      color: black;
    }
    .dropdown {
      cursor: pointer;
      button {
        background: white;
        box-shadow: none;
        border: none;
      }
    }
  }
}
</style>
