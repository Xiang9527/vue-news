<template>
    <div class="bartablmargin">
        <nav-bar title="圖文詳情"></nav-bar>
        <div class="detailcontent">
            <h2 class="newstitle">{{newsData.Title}}</h2>
            <div class="othercontent">{{newsData.Author}} {{moment(newsData.PublishDate).format('YYYY/MM/DD hh:mm:ss a')}}</div>
            <div class="img-box">
                <img :src="newsData.Image">
            </div>
            <div class="content">{{newsData.Content}}</div>
        </div>
        <comment :articleID="articleID"></comment>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newsData:{},
                articleID:this.$route.params.id,
            }
        },
        created(){
            this.$axios.get('News/GetNewsByID/' + this.articleID)
            .then((result) => {
                this.newsData = result.data.Data;
            }).catch((err) => {
                
            });
        },
        methods:{

        }
    }
</script>
<style scoped>
.detailcontent{
    margin:10px 20px 20px 20px;
}

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

.img-box{
	padding-bottom:100%;
}

.img-box img{
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	margin:auto;
}
</style>