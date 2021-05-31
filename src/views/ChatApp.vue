<template>
  <div class="chat-app">
    <div class="title"><span>Chat with anyone</span></div>
    <div class="display-message">
      <div
        v-for="(msg, index) in allMessages"
        :key="index"
        :class="msg.userUID === user.uid ? 'my-message' : ''"
        class="message"
      >
        <img :src="msg.photoURL" :alt="msg.displayName" />
        <p>{{ msg.text }}</p>
      </div>
    </div>
    <div class="fixed-bottom input-div">
      <form @submit.prevent="sendMessage" class="form">
        <input
          v-model="message"
          type="text"
          placeholder="Enter your message!"
          class="form-control"
        />
        <button :disabled="!message" type="submit" class="btn button">
          <i class="fa fa-send"></i>
        </button>
      </form>
    </div>
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
    console.log(userUID, this.user?.uid);

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

  updated() {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
    console.log("lopp");
  }
}
</script>

<style lang="scss">
.chat-app {
  padding: 3rem 3rem 3rem 1.7rem;
  min-height: 15rem;
  @media screen and (max-width: 768px) {
    padding: 4rem 0rem 0rem 0rem;
  }
  padding-top: 4.3rem;
  .title {
    position: fixed;
    background: white;
    width: 100%;
    span {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .display-message {
    padding: 1.5rem 0rem 1rem;
    .message,
    .my-message {
      display: flex;
      align-items: center;
      padding-top: 1rem;
      img {
        border-radius: 50%;
        width: 2.2rem;
      }
      p {
        margin-left: 0.5rem;
        margin-top: 1rem;
        padding: 0.2rem 1rem 0.2rem 1rem;
        background: rgb(212, 223, 245);
        border-radius: 1rem;
        color: rgb(50, 4, 95);
      }
    }

    .my-message {
      justify-content: flex-end;
      img {
        order: 2;
      }
      p {
        margin-right: 0.5rem;
        background: rgb(215, 243, 206);
        order: 1;
      }
    }
  }

  .input-div {
    padding: 0.5rem 11.5rem 0rem 10rem;

    @media screen and (max-width: 768px) {
      padding: 0rem;
    }
    background: white;
    form {
      position: sticky;
      bottom: 0;
      top: 0;
      display: flex;
      background: white;
      padding: 1rem 1rem;
      left: 0;
      input {
        box-shadow: none;
      }
    }
  }
  .fa {
    color: rgb(50, 4, 95);
  }
}
</style>

