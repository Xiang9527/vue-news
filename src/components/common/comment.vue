<template>
    <div class="photo-bottom">
        <ul>
            <li class="photo-comment">
                <div>
                    <span>送出評論</span>
                </div>
            </li>
            <li class="txt-comment">
                <textarea v-model="msg"></textarea>
            </li>
            <li>
                <mt-button type="primary" @click="SendComment()">發表評論</mt-button>
            </li>
            <li class="photo-comment">
                <div>
                    <span>評論列表</span>
                </div>
            </li>
        </ul>
        <ul class="comment-list">
            <li v-for="comment in comments" :key="comment.ID">{{comment.Comment}} <span style="text-right">{{moment(comment.PostTime).format('YYYY/MM/DD')}}</span></li>
        </ul>
        <div class="loadmore"><mt-button size="large" type="danger" plain @click="LoadPage()">加載更多</mt-button></div>
    </div>
</template>
<script>
import qs from 'qs';
    export default {
        data(){
            return {
                comments:[],
                pageIndex:0,
                msg:"",
            }
        },
        props:['articleID'],
        created(){
            this.LoadPage();
        },
        methods:{
            LoadPage(){
                this.$axios.get('Comment/GetComment?ArticleID=' + this.articleID + "&PageIndex=" + (++this.pageIndex))
                .then((result) => {
                    this.comments = this.comments.concat(result.data.Data);
                }).catch((err) => {
                    
                });
            },
            SendComment(){
                this.$axios.post('Comment/PostComment',qs.stringify({
                    ArticleID:this.articleID,
                    Comment:this.msg
                }),
                {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}
                )
                .then((result) => {
                    this.comments.unshift({
                        "Comment":this.msg,
                        "PostTime":moment().format('YYYY/MM/DD')
                    });
                    this.msg = "";
                }).catch((err) => {
                    
                });
            }
        }
    }
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height:30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment area {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.loadmore{
    padding-bottom: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>