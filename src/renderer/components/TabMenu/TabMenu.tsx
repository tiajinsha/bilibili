import React from "react"
import command from "./index.module.scss"
import classNames from "classnames"
const TabMenu = ({data,handleClick,select,style})=>{
    return (
        <div className={command['command-header']} style={style}>
        {data?.map((item, index) => {
            return <div key={index} className={classNames(command['tab'], {
                [command['is-select']]: select === item.name
            })} onClick={() => handleClick(item)}>{item.name}</div>
        })}
        </div>
    )
}

export default TabMenu