import { action, observable, set } from 'mobx';
import * as api from "@/api/index"
import { createPartitionTypes, createVideoByRanking, Video } from '@/models';


export class HootStore {
    @observable RankingPartitions = [];
    @observable RankingVideos: Video[] = [];
    @observable setShouldLoad = false


    @action
      reset() {
        this.RankingVideos=[]
      }
    @action
    async getRankingVideoList(rid) {
        return Promise.all([
            api.getRankingPartitions(),
            api.getRankings(rid)
        ]).then(([result1, result2]) => {
            if (result1.code === "1") {
                let partitions = createPartitionTypes(result1.data);
                // 过滤掉 番剧，电影，电视剧，纪录片
                partitions = partitions.filter((partition) => [13, 23, 11, 177].indexOf(partition.id) === -1);
                this.RankingPartitions = partitions
            }
            if (result2.code === "1") {
                const list = result2.data.list;
                const rankingVideos = list.map((data) => createVideoByRanking(data));
                this.RankingVideos = rankingVideos
            }
        })
    }
    @action
    async getVideoList(rId) {
        return api.getRankings(rId).then((result) => {
            if (result.code === "1") {
                const list = result.data.list;
                const rankingVideos = list.map((data) => createVideoByRanking(data));
                this.RankingVideos = rankingVideos.splice(0, 100)
            }
        })
    }

}

let hootStore = new HootStore();

export default hootStore;



