import React, { memo, useRef, useState } from "react"
import command from "./index.module.scss"
import { InfiniteScroll } from 'antd-mobile'
import { observer, inject } from 'mobx-react';
import VideoElements from "@/components/VideoItem/VideoItem"


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

interface CommandProps {
    indexStore?: any
    viedoContext?: any
}



const Command: React.FC<CommandProps> = ({ indexStore }) => {
    const { loadRepos, rankingVideos } = indexStore
    const [hasMore, setHasMore] = useState(true)
    const first = useRef(true)

    async function loadMore() {
        if (first.current) {
            await loadRepos.bind(indexStore)()
            first.current = false
            setHasMore(false)
        }
    }
    return (
        <div id="main" className="main">
            <div className={command.command}>
                <div className={command['content']}>
                    <VideoElements data={rankingVideos} VideoDetail={undefined} />
                </div>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                </InfiniteScroll>
            </div>
        </div>
    )

}

export default inject('indexStore', 'viedoContext')(observer(Command))
