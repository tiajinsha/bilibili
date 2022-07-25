import React, { memo, useEffect, useRef, useState } from "react"
import { getPicSuffix } from "@/utils"
import command from "./index.module.scss"
import { NavLink } from "react-router-dom";
import BIcon from "../Button/BIcon";
import { inject, observer } from "mobx-react";
import { Video } from "@/models/Video";
import classNames from "classnames";
import { calcNumber } from "@/utils";
import VideoPlayer from "../VideoPlayer/VideoPlayer";


interface VideoPlayerProps {
    video: Video,
    VideoDetail?: any,
}



const VideoItem: React.FC<VideoPlayerProps> = ({ video, VideoDetail }) => {
    const timer = useRef(null)
    const VideoRef = useRef(null)
    const [VideoData, setDate] = useState(null)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        return () => {
            clearInterval(timer.current)
        }
    })
    useEffect(() => {
        if (hover === true) {
            const { getVideoDetail } = VideoDetail
            getVideoDetail.bind(VideoDetail)(video.aId).then(res => {
                if (res?.url === "") {
                    return
                }
                setDate(res)
            })

        }
    }, [hover, timer.current])


    const mouseEevent = () => {
    timer.current = setInterval(async () => {
            clearInterval(timer.current)
            setHover(true)
        }, 1000)
    }
    const onMouseLeaveEvent = () => {
        if (timer.current) clearInterval(timer.current)
        setHover(false)
    }
    const onTransitionEnd = () => {
        if (!hover) {
            setHover(false)
        }
    }
    return (
        <div className={command['content-item']} onMouseLeave={onMouseLeaveEvent}>
            <NavLink to={`/VideoDetails/${video.aId}`} className={command['link-item']} onMouseLeave={onMouseLeaveEvent}>
                <div className={command['location-wrapper']} onMouseEnter={mouseEevent} onMouseLeave={onMouseLeaveEvent}>
                    <div onTransitionEnd={onTransitionEnd} style={{ opacity: hover ? '1' : '0' }} className={classNames(command['video-wrapper'], {
                    })}>
                        {
                            hover && VideoData ?
                                <VideoPlayer preview ref={VideoRef}
                                    video={{
                                        aId: VideoData.aId,
                                        cId: VideoData.cId,
                                        title: VideoData.title,
                                        cover: VideoData.pic,
                                        duration: VideoData.duration,
                                        url: VideoData.url
                                    }} /> : null
                        }
                    </div>
                    <img loading="lazy" alt={video.pic} src={video.pic} className={command['pic']} onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1" }} />
                    <div className={command['dart']}></div>
                    <div className={command['videoMsg']}>
                        <div className={command['leftMsg']}>
                            <div className={command['videoSum']}>
                                <BIcon iconName="bofang" size={15}></BIcon>
                                <div>{calcNumber(video.barrageCount)}</div>
                            </div>
                            <div className={command['videoSum']}>
                                <BIcon iconName="pinglun" size={15}></BIcon>
                                <div>{calcNumber(video.playCount)}</div>
                            </div>
                        </div>
                        <div className={command['']}>{video.duration}</div>
                    </div>
                </div>
            </NavLink>
            <div className={command['text-content']}>
                <div className={command['content']}>{video.title}</div>
                <div className={command['up-icon']}>
                    <BIcon iconName="UPzhu" size={18} type="hover"></BIcon>
                    <div className={command['upcontent']}> {video.owner.name}· 6-23</div>
                </div>
            </div>
        </div>
    )
}


interface VideoElementsProps {
    data: any,
    viedoContext?: any,
    VideoDetail: any
}
const VideoElements: React.FC<VideoElementsProps> = ({ data, viedoContext, VideoDetail }) => {
    return (
        <>
            {
                data?.map((video, index) => {
                    const getPicUrl = (url, format) => {
                        const picURL = viedoContext._currentValue.picURL
                        let suffix = ".webp";
                        suffix = getPicSuffix()
                        return `${picURL}?pic=${url}${format + suffix}`;
                    }
                    if (video.pic.indexOf('@320w_200h') === -1) {
                        video.pic = getPicUrl(video.pic, "@320w_200h");
                    }
                    return (
                        <VideoItem video={video} VideoDetail={VideoDetail} key={index}></VideoItem>
                    )
                })

            }
        </>
    )

}

export default inject('viedoContext', 'VideoDetail')(observer(VideoElements))

