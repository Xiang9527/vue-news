<template>
    <div class="bartablmargin">
        <nav-bar title="新聞詳情"></nav-bar>
        <div class="detailcontent">
            <h2 class="newstitle">{{newsData.Title}}</h2>
            <div class="othercontent">{{newsData.Author}} {{moment(newsData.PublishDate).format('YYYY/MM/DD hh:mm:ss a')}}</div>
            <div class="content">{{newsData.Content}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newsData:{},
            }
        },created(){
            let id = this.$route.query.id;
            this.$axios.get('News/GetNewsByID/' + id)
            .then((result) => {
                this.newsData = result.data.Data;
            }).catch((err) => {
                
            });
        }
    }
</script>
<style scoped>
.newstitle{
    color:blue;
    margin-bottom: 20px;
}
.othercontent{
    color: #999;
    margin-bottom: 30px;
    font-size: 80%;
}
.content{
    letter-spacing:3px;
    font-size: 110%
}
.detailcontent{
    margin:10px 20px 0px 20px;
}
</style>