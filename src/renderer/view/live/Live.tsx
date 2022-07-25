

import React, { useEffect, useState } from "react"
import command from "./Live.module.scss"
import { InfiniteScroll } from 'antd-mobile'
import { observer, inject } from 'mobx-react';
import styleItem from "@/components/VideoItem/index.module.scss"
import { NavLink } from "react-router-dom";
import BIcon from "@/components/Button/BIcon";

interface HotProps {
    indexStore?: any
    viedoContext?: any
    liveStore: {
        setLiveData: any,
        LiveList: any,
        bannerList: any,
        LiveIndexData: () => Promise<any>,
        getLiveListInfo: () => Promise<any>
    }
}


const Live: React.FC<HotProps> = ({ liveStore }) => {
    const { getLiveListInfo, LiveList } = liveStore
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    async function loadMore() {
        await getLiveListInfo.bind(liveStore)({
            parentAreaId: 0,
            areaId: "",
            page: page,
            pageSize: 100
        })
        setPage(page + 1)
        setHasMore(true)
    }

    return (
        <div className={command.command}>
            <div className={command['content']}>
                {
                    LiveList?.map((item, index) => {
                        return <div className={styleItem['content-item']} key={index}>
                            <NavLink to={`/LiveDetail/${item.roomId}`} className={styleItem['link-item']} >
                                <div className={styleItem['location-wrapper']} >
                                    <img loading="lazy" alt={"awdawd"} src={item.cover} className={styleItem['pic']} onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1" }} />
                                    <div className={styleItem['videoMsg']}>
                                    </div>
                                </div>
                            </NavLink>
                            <div className={styleItem['text-content']}>
                                <div className={styleItem['content']}>{item.title}</div>
                                <div className={styleItem['up-icon']}>
                                    <BIcon iconName="UPzhu" size={18} type="hover"></BIcon>
                                    <div className={styleItem['upcontent']}> {item.upUser.name}· 6-23</div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <InfiniteScroll  loadMore={loadMore} hasMore={hasMore}>
            </InfiniteScroll>
        </div>
    )
}

export default inject('liveStore')(observer(Live))
