<template>
    <div class="bartablmargin">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="LoadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="isAutoFill" >
            <ul class="mui-table-view mui-grid-view">
                <li v-for="prod in products" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link :to="{name:'product.detail',query:{id:prod.ID}}">
                        <img class="mui-media-object" :src="prod.Image">
                        <div class="mui-media-body">{{prod.ProductName}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>${{prod.SalePrice}}</span>
                                <s>${{prod.MarketPrice}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    熱賣中
                                </div>
                                <div class="count">
                                    剩{{prod.Quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    
    export default {
        data(){
            return {
                pageIndex:0,
                products:[],
                allLoaded:false,
                isAutoFill:false,
            }
        },
        created(){
            this.GetProductDatas();
        },
        mounted(){
            $(".bartablmargin").css("height",(window.screen.height-44-40.4)+"px");
        },
        methods:{
            GetProductDatas(){
                this.$axios.get('Product/GetProduct?PageSize=6&PageIndex=' + (++this.pageIndex))
                .then((result) => {
                    this.products = this.products.concat(result.data.Data);
                    this.allLoaded = result.data.Data[0].isAllLoad;
                }).catch((err) => {
                    
                });   
            },
            LoadBottom(){
                this.$refs.loadmore.onBottomLoaded();
                this.GetProductDatas();
            }
        }
    }
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>