<template>
    <div class="bartablmargin">
        <nav-bar title="新聞圖文"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="(category,index) in categorys" :key="index">
                    <a href="javascript:;" @click="LoadByCategory(category)">{{category}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="data in datas" :key="data.ID">
                    <router-link :to="{name:'photo.detail',params:{id:data.ID}}">
                        <img v-lazy="data.Image">
                        <p>
                            <span>{{data.Title}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                categorys:[],
                datas:[]
            }
        },
        created(){
            this.$axios.get('News/GetNewsCategory')
            .then((result) => {
                this.categorys = result.data.Data;
            }).catch((err) => {
                
            });

            this.datas = this.LoadByCategory();
        },
        methods:{
            LoadByCategory(category){
                this.$axios.get('News/GetNewsByCategory?category=' + category)
                .then((result) => {
                    this.datas = result.data.Data;
                }).catch((err) => {
                    
                });
            }
        }
    }
</script>
<style scoped>
.photo-header li{
    list-style: none;
    display: inline-block;
    margin-left: 30px;
    height: 30px;
    font-size: 120%;
}

.photo-header ul{
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
}

.photo-list li{
    list-style: none;
    position: relative;
}

.photo-list li img{
    width:100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul{
    padding-left: 0px;
    margin:0;
}

.photo-list p{
    position: absolute;
    bottom:0px;
    color: white;
    background-color: rgba(0,0,0,0.3);
    margin-bottom: 0px; 
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>