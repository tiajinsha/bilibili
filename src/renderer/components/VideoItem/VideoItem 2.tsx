import React, { memo, useState } from "react"
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

interface VideoPlayerState {
    hover: boolean,
    VideoData: Video
}


@inject('VideoDetail')
@observer
class VideoTtem extends React.Component<VideoPlayerProps, VideoPlayerState> {
    private VideoRef: React.RefObject<VideoPlayer>;
    private timer = null;
    private hover = null;
    constructor(props) {
        super(props)
        this.state = {
            VideoData: null,
            hover: false,
        }
        this.VideoRef = React.createRef();
        this.hover = React.createRef();
        this.timer = React.createRef();
    }
    initCallback = () => {
        this.VideoRef.current?.playOrPause()
    }
    componentDidCatch() {
        clearInterval(this.timer.current)
    }
    mouseEevent = async () => {
        this.timer.current = setInterval(async () => {
            const { getVideoDetail } = this.props.VideoDetail
            clearInterval(this.timer.current)
            if (this.state.VideoData === null) {
                let data = await getVideoDetail.bind(this.props.VideoDetail)(this.props.video.aId)
                if (data?.url === "") {
                    return
                }
                this.setState({
                    VideoData: data
                })
            }
            this.hover.current = true
            this.setState({
                hover: true,
            })
        }, 1000)

    }
    onMouseLeaveEvent = () => {
        if (this.timer.current) clearInterval(this.timer.current)
        this.hover.current = false
        this.setState({
            hover: false,
        })
    }
    onScroll = () => {
        console.log(123123)
    }
     onTransitionEnd = ()=>{
        if(!this.state.hover){
            this.setState({
                hover: false,
            })
        }
    }
    render(): React.ReactNode {
        const { video } = this.props
        const { VideoData, hover } = this.state
        const showVdieo = { opacity: hover ? '1' : '0' }
        return (
            <div className={command['content-item']} onMouseLeave={this.onMouseLeaveEvent} onScroll={this.onScroll}>
                <NavLink to={`/VideoDetails/${video.aId}`} className={command['link-item']} onMouseLeave={this.onMouseLeaveEvent}>
                    <div className={command['location-wrapper']} onMouseEnter={this.mouseEevent} onMouseLeave={this.onMouseLeaveEvent}>
                        <div  onTransitionEnd={this.onTransitionEnd} style={showVdieo} className={classNames(command['video-wrapper'], {
                        })}>
                            {
                                hover && VideoData && this.hover.current ?
                                    <VideoPlayer preview ref={this.VideoRef}
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
                        <img loading="lazy" alt={"awdawd"} src={video.pic} className={command['pic']} onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1" }} />
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

}

interface VideoElementsProps {
    data: any
    viedoContext?: any
}
const VideoElements: React.FC<VideoElementsProps> = ({ data, viedoContext }) => {
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
                        <VideoTtem video={video} key={index}></VideoTtem>
                    )
                })

            }
        </>
    )

}

export default inject('viedoContext')(observer(VideoElements))