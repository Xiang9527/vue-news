<template>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(data,index) in datas" :key="index">
        <a :href="data.URL">
          <img :src="data.Image">
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        props:['datas']
    }
</script>
<style scoped>
.mint-swipe {
  max-height: 200px;
}
.mint-swipe img {
  height: 100%;
  width: 100%;
}
</style>