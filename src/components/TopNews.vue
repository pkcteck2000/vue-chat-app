<template>
  <div class="top-news">
    <div v-for="(item, index) in topNewsList" :key="index">
      <a
        :href="item.url"
        target="_blank"
        class="short-news py-3 text-dark text-decoration-none"
      >
        <div class="image"><img :src="item.multimedia[0].url" /></div>
        <div class="news">
          <div class="title">{{ item.title }}</div>
          <div class="abstract d-none d-sm-block">{{ item.abstract }}</div>
          <div class="news-publish-info d-none d-sm-flex pt-3 mt-auto">
            <div class="date">{{ item.byline }}</div>
            <div class="name ms-auto">
              {{ item.published_date.slice(0, 10) }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { newsActions } from "@/utils/types";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const news = namespace("News");

@Component
export default class TopNews extends Vue {
  @news.Getter
  public topNewsList!: string;

  @news.Action(newsActions.TOP_NEWS)
  public topNews!: () => void;

  created() {
    this.topNews();
  }
}
</script>

<style lang="scss">
.top-news {
  .short-news {
    display: flex;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: whitesmoke;
    margin-bottom: 0.8rem;
    cursor: pointer;
    .image {
      img {
        width: 15rem !important;
        height: 10rem !important;
      }
    }
    .news {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
      .title {
        font-weight: bold;
        font-size: 1.2rem;
        padding-bottom: 1rem;
      }
      .abstract {
        font-size: 1rem;
      }
      .news-publish-info {
        display: flex;
        opacity: 0.7;
      }
    }
    @media screen and (max-width: 768px) {
      .image {
        img {
          width: 10rem !important;
          height: 8rem !important;
        }
      }
      .news {
        .title {
          font-size: 1rem;
        }
      }
    }
    &:hover {
      box-shadow: 0 0 20px 15px rgba(0, 0, 0, 0.09019607843137255);
      transition: all 0.3s ease;
    }
  }
}
</style>
