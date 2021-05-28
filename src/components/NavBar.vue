<template>
  <div class="tool-bar fixed-top" md-elevation="0">
    <div class="options container p-1">
      <div class="brand">
        <i class="fa fa-globe"></i>
        <span class="brand-text">News</span>
      </div>

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
      <router-link v-if="user" class="text-decoration-none" to="/chat"
        ><span class="mx-3 link-text">Chat <i class="fa fa-send"></i></span
      ></router-link>
      <div>
        <button v-if="user" @click="logout">Logout</button>
        <button v-else @click="login">Login</button>
      </div>
      <!-- <div>
        <button
          @click="showNotifications()"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Notifications
        </button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { newsActions } from "@/utils/types";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import firebase from "firebase";
import router from "@/router";

const news = namespace("News");

@Component
export default class NavBar extends Vue {
  @news.Action(newsActions.TOP_NEWS)
  public topNews!: (section: string) => void;

  user = firebase.auth().currentUser;

  loadNews(section: string) {
    this.topNews(section);
  }

  showNotifications(): void {
    const notification = new Notification("Ne message!", {
      body: "Hey premnath!!!",
    });

    notification.onclick = (e) => {
      window.location.href = "https://www.google.com";
    };
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).catch(console.log);
  }

  logout(): void {
    firebase.auth().signOut();
    if (router.currentRoute.name != "Home") {
      router.push({ name: "Home" });
    }
  }
}
</script>

<style lang="scss">
.tool-bar {
  font-weight: bold;
  cursor: pointer;
  padding-top: 0.5rem;
  background: white !important;
  .options {
    padding: 0.5rem 2.2rem !important;
    display: flex;
    @media screen and (max-width: 768px) {
      padding: 0rem 1.1rem;
    }
    .brand {
      font-size: 3rem;
      display: flex;
      .brand-text {
        font-size: 2rem;
        padding-left: 0.5rem;
      }
    }
    .link-text {
      color: black;
    }
    button {
      background: white;
      box-shadow: none;
      border: none;
      font-weight: bold;
    }
  }
}
</style>
