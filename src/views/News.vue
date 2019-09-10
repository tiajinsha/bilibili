<template>
    <div class="Exhibition">
          <van-nav-bar title="" left-text="wad" fixed >
    <van-icon name="cross" slot="left"  @click="location" />
    </van-nav-bar>
   <div v-if="list.new" class="item" v-html="list.new.info"></div>
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
         location(){
               this.$router.push("/")
        },
        msg(){
            var url="/getNews"
            var data={token:this.id}
            this.axios.post(url,data).then(result=>{
                this.list=result.data.data
                console.log(result)
            })
        }
    },mounted(){
    },
    components:{
       fenxiang,
       abc 
    }
}
</script>
<style lang="scss" scoped>
    .Exhibition{
        width:90%;
        height:500px;
        margin: 0 auto;
        .item{
            margin-top: 1.2rem;
            color: #333333;
            font-size:0.4rem;
            text-indent:0.5rem;
            letter-spacing: 4px;
        }
    }
</style>