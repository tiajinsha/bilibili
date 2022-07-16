import React, { useState } from "react";
import "./AppHeader.scss"
import classNames from "classnames"
import BIcon from "../Button/BIcon";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/menuItem";
import SearchWrapper from "../SearchWrapper/SearchWrapper";

const AppHeader = () => {
  const [Focus,setFocus]=useState(false)
  const onFocusChange =(value)=>{
    console.log(value)
    setFocus(value)
  }
  return (
    <div className="appHeader">
      <div className={classNames('logoWrapper', {
        'is-fcous': !Focus
      })}>
        <div className="logo FlexCenter">
          <BIcon iconName="bilibili" size={30} active></BIcon>
        </div>
        {
          !Focus ? <div className="menuWrapper">
            <Menu>
              <MenuItem>推荐</MenuItem>
              <MenuItem>直播</MenuItem>
              <MenuItem>热门</MenuItem>
            </Menu>
          </div> : null
        }

      </div>
      <SearchWrapper Focus={Focus} onFocusChange={onFocusChange} ></SearchWrapper>
    </div>
  )
}

export default AppHeader