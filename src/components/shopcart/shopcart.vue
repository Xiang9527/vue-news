<template>
    <div class="bartablmargin">
        <nav-bar title="購物車"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in cartGoods" :key="goods.ID"  class="p-list">
                    <mt-switch v-model="goods.Picked"></mt-switch>
                    <img :src="goods.Image">
                    <div class="pay-calc">
                        <p v-text="goods.ProductName"></p>
                        <div class="calc">
                            <span>${{goods.SalePrice}}</span>
                            <span @click="sub(index)">-</span>
                            <span >{{goods.Quantity}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <span>商品數量為{{Payment.quantity}}件，總金為${{Payment.amount}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">結帳</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
	import dataBus from '../common/databus.js';
    import productDatas from '../common/productDatas.js';
    export default {
        data(){
            return {
                cartGoods:[],
            }
        },
        created(){
            let vm = this;
            let prods = productDatas.getProds();
            let url = 'Product/GetProductByIDs?ids=' + Object.keys(prods).join(',');
            this.$axios.get(url).then((result) => {
                result.data.Data.forEach(function (item){
                    vm.cartGoods.push({
                        ID:item.ID,
                        ProductName:item.ProductName,
                        SalePrice:item.SalePrice,
                        Image:item.Image,
                        Quantity:prods[item.ID],
                        Picked:true,
                    })
                })
            }).catch((err) => {
                
            });
        },
        methods:{
            add(idx){
                this.cartGoods[idx].Quantity++;
                dataBus.$emit('addShopCart',1);
                productDatas.addOrUpate({
                    id:this.cartGoods[idx].ID,
                    num:1
                });
            },
            sub(idx){
                if(this.cartGoods[idx].Quantity > 1){
                    this.cartGoods[idx].Quantity--;
                    dataBus.$emit('addShopCart',-1);
                    productDatas.addOrUpate({
                        id:this.cartGoods[idx].ID,
                        num:-1
                    });
                }
            },
            del(idx){
                productDatas.delete(this.cartGoods[idx].ID);
                 dataBus.$emit('addShopCart',-this.cartGoods[idx].Quantity);
                 this.cartGoods.splice(idx,1);
            }
        },
        computed:{
            Payment(){
                let quantity = 0;
                let amount = 0;
                this.cartGoods.forEach((el) => {
                    if(el.Picked){
                        quantity += el.Quantity;
                        amount += el.Quantity * el.SalePrice;
                    }
                });
                return {
                    quantity,amount
                };
            }
        }
    }
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>