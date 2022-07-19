import { getPlayUrl, getVideoInfo } from '@/api';
import { createVideoByDetail, Video } from '@/models/Video';
import { action, observable } from 'mobx';

export class VideoDetail {
    @observable Video: Video = null;

    constructor() {

    }

    @action
    async getVideoDetail(aId: number) {
        return getVideoInfo(aId).then(async (result) => {
            let video
            if (result.code === "1") {
                video = createVideoByDetail(result.data);
                try {
                    let r = await getPlayUrl(aId, video.cId)
                    video.url = r.data.durl[0].url;
                    this.Video = video
                    console.log(r,"r")
                } catch (error) {
                    this.Video = null
                }
            }
            return video
        });
    }
}


let videoDetail = new VideoDetail();

export default videoDetail;
