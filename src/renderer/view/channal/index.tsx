import React, { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import command from "./index.module.scss"
import classNames from "classnames"
import { InfiniteScroll } from 'antd-mobile'
import { NavLink } from "react-router-dom"
import BIcon from "@/components/Button/BIcon"
import Skeletons from "@/components/Skeleton"
import { observer, inject } from 'mobx-react';
import { getPicSuffix } from "@/utils"
import { MenuContext } from "../layout/LayOut"
import { PartitionType } from "@/models"



const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

const VideoTtem = (props) => {
    const { video } = props
    const [playCount, barrageCount] = useMemo(() => {
        let playCount
        let barrageCount
        if (+video.playCount >= 10000) {
            playCount = (+video.playCount / 10000).toFixed(0) + 'W'
        } else if (+video.playCount < 10000 && video.playCount >= 1000) {
            playCount = (+video.playCount / 1000).toFixed(0) + 'K'
        } else {
            playCount = (+video.playCount / 1000).toFixed(0)
        }
        if (+video.barrageCount >= 10000) {
            barrageCount = (+video.barrageCount / 10000).toFixed(0) + 'W'
        } else if (+video.barrageCount < 10000 && video.barrageCount >= 1000) {
            barrageCount = (+video.barrageCount / 1000).toFixed(0) + 'K'
        } else {
            barrageCount = (+video.barrageCount / 1000).toFixed(0)
        }
        return [playCount, barrageCount]
    }, [video])
    return <div className={command['content-item']}>
        <NavLink to="/DynaMic" className={command['link-item']}>
            <div className={command['location-wrapper']}>
                <img loading="lazy" alt={"awdawd"} src={video.pic} className={command['pic']} onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1" }} />
                <div className={command['dart']}></div>
                <div className={command['videoMsg']}>
                    <div className={command['leftMsg']}>
                        <div className={command['videoSum']}>
                            <BIcon iconName="bofang" size={15}></BIcon>
                            <div>{playCount}</div>
                        </div>
                        <div className={command['videoSum']}>
                            <BIcon iconName="pinglun" size={15}></BIcon>
                            <div>{barrageCount}</div>
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
                <div className={command['upcontent']}> 阿我打算的 · 6-23</div>
            </div>
        </div>
    </div>
}


const Channal = (props) => {
    const MenuContsext = useContext(MenuContext)
    const [select, setSelect] = useState('首页')
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const first = useRef(false)
    const { loadRepos, indexVideoObj, reset, Partitions, getloadPartionData } = props.indexStore

    useEffect(() => {
        if (first.current) {
            setHasMore(true)
            reset.bind(props.indexStore)(select)
            if (select === "首页") {
                loadMore()
            } else {
                setLoading(true)
                getloadPartionData.bind(props.indexStore)(Partitions.find(item =>
                    item.name == select
                ), () => {
                    setLoading(false)
                })
            }
        }
    }, [MenuContsext.index])


    async function loadMore() {
        setLoading(true)
        await loadRepos.call(props.indexStore)
        setLoading(false)
        setHasMore(false)
        first.current = true
    }

    const handleClick = async (item) => {
        setSelect(item.name)
        if (select !== item.name && item.name !== "首页") {
            if (indexVideoObj[item.name].length === 0) {
                setLoading(true)
                await getloadPartionData.bind(props.indexStore)(item)
                setLoading(false)
            }

        }

    }

    const getPicUrl = (url, format) => {
        const picURL = props.viedoContext._currentValue.picURL
        let suffix = ".webp";
        suffix = getPicSuffix()
        return `${picURL}?pic=${url}${format + suffix}`;
    }

    const VideoElements = () => indexVideoObj[select]?.map((video, index) => {
        if (video.pic.indexOf('@320w_200h') === -1) {
            video.pic = getPicUrl(video.pic, "@320w_200h");
        }
        return <VideoTtem video={video} key={index}></VideoTtem>
    })

    const tabBarData = [{ id: 0, name: "首页", children: [] } as PartitionType].concat(Partitions);
    return (
        <div className={command.command}>
            <div className={command['command-header']}>
                {tabBarData?.map((item, index) => {
                    return <div key={index} className={classNames(command['tab'], {
                        [command['is-select']]: select === item.name
                    })} onClick={() => handleClick(item)}>{item.name}</div>
                })}
            </div>
            <div className={command['content']}>
                <VideoElements />
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                {
                    loading ? <Skeletons></Skeletons> : null
                }
            </InfiniteScroll>
        </div>
    )

}

export default memo(inject('indexStore', 'viedoContext')(observer(Channal)))