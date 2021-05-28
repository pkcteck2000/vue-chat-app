<template>
  <div class="wrapper">
    <header>
      <h1>Chat with Firebase!</h1>
      <button @click="logout">Logout!</button>
    </header>

    <section>
      <main>
        <div
          v-for="(msg, index) in allMessages"
          v-bind:key="'index-' + index"
          :class="['message', sentOrReceived(msg.userUID)]"
        >
          <img :src="msg.photoURL" :alt="msg.displayName" />
          <p>{{ msg.text }}</p>
        </div>

        <div ref="scrollable"></div>
      </main>

      <form v-on:submit.prevent="sendMessage">
        <input
          v-model="message"
          type="text"
          placeholder="Enter your message!"
        />
        <button :disabled="!message" type="submit">
          <i class="fa fa-send"></i>
        </button>
      </form>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class ChatApp extends Vue {
  user = firebase.auth().currentUser;
  message = "";
  db = firebase.firestore();
  allMessages: any = [];

  logout(): void {
    firebase.auth().signOut();
  }

  sentOrReceived(userUID: string): string {
    return userUID === this.user?.uid ? "sent" : "received";
  }

  async sendMessage() {
    const messageInfo = {
      userUID: this.user?.uid,
      displayName: this.user?.displayName,
      photoURL: this.user?.photoURL,
      text: this.message,
      createdAt: Date.now(),
    };
    await this.db.collection("chats").add(messageInfo);
    this.message = "";
  }

  created() {
    this.db
      .collection("chats")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.allMessages = querySnap.docs.map((doc) => doc.data());
      });
  }
}
</script>

<style lang="scss">
</style>

