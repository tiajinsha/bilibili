import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/Menu/menuItem";
import { createVideo, Video } from "@/models";
import { inject, observer } from "mobx-react";
import React, { createContext, useMemo } from "react";
import styles from "./VidoePlayer.module.scss"
import { getRecommendVides, getComments, getBarrages, getFetchVideoShot } from "@/api/index";
import BIcon from "@/components/Button/BIcon";
import { Spin } from "antd";
import VideoSlider from "./VideoSlider";
import axios from "axios";
import Player from "xgplayer"
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
    private play: React.RefObject<any>;
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
        this.play = React.createRef()
    }

    componentWillUnmount(): void {
        if (this.play.current && this.play.current.destroy) {
            this.play.current.destroy(true);
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
                    duration: 8000,
                    txt: element.content, // 弹幕文本
                    start: Number(element.time) * 1000, // 发送时间，单位秒
                    mode: element.type === '1' ? 'scroll' : 'top', // 弹top
                    id: element.content + '-' + Number(element.time) * 1000,
                    style: {
                        color: '#' + Number(element.decimalColor).toString(16),
                        fontSize: '20px',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                })
            });

        }
        if (this.play.current && this.play.current.destroy) {
            this.play.current.destroy(true);
            this.play.current = null
        }
        let imgs = []
        shots.data.image.map(async (item) => {
            const res = await axios.get('http:' + item, {
                responseType: 'blob'
            })
            imgs.push(window.URL.createObjectURL(new Blob([res.data], {
                type: res.data.type + ';charset=utf-8'
            })))
        })
        this.play.current = new Player({
            el: this.ArtPlayerRef.current,
            autoplay: true,
            volume: 0.3,
            url: res.url,
            poster: res.pic,
            width: this.ArtPlayerRef.current.innerWidth,
            height: this.ArtPlayerRef.current.innerHeight,
            playsinline: true,
            whitelist: ['*'],
            thumbnail: shots.data && shots.data.image.length ? {
                pic_num: shots.data.index.length ? shots.data.index.length : 100,
                width: shots.data.img_x_size,
                height: shots.data.img_y_size,
                col: 10,
                row: 10,
                urls: imgs,
            } : null,
            danmu: {
                comments: BarragesList,
                area: {
                    start: 0,
                    end: 0.5
                }
            },
        });
        this.setState({
            loading: true,
            Video: res,
            recommandVideo: result.data.map((item) => createVideo(item)),
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
        console.log(process.platform)
    }
    passedContext: VideoContext = {
        checkVidoe: this.checkVidoe,
    }
    render(): React.ReactNode {
        const { loading, Video, RightMsgVisable, recommandVideo, tabIndex } = this.state
        const rightClose = { flex: RightMsgVisable ? "0 0 400px" : "0 0 0" }
        const iconCloseStyle = { transform: RightMsgVisable ? "rotate(180deg)" : "rotate(0deg)" }
        return (
            <div className={styles['video-player']}>
                <div className={styles['video-header']}>
                    <div className={styles['gohome']} onClick={this.goHome} style={{ marginLeft: process.platform == 'win32' ? "10px" : "100px" }}>
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


