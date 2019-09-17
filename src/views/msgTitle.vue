<template>
    <div class="Exhibition">
          <van-nav-bar title="" left-text="wad" fixed >
          <van-icon name="arrow-left" slot="left"  @click="location"/>
          </van-nav-bar>
    <div class="titleParsent"  v-for="(item,i) of list.url" :key="i">
           <img :src="'http://js.vrccn.com/'+ item.url" @click="loadMore(item.id)">
           <div  class="titleSon"></div>
            <p class="titleName">{{item.name}}</p>
    </div>
    <div v-if="list.new" class="item">
        <div v-html="list.new.info"></div>
    </div>
        <fenxiang  title="#/msgTitle" :id="this.id" ></fenxiang>
            <abc></abc>  
        </div>
</template>
<script>
import fenxiang from '../components/newsFenxiang'
import abc from '../components/text'
export default {
    data(){
        return{
             list:[],
             id:""
        }
    },
    created(){
      this.id=this.$route.query.id
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
            this.$router.go(-1)
        },
         msg(){
            var url="/getNews"
            var data={token:this.id}
            this.axios.post(url,data).then(result=>{
                this.list=result.data.data
                console.log(result.data.data)
            })
        }
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
        .titleParsent{
            position: relative;
            .titleSon{
                  position: absolute;
                  bottom:0.1rem;
                  width: 100%;
                  height:1rem;
                  z-index: 500;
                  background: #000; 
                  opacity: 0.4;
            }
            .titleName{
            position: absolute;
            bottom:0.35rem;
            color: white;
            font-size:0.4rem;
            z-index: 2000;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
                }
        }
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


