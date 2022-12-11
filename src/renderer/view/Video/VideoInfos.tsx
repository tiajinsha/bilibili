import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/Menu/menuItem";
import { createVideo, Video } from "@/models";
import { inject, observer } from "mobx-react";
import React, { createContext } from "react";
import styles from "./VidoePlayer.module.scss"
import { getRecommendVides, getComments, getBarrages, getFetchVideoShot } from "@/api/index";
import BIcon from "@/components/Button/BIcon";
import { Spin } from "antd";
import VideoSlider from "./VideoSlider";
import Artplayer from "artplayer"
import artplayerPluginDanmuku from "artplayer-plugin-danmuku"
import VideoComment from "./VideoComment";
export interface VideoContext {
    checkVidoe?: (aId: number) => void;
}
export const VideoContext = createContext<VideoContext>({})
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
    recommandVideo: Video[],
    art: any
}

//解决重复请求问题
var first: Boolean = true
@inject('VideoDetail')
@inject('indexStore')
@observer
export default class VideoInfo extends React.Component<VideoInfoProps, VideoInfoState> {
    private ArtPlayerRef: React.RefObject<any>;
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            Video: null,
            tabIndex: 0,
            RightMsgVisable: true,
            recommandVideo: null,
            art: null
        }
        this.ArtPlayerRef = React.createRef()
    }

    componentWillUnmount(): void {
        if (this.state.art && this.state.art.destroy) {
            this.state.art.destroy();
        }
    }
    async componentWillMount() {
        first = true
    }
    async componentDidMount() {
        if (first) {
            first = false
            let params = window.location.hash?.split("/")
            let rId = params[params.length - 1]
            this.loadData(rId)
        }
    }
    loadData = async (aId) => {
        this.setState({
            loading: false,
        })
        let BarragesList = []
        let res = await this.props.VideoDetail.getVideoDetail(aId)
        let result = await getRecommendVides(res.aId)
        let Barrages = await getBarrages(res.cId)
        let shots = await getFetchVideoShot(aId)
        console.log(shots, 'shots')
        if (Barrages.msg === "success" && Barrages.data.length) {
            Barrages.data.forEach(element => {
                BarragesList.push({
                    text: element.content, // 弹幕文本
                    time: Number(element.time), // 发送时间，单位秒
                    color: '#' + Number(element.decimalColor).toString(16), // 弹幕局部颜色
                    border: false, // 是否显示描边
                    mode: element.type === '1' ? 0 : 1, // 弹
                })
            });

        }
        var art = null
        this.setState({
            loading: true,
            Video: res,
            recommandVideo: result.data.map((item) => createVideo(item)),
            art: art = new Artplayer({
                url: res.url,
                container: this.ArtPlayerRef.current,
                autoplay: true,
                poster: res.pic,
                setting: true,
                playbackRate: true,
                theme: '#fb7299',
                fullscreen: true,
                fullscreenWeb: true,
                miniProgressBar: true,
                thumbnails: shots.data && shots.data.image.length ? {
                    url: shots.data.image[0],
                    number: shots.data.index.length,
                    column: shots.data.img_x_len,
                } : null,
                plugins: [
                    artplayerPluginDanmuku({
                        danmuku: BarragesList,
                        speed: 5, // 弹幕持续时间，单位秒，范围在[1 ~ 10]
                        opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
                        fontSize: 20, // 字体大小，支持数字和百分比
                        color: '#FFFFFF', // 默认字体颜色
                        mode: 0, // 默认模式，0-滚动，1-静止
                        margin: [10, '25%'], // 弹幕上下边距，支持数字和百分比
                        antiOverlap: true, // 是否防重叠
                        useWorker: true, // 是否使用 web worker
                        synchronousPlayback: true, // 是否同步到播放速度
                        filter: (danmu) => danmu.text.length < 50, // 弹幕过滤函数，返回 true 则可以发送
                        lockTime: 5, // 输入框锁定时间，单位秒，范围在[1 ~ 60]
                        maxLength: 100, // 输入框最大可输入的字数，范围在[0 ~ 500]
                        minWidth: 200, // 输入框最小宽度，范围在[0 ~ 500]，填 0 则为无限制
                        maxWidth: 400, // 输入框最大宽度，范围在[0 ~ Infinity]，填 0 则为 100% 宽度
                        theme: 'dark', // 输入框自定义挂载时的主题色，默认为 dark，可以选填亮色 light
                    }),
                ],
            })
        })
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
    }
    goHome = () => {
        window.history.back()
    }
    checkVidoe = (aId) => {
        this.loadData(aId)
    }
    passedContext: VideoContext = {
        checkVidoe: this.checkVidoe
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
                        <div style={{ width: "100%", height: "100%" }} ref={this.ArtPlayerRef}></div>
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
                                <VideoContext.Provider value={this.passedContext}>
                                    <VideoSlider style={{ display: tabIndex == 0 ? 'block' : 'none' }} styles={styles} Video={Video} checkVidoe={this.checkVidoe} recommandVideo={recommandVideo}></VideoSlider>
                                    <VideoComment style={{ display: tabIndex == 1 ? 'block' : 'none' }} ></VideoComment>
                                </VideoContext.Provider>
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


