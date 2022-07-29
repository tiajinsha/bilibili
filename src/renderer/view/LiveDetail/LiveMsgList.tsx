import { getRoomGifts } from "@/api";
import * as React from "react";

import style from "./LiveMsgList.module.scss";
interface TabProps {
  description: string;
}

const {
  useState,
  useEffect,
  useRef
} = React;

let chatDOM: HTMLDivElement = null;
let gifts: Array<any> = [];

/**
 * 发送聊天消息
 */
const sendMsg = (msg) => {
  /* eslint-disable */
  if (!chatDOM) {
    return;
  }
  const div = document.createElement("div");
  div.className = style['chat-msg'];
  console.log(msg)
  switch (msg.cmd) {
    case "DANMU_MSG":
      const manager = msg.info[2][2] === 1 ? `<span class="${style['msg-manager']}">房管</span>` : "";
      div.innerHTML = `${manager}<span class="${style['msg-name']}">${msg.info[2][1]}: </span>` +
        `${msg.info[1]}`;
      break;
    case "SEND_GIFT":
      div.classList.add(style.gift);
      const gift = gifts.find((gift) => gift.id === msg.data.giftId);
      div.innerHTML = `<span class="${style['msg-name']}">${msg.data.uname} </span>` +
        `${msg.data.action}${msg.data.giftName} <img src="${gift.img}"` +
        `style="width: 2rem; vertical-align: middle" /> x ${msg.data.num}`;
      break;
    case "INTERACT_WORD":
      const isSvip = true;
      isSvip ? div.classList.add(style.svip) : div.classList.add(style.vip);
      //const call = isSvip ? "年费老爷" : "老爷";
      div.innerHTML = `<span class="${style['msg-name']}">${msg.data.uname}  </span>` +
        `进入直播间`;
      break;
    // 其它通知类型
    default:
  }
  // 延时执行，避免并发造成dom计算不准确
  setTimeout(() => {
    let needScroll = true;
    // 判断是否滚动到最底部
    if (Math.ceil(chatDOM.scrollTop) <
      chatDOM.scrollHeight - chatDOM.clientHeight) {
      needScroll = false;
    }
    chatDOM.appendChild(div);
    // 如果滚动到底部，添加消息后，继续滚动到底部
    if (needScroll) {
      chatDOM.scrollTop = chatDOM.scrollHeight - chatDOM.clientHeight;
    }
  }, 100);
}

function LiveMsgList(props: TabProps) {
  const { description } = props;
  const [index, setIndex] = useState(0);

  const chatRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    chatDOM = chatRef.current;
    // 消息超过1000条，进行清理
    setInterval(() => {
      const children = chatDOM.children;
      if (children.length > 1000) {
        const subChildren = Array.from(children).slice(0, children.length - 1000);
        subChildren.forEach((child) => {
          chatDOM.removeChild(child);
        });
      }
    }, 5000);

    getRoomGifts().then((result) => {
      if (result.code === "1") {
        console.log(result.data, "gifts")
        gifts = result.data;
      }
    });

  }, []);

  return (
    <div className={style['tab-wrapper']}>
      <div className={style['tab-item-wrapper']}>
        <div className={style['tab-item'] + (index === 0 ? " " + style.active : "")}
          onClick={() => {
            setIndex(0);
          }}>互动</div>
        <div className={style['tab-item'] + (index === 1 ? " " + style.active : "")}
          onClick={() => {
            setIndex(1);
          }}>简介</div>
      </div>
      <div className={style['tab-content-wrapper']}>
        {/* 互动 */}
        <div className={style['tab-content']} style={{ display: (index === 0 ? "block" : "none") }}>
          <div className={style['chat-container']} ref={chatRef}>
            {/* <div className={style.chatMsg}>
              <span className={style.msgManager}>房管</span>
              <span className={style.msgName}>你残留下的光与影: </span>
              ブラのサイズは？
            </div>
            <div className={style.chatMsg}>
              <span className={style.msgName}>你残留下的光与影: </span>
              ブラのサイズは？
            </div>
            <div className={style.chatMsg + " " + style.svip}>
              <span className={style.msgName}>百杜Paido 年费老爷 </span>
              进入直播间
            </div>
            <div className={style.chatMsg + " " + style.vip}>
              <span className={style.msgName}>哈喽 老爷 </span>
              进入直播间
            </div>
            <div className={style.chatMsg + " " + style.gift}>
              <span className={style.msgName}>Mus_铭然 </span>
              赠送亿圆 <img src="https://s1.hdslb.com/bfs/live/d57afb7c5596359970eb430655c6aef501a268ab.png"
                    style={{width: "1rem", verticalAlign: "middle"}} /> x 1
            </div> */}
          </div>
        </div>
        {/* 简介 */}
        <div className={style['tab-content']} style={{ display: (index === 1 ? "block" : "none") }}>
          <div className={style.desc} dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </div>
  );
}

export default LiveMsgList;

export { sendMsg };

/* 
{
  "cmd": "ENTRY_EFFECT",
  "data": {
      "id": 4,
      "uid": 336516571,
      "target_id": 51628309,
      "mock_effect": 0,
      "face": "https://i1.hdslb.com/bfs/face/19b308eebadf7474208aa8a6c8bf29e9e9328694.jpg",
      "privilege_type": 3,
      "copy_writing": "欢迎舰长 <%仁川曼基康康康%> 进入直播间",
      "copy_color": "#ffffff",
      "highlight_color": "#E6FF00",
      "priority": 1,
      "basemap_url": "https://i0.hdslb.com/bfs/live/mlive/11a6e8eb061c3e715d0a6a2ac0ddea2faa15c15e.png",
      "show_avatar": 1,
      "effective_time": 2,
      "web_basemap_url": "https://i0.hdslb.com/bfs/live/mlive/11a6e8eb061c3e715d0a6a2ac0ddea2faa15c15e.png",
      "web_effective_time": 2,
      "web_effect_close": 0,
      "web_close_time": 0,
      "business": 1,
      "copy_writing_v2": "欢迎舰长 <%仁川曼基康康康%> 进入直播间",
      "icon_list": [],
      "max_delay_time": 7,
      "trigger_time": 1659071168449502500,
      "identities": 6,
      "effect_silent_time": 0,
      "effective_time_new": 0,
      "web_dynamic_url_webp": "",
      "web_dynamic_url_apng": "",
      "mobile_dynamic_url_webp": ""
  }
} 

{
    "cmd": "ONLINE_RANK_COUNT",
    "data": {
        "count": 2689
    }
}
{
    "cmd": "INTERACT_WORD",
    "data": {
        "contribution": {
            "grade": 0
        },
        "dmscore": 12,
        "fans_medal": {
            "anchor_roomid": 23928718,
            "guard_level": 0,
            "icon_id": 0,
            "is_lighted": 1,
            "medal_color": 9272486,
            "medal_color_border": 9272486,
            "medal_color_end": 9272486,
            "medal_color_start": 9272486,
            "medal_level": 12,
            "medal_name": "3O1",
            "score": 31954,
            "special": "",
            "target_id": 6519988
        },
        "identities": [
            3,
            1
        ],
        "is_spread": 0,
        "msg_type": 1,
        "privilege_type": 0,
        "roomid": 23197314,
        "score": 1659113762803,
        "spread_desc": "",
        "spread_info": "",
        "tail_icon": 0,
        "timestamp": 1659071808,
        "trigger_time": 1659071807813705200,
        "uid": 22837195,
        "uname": "Patriky",
        "uname_color": ""
    }
}
*/