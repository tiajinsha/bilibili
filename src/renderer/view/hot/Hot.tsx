

import React, { useRef, useState } from "react"
import command from "./Hot.module.scss"
import { InfiniteScroll } from 'antd-mobile'
import { observer, inject } from 'mobx-react';
import VideoElements from "@/components/VideoItem/VideoItem"
import TabMenu from "@/components/TabMenu/TabMenu"

interface HotProps {
    indexStore?: any
    viedoContext?: any
    hootStore: any
}


const Hot: React.FC<HotProps> = ({ hootStore }) => {
    const { getRankingVideoList, RankingPartitions, reset, RankingVideos, getVideoList } = hootStore
    const [select, setSelect] = useState({ name: '动画', id: 1 })
    const [hasMore, setHasMore] = useState(true)
    const first = useRef(true)
    async function loadMore() {
        if (first.current) {
            await getRankingVideoList.bind(hootStore)(select.id)
            setHasMore(false)
            first.current = false
        }
    }

    const handleClick = async (item) => {
        setSelect(item)
        if (select !== item.name) {
            setHasMore(true)
            reset.bind(hootStore)()
            await getVideoList.bind(hootStore)(item.id)
            setHasMore(false)
        }
    }

    const tabBarData = [].concat(RankingPartitions);
    return (
        <div id="main" className="main">
            <div className={command.command}>
                <TabMenu select={select.name} handleClick={handleClick} data={tabBarData} style={undefined}></TabMenu>
                <div className={command['content']}>
                    <VideoElements data={RankingVideos} />
                </div>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                </InfiniteScroll>
            </div>
        </div>
    )

}

export default inject('hootStore')(observer(Hot))
