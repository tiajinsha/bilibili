import service from "@/utils/request"
import fetch from "cross-fetch";
import { getJSON } from "./fetchjson";
import { URL_INDEX, URL_ROUND_SOWING, URL_PARTITION, URL_RANKING_PARTITION, URL_RANKING, URL_RANKING_REGION, URL_RANKING_ARCHIVE, URL_VIDEO_DETAIL, URL_PLAY_URL, URL_VIDEO_BARRAG, URL_VIDEO_RECOMMEND, URL_VIDEO_REPLAY, URL_LIVE_DATA, URL_LIVE_LIST, URL_LIVE_PLAY_URL, URL_LIVE_ROOM_INFO, URL_UP_USER, URL_USER_VIDEO, URL_LIVE_DANMU_CONFIG, URL_LIVE_ROOM_GIFT, } from "./url";
// 获取首页内容
export function getContent() {
    return service({
        url: URL_INDEX,
        method: 'get',
    });
}

// 获取首页轮播图
export function getBanner() {
    return service({
        url: URL_ROUND_SOWING,
        method: 'get',
    });
}

/**
* 获取分类
*/
export function getPartitions() {
    return service({
        url: URL_PARTITION,
        method: 'get',
    });
}

/**
 * 获取排行榜分类
 */
export function getRankingPartitions() {
    return service({
        url: URL_RANKING_PARTITION,
        method: 'get',
    });

}

// 获取排行榜
export function getRankings(rId: number) {
    return service({
        url: URL_RANKING + `/${rId}`,
        method: 'get',
    });

}

// 获取分类排行
export function getRankingRegion(params) {
    return service({
        url: URL_RANKING_REGION,
        method: 'get',
        params
    });
}

// 获取最新分类排行
export function getRankingArchive(params) {
    return service({
        url: URL_RANKING_ARCHIVE,
        method: 'get',
        params
    });
}


/**
 * 获取视频信息
 */
export function getVideoInfo(aId: number) {
    return service({
        url: URL_VIDEO_DETAIL + `/${aId}`,
        method: 'get',
    });
}


/**
* 获取视频播放地址
*/
export function getPlayUrl(aId: number, cId: number) {
    return fetch("http://127.0.0.1:25565/av/play_url" + `?aId=${aId}&cId=${cId}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
}


/**
 * 获取弹幕
 */
export function getBarrages(cId: number) {
    return fetch("http://127.0.0.1:25565" + URL_VIDEO_BARRAG + `/${cId}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })

}


/**
 * 获取推荐视频列表
 */
export function getRecommendVides(aId: number) {
    return getJSON(URL_VIDEO_RECOMMEND + `/${aId}`, null);
}



/**
* 获取评论列表
*/
export function getComments(aId: number, p: number) {
    return getJSON(URL_VIDEO_REPLAY, { aId, p });
}


// 获取直播首页数据
export function getLiveIndexData() {
    return getJSON(URL_LIVE_DATA, null);
}



// 获取直播房间列表数据
export function getLiveListData(param) {
    return getJSON(URL_LIVE_LIST, param);
}


// 获取直播地址
export function getLivePlayUrl(roomId: number) {
    return getJSON(URL_LIVE_PLAY_URL, { roomId });
}



// 获取直播间数据
export function getRoomInfo(roomId: number) {
    return getJSON(URL_LIVE_ROOM_INFO, { roomId });
}


/**
* 获取up主信息
*/
export function getUserInfo(mId: number) {
    return getJSON(URL_UP_USER + `/${mId}`, null);
}

/**
 * 获取up主投稿视频
 */
export function getUserVideos(aId: number, p: number, size: number) {
    return getJSON(URL_USER_VIDEO, { uId: aId, p, size });
}


// 获取弹幕配置
export function getDanMuConfig(roomId: number){
    return getJSON(URL_LIVE_DANMU_CONFIG, {roomId});
  }
  


// 获取礼物
export function getRoomGifts(){
    return getJSON(URL_LIVE_ROOM_GIFT, null);
  }