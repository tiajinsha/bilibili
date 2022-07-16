import React, { createContext, useState } from "react";
import { Avatar, Card, Skeleton, Image } from 'antd';
import "./index.scss"
interface SkeletonProps {
    loading: boolean
}
const list = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
]
interface MenuContext {
    onSelect?: () => void;
}

const Skeletons = (props) => {


    return (
        <div className="Skeleton-list">
            {
                list.map((item,index) => {
                    return <Card
                    key={index}
                        style={{ width: 210, marginTop: 16 }}
                    >
                        <Skeleton.Image className="SkImage" />
                        <Skeleton active title={false} paragraph={{ rows:2,style:{marginTop:"10px"}}} >
                        </Skeleton>
                    </Card>
                })
            }


        </div>
    )
}

export default Skeletons