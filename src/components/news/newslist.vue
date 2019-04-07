<template>
    <div class="bartablmargin">
        <nav-bar title="新聞列表"></nav-bar>
        <ul class="mui-table-view">
            <li v-for="(news,index) in newList" :key="index" class="mui-table-view-cell mui-media">
                <router-link :to="{name:'news.detail',query:{id:news.ID}}">
                    <img class="mui-media-object mui-pull-left" :src="news.Image">
                    <div class="mui-media-body">
                        {{news.Title}}
                        <p class='mui-ellipsis'>發表時間：{{moment(news.PublishDate).format('YYYY/MM/DD hh:mm:ss a')}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newList:[],
            }
        },
        created(){
            this.$axios.get("News/GetNewsList")
            .then(result => {
                this.newList = result.data.Data;
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
</script>
<style scoped>

</style>