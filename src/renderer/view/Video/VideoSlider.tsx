import BIcon from "@/components/Button/BIcon"
import { Video } from "@/models"
import { calcNumber, getPubdate } from "@/utils"
import React from "react"
import tv from "@/assets/images/tv.png";

interface VideoSliderProps{
    Video:Video,
    style:any
    recommandVideo:Video[],
    styles:any
}

const VideoSlider:React.FC<VideoSliderProps> = (props) => {
    const {Video,recommandVideo,styles,style} = props
    return (
        <div style={style}  className={styles['video-content']}>
            <div className={styles['player-logo']}>
                <div className={styles['player-img']}>
                    <img src={Video?.owner.face} alt="" />
                </div>
                <div className={styles['usernames']}>
                    <div className={styles['user']}>{Video?.owner.name}</div>
                    <div className={styles['content']}>{Video?.owner.sex}</div>
                </div>
            </div>
            <div className={styles['player-context']}>
                <div className={styles['context']}>
                    <div>
                        {Video?.title}
                    </div>
                </div>
            </div>
            <div className={styles['video-text']}>
                <div className={styles['icon-wrapper']}>
                    <i className="iconfont icon-bofangqi-bofangxiaodianshi"></i>
                    <span>{calcNumber(Video.playCount)}</span>
                </div>
                <div className={styles['icon-wrapper']}>
                    <i className="iconfont icon-pinglun"></i>
                    <span>{calcNumber(Video.barrageCount)}</span>
                </div>
                <div className={styles['icon-wrapper']}>
                    <i className="iconfont icon-dongtai"></i>
                    <span>{getPubdate(Video.publicDate)}</span>
                </div>
            </div>
            <div className={styles['btn-group']}>
                <div className={styles['hoverbtn']}>
                    <BIcon iconName="dianzan" size={23}>12312</BIcon>
                </div>
                <div className={styles['hoverbtn']}>
                    <BIcon iconName="dianzan" size={23}>12312</BIcon>
                </div>
                <div className={styles['hoverbtn']}>
                    <BIcon iconName="night" size={23}>12312</BIcon>
                </div>
                <div className={styles['hoverbtn']}>
                    <BIcon iconName="guankan" size={23}>12312</BIcon>
                </div>
            </div>
            <div className={styles['recomand-video']}>
                {
                    recommandVideo?.map((item, index) => {
                        return <div className={styles['videoList']}>
                            <div className={styles['wrapper']}>
                                <img className={styles['tv']} src={tv} />
                                <img loading="lazy" src={item.pic} className={styles['imgs']} alt={item.title}
                                    onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1" }} />
                                <div className={styles['videoBox']}>
                                </div>
                                <div className={styles['videoTime']}>
                                    <div>{item.duration}</div>
                                </div>
                            </div>
                            <div className={styles['content']}>
                                <div className={styles['videoName']}>
                                    {item.title}
                                </div>
                                <div className={styles['upNames']}>
                                    <div className={styles['top']}>
                                        <i className="iconfont icon-UPzhu"></i>
                                        <span>{item.owner.name}</span>
                                    </div>
                                    <div className={styles['bottom']}>
                                        <div>
                                            <i className="iconfont icon-bofangqi-bofangxiaodianshi"></i>
                                            <span>{calcNumber(item.playCount)}</span>
                                        </div>
                                        <div>
                                            <i className="iconfont icon-bofangqi-bofangxiaodianshi"></i>
                                            <span>{calcNumber(item.barrageCount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default VideoSlider