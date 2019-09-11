<template>
    <div class="Exhibition">
          <van-nav-bar title="" left-text="wad" fixed >
          <van-icon name="cross" slot="left"  @click="location" />
          </van-nav-bar>
    <div v-for="(item,i) of list.url" :key="i">
           <img :src="'http://js.vrccn.com/'+ item.url" @click="loadMore(item.id)">
    </div>
    <div v-if="list.new" class="item">
        <div v-html="list.new.info"></div>
    </div>
        <fenxiang></fenxiang>
            <abc></abc> 
        </div>
</template>
<script>
import fenxiang from '../components/fenxiang'
import abc from '../components/text'
export default {
    name:'News',
    data(){
        return{
            list:[],
            id:"",
        }
    },
    created(){
        this.id=this.$route.params.id
        this.$store.commit("msg",this.id)
        this.msg()
    },methods:{
        loadMore(id){
            var url="/getNews"
            var data={token:id}
            this.axios.post(url,data).then(result=>{
                this.list=result.data.data
            })
        },
         location(){
             this.$router.push("/")
        },
        msg(id){
            var url="/getNews"
            var data={token:this.id}
            this.axios.post(url,data).then(result=>{
                this.list=result.data.data
            })
        }
    },mounted(){
    },
    components:{
       fenxiang,
       abc 
    }
    /* localStorage.setItem("lastname", "Smith");
// 检索
document.getElementById("result").innerHTML = localStorage.getItem("lastname"); */
}
</script>
<style lang="scss" scoped>
    .Exhibition{
        width:90%;
        height:500px;
        margin: 0 auto;
        img{
            width: 100%;
            display: inline-block;
            box-shadow: 0 0 6px #999;
            margin-top: 10px;
        }
        div{
            margin: 0 auto;
        }
        .item{
            letter-spacing: 4px;
            color: #333333;
            font-size:0.4rem;
        }
    }
</style>