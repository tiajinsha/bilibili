import React, { createRef, useEffect, useRef, useState } from "react";
import { getPicSuffix } from "@/utils";
import command from "./index.module.scss";
import { NavLink } from "react-router-dom";
import BIcon from "../Button/BIcon";
import { inject, observer } from "mobx-react";
import { Video } from "@/models/Video";
import classNames from "classnames";
import { calcNumber } from "@/utils";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VidoeBox from "@/components/vidoeBox/Vidoe";

interface VideoPlayerProps {
  video: Video;
  VideoDetail?: any;
}

const VideoItem: React.FC<VideoPlayerProps> = ({ video }) => {
  
  const ref = useRef(null);
  const onMouseLeaveEvent = () => {
    ref.current.onMouseLeaveEvent();
  };
  const mouseEevent = (aId) => {
    ref.current.mouseEevent(aId);
  };
  return (
    <div className={command["content-item"]}>
      <NavLink
        to={`/VideoDetails/${video.aId}`}
        className={command["link-item"]}
      >
        <div
          className={command["location-wrapper"]}
          onMouseEnter={() => mouseEevent(video.aId)}
          onMouseLeave={onMouseLeaveEvent}
        >
          <VidoeBox ref={ref} video={video}></VidoeBox>
          <img
            loading="lazy"
            alt={video.pic}
            src={video.pic}
            className={command["pic"]}
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "1";
            }}
          />
          <div className={command["dart"]}></div>
          <div className={command["videoMsg"]}>
            <div className={command["leftMsg"]}>
              <div className={command["videoSum"]}>
                <BIcon iconName="bofang" size={15}></BIcon>
                <div>{calcNumber(video.barrageCount)}</div>
              </div>
              <div className={command["videoSum"]}>
                <BIcon iconName="pinglun" size={15}></BIcon>
                <div>{calcNumber(video.playCount)}</div>
              </div>
            </div>
            <div className={command[""]}>{video.duration}</div>
          </div>
        </div>
      </NavLink>
      <div className={command["text-content"]}>
        <div className={command["content"]}>{video.title}</div>
        <div className={command["up-icon"]}>
          <BIcon iconName="UPzhu" size={18} type="hover"></BIcon>
          <div className={command["upcontent"]}> {video.owner.name}· 6-23</div>
        </div>
      </div>
    </div>
  );
};

interface VideoElementsProps {
  data: any;
  viedoContext?: any;
  VideoDetail: any;
}
const VideoElements: React.FC<VideoElementsProps> = ({
  data,
  viedoContext,
  VideoDetail,
}) => {
  return (
    <>
      {data?.map((video, index) => {
        const getPicUrl = (url, format) => {
          const picURL = viedoContext._currentValue.picURL;
          let suffix = ".webp";
          suffix = getPicSuffix();
          return `${picURL}?pic=${url}${format + suffix}`;
        };
        if (video.pic.indexOf("@320w_200h") === -1) {
          video.pic = getPicUrl(video.pic, "@320w_200h");
        }
        return (
          <VideoItem
            video={video}
            VideoDetail={VideoDetail}
            key={index}
          ></VideoItem>
        );
      })}
    </>
  );
};

export default inject("viedoContext")(observer(VideoElements));
