<template>
    <div>
        <mt-header title="新聞"></mt-header>
		<transition name="router" mode="out-in">
			<router-view></router-view>
		</transition>
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to="{name:'home'}">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首頁</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'member'}">
				<span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
				<span class="mui-tab-label">會員</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'shopcart'}">
				<span class="mui-icon icon-gouwuche"><span class="mui-badge">{{shopCartNum}}</span></span>
				<span class="mui-tab-label">購物車</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'search'}">
				<span class="mui-icon icon-souxun"></span>
				<span class="mui-tab-label">搜尋</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
	import dataBus from './components/common/databus.js';
	import productDatas from './components/common/productDatas.js';
    export default{
        data(){
            return{
				shopCartNum:productDatas.getTotalCount()
            }
        },created(){
			let vm = this;
            dataBus.$on('addShopCart',function (num){
				vm.shopCartNum += num;
			})
        }
    }
</script>

<style scoped>
	.router-enter-active,.router-leave-active{
		transition: opacity .5s;
	}

	.router-enter,.router-leave-to{
		opacity: 0;
	}
</style>