import { action, observable, set } from 'mobx';
import * as api from "@/api/index"
import { createPartitionTypes, createPartitionTypesTree, createVideoByRanking, PartitionType, Video } from '@/models';
import { getRankingPartitions } from '@/api/index';


export class IndexStore {
    @observable rankingVideos: Video[] = []; // 首页列表
    @observable indexVideoObj = {}; // 首页列表
    @observable Partitions = [];    //二级标题
    @observable rankingPartitions = []; // 排行榜分类
    @observable recommendVideos = []; // 推荐视频
    @observable recommandStatus = false; // 推荐视频
    @observable typeVideoObjectData = {}; // 推荐视频
    @observable error = null;
    serviceList = [];
    constructor() {
        // this.loadRepos()f
    }

    @action
    async setrankingVideos() {
        this.rankingVideos = [];
        this.typeVideoObjectData = {}
    }

    @action
    async loadRepos() {
        return Promise.all([
            api.getPartitions(),
            api.getRankings(0),
        ]).then(([res1, res2]) => {
            let partitions = createPartitionTypesTree(res1.data);
            // 过滤掉 番剧，电影，电视剧，纪录片
            partitions = partitions.filter((partition) => [13, 23, 11, 177, 166].indexOf(partition.id) === -1);
            this.Partitions = partitions
            partitions.map((item, i) => {
                this.indexVideoObj[item.name] = []
            })

            this.rankingVideos = res2.data.list?.map((data) => createVideoByRanking(data));
            this.error = null;

        }).catch(error => {
            console.log(error)
            this.rankingVideos = [];
            this.error = error;
        })
    }
    @action
    async getRankingPartitions() {
        // 获取排行榜页面分类
        getRankingPartitions().then((result) => {
            if (result.code === "1") {
                this.rankingPartitions = createPartitionTypes(result.data);
            }
        });
    }
    /**
     * 加载推荐视频
     */
    @action
    async getRankingRegion(id) {
        api.getRankingRegion({ rId: id, day: 7 }).then(result => {
            this.recommendVideos = result.data.map((data) => createVideoByRanking(data));
        })
    }
    /**
     * 加载分类视频
     */
    @action
    async getloadPartionData(item: PartitionType, cb) {
        let result = await api.getRankingRegion({ rId: item.id, day: 7 })
        this.typeVideoObjectData = {
            id: item.id,
            name: item.name,
            videos: result.data?.map((data) => createVideoByRanking(data))
        }

    }
    @action
    async getloadLatestData(item, page = 1,) {
        this.indexVideoObj[item.name]
        const { id, name } = item
        return api.getRankingArchive({ tId: id, p: page }).then(results => {
            for (let i = 0; i < results.data.archives.length; i++) {
                const result = results.data.archives[i];
                this.indexVideoObj[name].push(createVideoByRanking(result));
            }
        })
    }
}

let indexStore = new IndexStore();

export default indexStore;
