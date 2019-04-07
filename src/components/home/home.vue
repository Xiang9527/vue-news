<template>
  <div>
    <!-- 輪播圖 -->
    <swipe :datas="news"></swipe>
    <!-- Grid -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'news.list'}">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-toutiaoxinwen-"></use>
              </svg>
            </span>
            <div class="mui-media-body">新聞</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'photo.list'}">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-haibaotubiao"></use>
              </svg>
            </span>
            <div class="mui-media-body">圖文</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'product.list'}">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibiaoti--"></use>
              </svg>
            </span>
            <div class="mui-media-body">商品</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liuyan"></use>
              </svg>
            </span>
            <div class="mui-media-body">留言</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo1"></use>
              </svg>
            </span>
            <div class="mui-media-body">搜尋</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibiaoti--"></use>
              </svg>
            </span>
            <div class="mui-media-body">聯繫</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      news: []
    };
  },
  created() {
    this.$axios
      .get("News/GetNewsHeadlines")
      .then(result => {
        this.news = result.data.Data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.mui-table-view.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: 0;
  margin-top: 0;
}
.mui-table-view.mui-grid-view.mui-grid-9 li {
  border: 0;
}
</style>