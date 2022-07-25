import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import command from "./index.module.scss"
import { InfiniteScroll } from 'antd-mobile'
import { observer, inject } from 'mobx-react';
import VideoElements from "@/components/VideoItem/VideoItem"
import TabMenu from "@/components/TabMenu/TabMenu"



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

interface ClassiFicationProps {
    indexStore?: any
    viedoContext?: any
}


const ClassiFication: React.FC<ClassiFicationProps> = ({ indexStore }) => {
    const { loadRepos, indexVideoObj,setrankingVideos, Partitions, getloadPartionData, typeVideoObjectData } = indexStore
    const [select, setSelect] = useState('动画')
    const [hasMore, setHasMore] = useState(true)
    const [twoTitle, setTtitle] = useState(null)
    const [twoTitleSelected, seTtwoTitleSelected] = useState("MAD·AMV")

    const first = useRef(true)
    useEffect(() => {
        Partitions.map(item => {
            if (item.name === select) {
                setTtitle(item.children)
                seTtwoTitleSelected(item.children[0].name)
            }
        })
    }, [select])

    useEffect(() => {
        Partitions.map(item => {
            if (item.name === select) {
                setTtitle(item.children)
            }
        })
    })

    async function loadMore() {
        if (first.current) {
            await loadRepos.bind(indexStore)()
            await getloadPartionData.bind(indexStore)(indexStore.Partitions[0].children[0])
            console.log(typeVideoObjectData, "typeVideoList")
            first.current = false
            setHasMore(false)
        } else {
        }
    }

    const handleClick1 = async (item) => {
        Partitions.map(item => {
            if (item.name === select) {
                setTtitle(item.children)
                seTtwoTitleSelected(item.children[0].name)
            }
        })
        setSelect(item.name)
        if (select !== item.name) {
            setHasMore(true)
            await setrankingVideos.bind(indexStore)()
            await getloadPartionData.bind(indexStore)(item)
            setHasMore(false)
        }
    }
    const handleClick2 = async (item) => {
        seTtwoTitleSelected(item.name)
        if (twoTitleSelected !== item.name) {
            setHasMore(true)
            await setrankingVideos.bind(indexStore)()
            await getloadPartionData.bind(indexStore)(item)
            setHasMore(false)
        }
    }

    const tabBarData = [].concat(Partitions);
    return (
        <div className={command.command}>
            <TabMenu select={select} handleClick={handleClick1} data={tabBarData} style={undefined}></TabMenu>
            {
                twoTitle ? <TabMenu style={{ marginTop: "10px" }} select={twoTitleSelected} handleClick={handleClick2} data={twoTitle}></TabMenu> : null
            }
            <div className={command['content']}>
                <VideoElements data={typeVideoObjectData.videos} />
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            </InfiniteScroll>
        </div>

    )

}

export default inject('indexStore', 'viedoContext')(observer(ClassiFication))
