<template>
<div class="Exhibition">
    <van-nav-bar title="" left-text="wad" fixed >
    <van-icon name="arrow-left" slot="left" @click="href" />
    </van-nav-bar>
    <div v-for="(item,i) of list.url" :key="i" @click="location(item.id)">
        <img :src="'http://js.vrccn.com/' + item.url" alt="">
    </div>
   <div v-if="list.new" class="item" v-html="list.new.info"></div>
</div>
</template>
<script>
export default {
    name:'News',
    data(){
        return{
            list:[],
        }
    },
    created(){
        this.msg()
        alert()
    },methods:{
        href(){
        },
        location(id){
            var url="/getNews"
            var data={token:id}
            this.axios.post(url,data).then(result=>{
            this.list=result.data.data
            })
        },
        msg(){
            var id=this.$route.query.id
            alert(id)
            var url="/getNews"
            var data={token:id}
            this.axios.post(url,data).then(result=>{
            this.list=result.data.data
            })
        }
    },mounted(){

    }
}
</script>
<style lang="scss" scoped>
    .Exhibition{
        width:90%;
        height:500px;
        margin: 0 auto;
        .item{
            color: #333333;
            font-size:0.4rem;
            letter-spacing: 4px;
        }
    }
</style>