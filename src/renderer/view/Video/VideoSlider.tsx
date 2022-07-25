import BIcon from "@/components/Button/BIcon";
import { Video } from "@/models";
import { calcNumber, getPubdate } from "@/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import tv from "@/assets/images/tv.png";
import { inject, observer } from "mobx-react";
import { VideoContext } from "./VideoInfos";
import VidoeBox from "@/components/vidoeBox/Vidoe";
interface VideoSliderProps {
  Video: Video;
  style: any;
  recommandVideo: Video[];
  styles: any;
  VideoDetail: any;
  checkVidoe: (aId) => void;
}
//recommandVideo
const VidoeElement = (props) => {
  const { styles, item } = props;
  const ref = useRef(null);
  const context = useContext(VideoContext);
  const onMouseLeaveEvent = () => {
    ref.current.onMouseLeaveEvent();
  };
  const mouseEevent = (aId) => {
    ref.current.mouseEevent(aId);
  };
  const checkVidoe = (aId) => {
    context.checkVidoe(aId);
  };
  return (
    <div className={styles["videoList"]} onClick={() => checkVidoe(item.aId)}>
      <div
        className={styles["wrapper"]}
        onMouseEnter={() => mouseEevent(item.aId)}
        onMouseLeave={onMouseLeaveEvent}
      >
        <img className={styles["tv"]} src={tv} />
        <img
          loading="lazy"
          src={item.pic}
          className={styles["imgs"]}
          alt={item.title}
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "1";
          }}
        />
        <VidoeBox ref={ref} video={undefined}></VidoeBox>
        <div className={styles["videoBox"]}></div>
        <div className={styles["videoTime"]}>
          <div>{item.duration}</div>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["videoName"]}>{item.title}</div>
        <div className={styles["upNames"]}>
          <div className={styles["top"]}>
            <i className="iconfont icon-UPzhu"></i>
            <span>{item.owner.name}</span>
          </div>
          <div className={styles["bottom"]}>
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
  );
};

const VideoSlider: React.FC<VideoSliderProps> = (props) => {
  const { Video, recommandVideo, styles, style, VideoDetail } = props;
  return (
    <div style={style} className={styles["video-content"]}>
      <div className={styles["player-logo"]}>
        <div className={styles["player-img"]}>
          <img src={Video?.owner.face} alt="" />
        </div>
        <div className={styles["usernames"]}>
          <div className={styles["user"]}>{Video?.owner.name}</div>
          <div className={styles["content"]}>{Video?.owner.sex}</div>
        </div>
      </div>
      <div className={styles["player-context"]}>
        <div className={styles["context"]}>
          <div>{Video?.title}</div>
        </div>
      </div>
      <div className={styles["video-text"]}>
        <div className={styles["icon-wrapper"]}>
          <i className="iconfont icon-bofangqi-bofangxiaodianshi"></i>
          <span>{calcNumber(Video.playCount)}</span>
        </div>
        <div className={styles["icon-wrapper"]}>
          <i className="iconfont icon-pinglun"></i>
          <span>{calcNumber(Video.barrageCount)}</span>
        </div>
        <div className={styles["icon-wrapper"]}>
          <i className="iconfont icon-dongtai"></i>
          <span>{getPubdate(Video.publicDate)}</span>
        </div>
      </div>
      <div className={styles["btn-group"]}>
        <div className={styles["hoverbtn"]}>
          <BIcon iconName="dianzan1" size={23}>
            点赞
          </BIcon>
        </div>
        <div className={styles["hoverbtn"]}>
          <BIcon iconName="shoucang" size={23}>
            收藏
          </BIcon>
        </div>
        <div className={styles["hoverbtn"]}>
          <BIcon iconName="jinbi" size={23}>
            投币
          </BIcon>
        </div>
        <div className={styles["hoverbtn"]}>
          <BIcon iconName="zhuanfa" size={23}>
            分享
          </BIcon>
        </div>
      </div>
      <div className={styles["recomand-video"]}>
        {recommandVideo.map((item, index) => {
          return (
            <VidoeElement
              key={index}
              item={item}
              styles={styles}
              VideoDetail={VideoDetail}
            ></VidoeElement>
          );
        })}
      </div>
    </div>
  );
};

export default inject("VideoDetail")(observer(VideoSlider));
