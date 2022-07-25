import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import React from "react";
import styles from "./LiveDetail.module.scss"
import { inject, observer } from "mobx-react";
import { getDanMuConfig, getUserInfo } from "@/api";
import { UpUser } from "@/models";
import ChatWebSocket, { Events } from "./ChatWS";
import LiveMsgList, { sendMsg } from "./LiveMsgList";
interface VideoInfoProps {
    liveStore: {
        getRoomData: (roomId: string) => Promise<any>
        RoomData: any,
        LiveList: any,
        clearData: () => void
    }
    viedoContext: any
}
interface VideoInfoState {
    roomId: string | number,
    anchor: {
        mId: number,
        name: string,
        face: string,
        level: number,
        sex: string,
        sign: string,
        following: number,
        follower: number
    },
    loading: boolean
}
//解决重复请求问题
var first: Boolean = true
@inject('liveStore')
@inject('viedoContext')
@observer
export default class VideoInfo extends React.Component<VideoInfoProps, VideoInfoState> {
    private VideoRef: React.RefObject<VideoPlayer>;
    private onlineNumRef: React.RefObject<HTMLSpanElement>
    private chatWebSocket:ChatWebSocket
    constructor(props) {
        let params = window.location.hash?.split("/")
        let roomId = params[params.length - 1]
        super(props)
        this.state = {
            roomId,
            anchor: new UpUser(0, "", ""),
            loading: false
        }
        this.VideoRef = React.createRef();
        this.onlineNumRef = React.createRef();
    }

    async componentWillUnmount() {
        if(this.chatWebSocket) this.chatWebSocket?.close()
        if (this.VideoRef.current) {
            this.VideoRef.current.destory()
        }
        first = true
        this.props.liveStore.clearData()
        this.setState({
            anchor: new UpUser(0, "", ""),
            loading: false
        })
    }
    async componentWillMount() {
        const { liveStore } = this.props
        if (first) {
            first = false
            this.setState({
                loading: false
            })
            let roomData = await liveStore.getRoomData(this.state.roomId as string)
            getUserInfo(roomData.uId).then((result) => {
                if (result.code === "1") {
                    const data = result.data;
                    const upUser = new UpUser(
                        data.mid,
                        data.name,
                        data.face,
                        data.level,
                        data.sex,
                        data.sign,
                        data.status.following,
                        data.status.follower
                    );
                    this.setState({
                        anchor: upUser,
                        loading: true
                    })
                }
            });
            getDanMuConfig(roomData.live.roomId as number).then((result) => {
                var that = this
                if (result.code === "1") {
                    const url = `wss://${result.data.host}/sub`;
                    this.chatWebSocket = new ChatWebSocket(url, roomData.live.roomId as number);
                    /*     chatWebSocket.on(Events.HEARTBEAT_REPLY, ({ onlineNum }) => {
                             this.onlineNumRef.current.innerHTML = `人气：${formatTenThousand(onlineNum)}`;
                        });
     */
                    this.chatWebSocket.on(Events.MESSAGE_RECEIVE, (data) => {
                        data.forEach(function (item) {
                            sendMsg(item);
                            if (item.cmd === "DANMU_MSG") {
                                const barragData = {
                                    color: "#" + Number(item.info[0][3]).toString(16),
                                    content: item.info[1]
                                };
                                that.VideoRef.current?.sendBarrage(barragData);
                            }
                        });
                    });
                }
            })
        }
    }

    /*     tabClick = (index: any) => {
            if (index === '0') {
                this.setState({
                    tabIndex: 0
                })
            } else {
                this.setState({
                    tabIndex: 1
                })
            }
        } */
    goHome = () => {
        window.history.back()
    }
    render(): React.ReactNode {
        const { liveStore: { RoomData }, viedoContext: { _currentValue: { picURL } } } = this.props
        const { loading } = this.state
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
                            RoomData && loading ? <VideoPlayer
                                live={true} isLive={RoomData.live.isLive === 1}
                                liveTime={new Date(RoomData.liveTime.replace(/-/g, "/")).getTime()}
                                video={{
                                    aId: 0,
                                    cId: 0,
                                    title: RoomData.live.title,
                                    cover: picURL + "?pic=" + RoomData.live.cover,
                                    duration: 0,
                                    url: RoomData.live.playUrl
                                }}
                                ref={this.VideoRef} /> : null
                        }
                    </div>
                    <div className={styles['video-info']}>
                        {/*        <div className={styles['video-info-tab']}>
                            <Menu defaultIndex="0" onClickx={this.tabClick}>
                                <MenuItem >
                                    简介
                                </MenuItem>
                                <MenuItem >
                                    评论
                                </MenuItem>
                            </Menu>
                        </div> */}
                        <div className={styles['video-content']}>
                            {
                                RoomData && loading ? <LiveMsgList description={RoomData.description} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


