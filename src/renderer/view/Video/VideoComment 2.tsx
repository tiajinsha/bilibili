import { getComments } from "@/api"
import React, { useEffect } from "react"
import styles from "./VidoeComment.module.scss"
const url = 'http://i1.hdslb.com/bfs/storyff/n220415a2zwx8s5itoba82xnblp6j9kr_firsti.jpg'
interface VideoComment{
    style:any
    aid:number
}

const VideoComment = (props) => {
    const {style,aid} =props

    return (
        <div style={style} className={styles['VideoComment']}>
            <div className={styles['content']}>
                <div className={styles['avtor']}>
                    <img src={url} alt="" />
                </div>
                <div className={styles['rightContetn']}>
                    <div className={styles['username']} >awdawdawdawdawd</div>
                    <div className={styles['time']}>123-1231</div>
                    <div className={styles['content-text']}>
                        <span>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In animi, sit iure error itaque voluptatem voluptates? Exercitationem, repellat! Maiores voluptatum iusto quia! Ipsam repudiandae repellat quaerat accusantium sit iste soluta?
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default VideoComment