<template>
<div class="Exhibition">
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
    },methods:{
        msg(){
            var id=this.$route.query.id
            var url="/getNews"
            var data={token:id}
            this.axios.post(url,data).then(result=>{
                this.list=result.data.data
                console.log(result)
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
            margin-top: 1.2rem;
            color: #333333;
            font-size:0.4rem;
        }
    }
</style>