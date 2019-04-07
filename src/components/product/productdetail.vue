<template>
    <div class="bartablmargin">
        <nav-bar title="商品詳情"></nav-bar>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-span">
                        {{product.ProductName}}
                    </span>
                </li>
                <swipe :datas="product.Image"></swipe>
                <li class="price-li">
                    市場價：<s>${{product.MarketPrice}}</s> 
                    特惠價：<span>${{product.SalePrice}}</span></li>
                <li class="number-li">購買數量：<span @click="Substract()">-</span><span>{{num}}</span><span @click="add()">+</span></li>
                <li>
                    <mt-button type="primary">立即購買</mt-button>
                    <mt-button @click="addShopCart()" type="danger">加入購物車</mt-button>
                </li>
            </ul>
        </div>
        <div class="product-props">
            <ul>
                <li>商品貨號{{product.ProductNo}}</li>
                <li>庫存數量{{product.Quantity}}件</li>
                <li>上架時間{{moment(product.SaleTime).format('YYYY/MM/DD')}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import dataBus from '../common/databus.js';
    import prodDatas from '../common/productDatas.js';
    import productDatas from '../common/productDatas.js';
    export default {
        data(){
            return {
                num:1,
                product:{},
            }
        },
        created(){
                this.$axios.get('Product/GetProductByID?id=' + this.$route.query.id)
                .then((result) => {
                    this.product = result.data.Data;
                    let tempImage = {
                        Image:this.product.Image,
                        URL:""
                    }
                    this.product.Image = [].concat(tempImage);
                }).catch((err) => {
                    
                });   
        },
        methods:{
            Substract(){
                if(this.num > 1){
                    this.num -= 1;
                }
            },
            add(){
                if(this.num < this.product.Quantity){
                    this.num += 1;
                }
            },
            addShopCart(){
                dataBus.$emit('addShopCart',this.num)
                this.isShow = true;
                productDatas.addOrUpate({
                    id:this.$route.query.id,
                    num:this.num
                });
                console.log(productDatas.getProds());
            }
        }
    }
</script>
<style scoped>
.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

img{
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	margin:auto;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}
</style>