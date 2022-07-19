import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/Menu/menuItem";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { createVideo, Video } from "@/models";
import { inject, observer } from "mobx-react";
import React from "react";
import styles from "./VidoePlayer.module.scss"
import { getRecommendVides, getComments } from "@/api/index";
import BIcon from "@/components/Button/BIcon";
import { Spin } from "antd";
import VideoSlider from "./VideoSlider";
import VideoComment from "./VideoComment";
interface VideoInfoProps {
    VideoDetail: {
        Video: Video,
        getVideoDetail: (rId: string) => Promise<any>
    },
    indexStore: any,
}
interface VideoInfoState {
    loading: boolean,
    Video: Video,
    tabIndex: number,
    RightMsgVisable: boolean,
    recommandVideo: Video[]
}
//解决重复请求问题
var first: Boolean = true
@inject('VideoDetail')
@inject('indexStore')
@observer
export default class VideoInfo extends React.Component<VideoInfoProps, VideoInfoState> {
    private VideoRef: React.RefObject<VideoPlayer>;
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            Video: null,
            tabIndex: 0,
            RightMsgVisable: true,
            recommandVideo: null
        }
        this.VideoRef = React.createRef();
    }
    componentWillUnmount(): void {

    }
    async componentWillMount() {
        first = true
    }
    async componentDidMount() {
        if (first) {
            first = false
            this.setState({
                loading: false,
            })
            let params = window.location.hash?.split("/")
            let rId = params[params.length - 1]
            let res = await this.props.VideoDetail.getVideoDetail(rId)
            let result = await getRecommendVides(res.aId)
            let msgresult = await getComments(res.aId, 0)
            this.setState({
                loading: true,
                Video: res,
                recommandVideo: result.data.map((item) => createVideo(item))
            })
        }
    }

    closeMsg = () => {
        this.setState({
            RightMsgVisable: !this.state.RightMsgVisable
        })
    }
    tabClick = (index: any) => {
        if (index === '0') {
            this.setState({
                tabIndex: 0
            })
        } else {
            this.setState({
                tabIndex: 1
            })
        }
        console.log(this.state.tabIndex)
    }
    goHome=()=>{
        window.history.back()
    }
    render(): React.ReactNode {
        const { loading, Video, RightMsgVisable, recommandVideo, tabIndex } = this.state
        const rightClose = { flex: RightMsgVisable ? "0 0 400px" : "0 0 0" }
        const iconCloseStyle = { transform: RightMsgVisable ? "rotate(180deg)" : "rotate(0deg)" }
        return (
            <div className={styles['video-player']}>
                <div className={styles['video-header']}>
                    <div className={styles['gohome']} onClick={this.goHome}>
                        <span className="iconfont icon-shouye"></span>
                        <div>回到主界面</div>
                    </div>
                </div>
                <div className={styles['vidoe-content']}>
                    <div className={styles['video']}>
                        {
                            loading && Video.aId ? <VideoPlayer
                                ref={this.VideoRef}
                                autoPlay
                                video={{
                                    aId: Video.aId,
                                    cId: Video.cId,
                                    title: Video.title,
                                    cover: Video.pic,
                                    duration: Video.duration,
                                    url: Video.url
                                }} /> : null
                        }

                        <div style={iconCloseStyle} className={styles['right-close']} onClick={this.closeMsg} >
                            <BIcon iconName="fanhui" ></BIcon>
                        </div>
                    </div>
                    <div style={rightClose} className={styles['video-info']}>
                        <div className={styles['video-info-tab']}>
                            <Menu defaultIndex="0" onClickx={this.tabClick}>
                                <MenuItem >
                                    简介
                                </MenuItem>
                                <MenuItem >
                                    评论
                                </MenuItem>
                            </Menu>
                        </div>
                        {
                            loading ? <>
                                <VideoSlider style={{ display: tabIndex == 0 ? 'block' : 'none' }} styles={styles} Video={Video} recommandVideo={recommandVideo}></VideoSlider>
                                <VideoComment style={{ display: tabIndex == 1 ? 'block' : 'none' }} ></VideoComment>
                            </> : <div className={styles['loading']}>
                                <Spin></Spin>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


