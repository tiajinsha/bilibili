import { inject, observer } from "mobx-react";
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import "./index.scss";

interface VidoeBoxProps {
  VideoDetail?: any;
  video: any;
  ref: any;
}

const VidoeBox: React.FC<VidoeBoxProps> = forwardRef((props, ref) => {
  const { VideoDetail } = props;
  const timer = useRef(null);
  const VideoRef = useRef(null);
  const [VideoData, setDate] = useState(null);
  const [hover, setHover] = useState(false);
  const [aId, setAid] = useState(null);
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  });
  useImperativeHandle(ref, () => {
    return {
      mouseEevent: mouseEevent,
      onMouseLeaveEvent: onMouseLeaveEvent,
      onTransitionEnd: onTransitionEnd,
    };
  });
  useEffect(() => {
    if (hover === true) {
      const { getVideoDetail } = VideoDetail;
      if (VideoData !== null) return;
      getVideoDetail
        .bind(VideoDetail)(aId)
        .then((res) => {
          if (res?.url === "") {
            return;
          }
          setDate(res);
        });
    }
  }, [hover, aId]);

  const mouseEevent = (aId) => {
    timer.current = setInterval(() => {
      setAid(aId);
      setHover(true);
      clearInterval(timer.current);
    }, 500);
  };
  const onMouseLeaveEvent = () => {
    setHover(false);
    if (timer.current) clearInterval(timer.current);
  };
  const onTransitionEnd = () => {
    if (!hover) {
      setHover(false);
    }
  };
  return (
    <>
      <div
        onTransitionEnd={onTransitionEnd}
        className="video-wrapper"
        style={{ opacity: hover ? "1" : "0" }}
      >
        {hover && VideoData && timer.current ? (
          <VideoPlayer
            preview
            ref={VideoRef}
            video={{
              aId: VideoData.aId,
              cId: VideoData.cId,
              title: VideoData.title,
              cover: VideoData.pic,
              duration: VideoData.duration,
              url: VideoData.url,
            }}
          />
        ) : null}
      </div>
    </>
  );
});

export default inject("VideoDetail")(observer(VidoeBox));
