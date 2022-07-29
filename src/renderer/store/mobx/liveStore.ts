import { action, observable } from 'mobx';
import * as api from "@/api/index"
import { parse } from "query-string";
import { Live, UpUser } from '@/models';
import { getLiveIndexData, getLiveListData } from '@/api/index';

const itemTitle = [
     "第五人格", "王者荣耀", "网游", "手游",
    "单机"
]

export class LiveStore {
    @observable setLiveData = [];
    @observable bannerList = [];
    @observable LiveList = [];
    @observable RoomData = {};
    @observable ShouldLoad = false;
    constructor() {
    }
    @action
    async LiveIndexData() {
        return getLiveIndexData().then((result) => {
            if (result.code === "1") {
                const moduleList = result.data.module_list;

                const bannerList = moduleList.find((item) => item.module_info.title === "banner位").list;

                const itemModuleList = moduleList.filter((item) =>
                    itemTitle.indexOf(item.module_info.title) !== -1
                );

                // 直播列表
                const itemList = itemModuleList.map((item) => {
                    const query = parse(item.module_info.link.substring(item.module_info.link.indexOf("?")));
                    const o = {
                        title: item.module_info.title,
                        parentAreaId: query.parent_area_id,
                        parentAreaName: query.parent_area_name,
                        areaId: query.area_id,
                        areaName: query.area_name,
                        list: []
                    };
                    o.list = item.list.splice(0, 4).map((data) =>
                        new Live(data.title, data.roomid, data.online, data.cover, 0, "",
                            new UpUser(0, data.uname, data.face))
                    )
                    return o;
                });
                this.setLiveData = itemList
                this.bannerList = bannerList
            }
            return this.setLiveData
        });
    }


    @action
    async getLiveListInfo(data) {
        return getLiveListData(data).then((result) => {
            if (result.code === "1") {
                const list = result.data.list.map((data) =>
                    new Live(data.title, data.roomid, data.online, data.user_cover, 0, "", new UpUser(data.uid, data.uname, data.face))
                );
                this.LiveList = [...this.LiveList,...list]
                return this.LiveList
            }
            this.ShouldLoad = true
        });
    }

    @action
    async getRoomData(roomId) {
        const promises = [api.getRoomInfo(roomId), api.getLivePlayUrl(roomId)];
        return Promise.all(promises).then(([result1, result2]) => {
            if (result1.code === "1") {
                const data = result1.data;
                const live = new Live(
                    data.title,
                    data.room_id,
                    data.online,
                    data.user_cover,
                    data.live_status,
                    "",
                    null
                );
                live.playUrl = result2.data.durl[0]?.url;
                //  live.playUrl = result2.data.durl[result2.data.current_quality - 1]?.url;

                this.RoomData = {
                    parentAreaId: data.parent_area_id,
                    parentAreaName: data.parent_area_name,
                    areaId: data.area_id,
                    areaName: data.area_name,
                    uId: data.uid,
                    description: data.description,
                    liveTime: data.live_time,
                    live,
                }
            }
            return this.RoomData
        });
    }
    @action
    async clearData() {
        this.LiveList = [];
        this.RoomData = {};
    }
}




let liveStore = new LiveStore();

export default liveStore;