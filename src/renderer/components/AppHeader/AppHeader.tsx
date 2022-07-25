import React, { useState } from "react";
import "./AppHeader.scss"
import classNames from "classnames"
import BIcon from "../Button/BIcon";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/menuItem";
import SearchWrapper from "../SearchWrapper/SearchWrapper";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const [Focus, setFocus] = useState(false)
  const onFocusChange = (value) => {
    setFocus(value)
  }
  return (
    <div className="appHeader">
      <div className={classNames('logoWrapper', {
        'is-fcous': !Focus
      })}>
        <div className="logo FlexCenter">
          <BIcon iconName="bilibili"  size={30} active></BIcon>
        </div>
        {
          !Focus ? <div className="menuWrapper">
            <Menu>
              <MenuItem disabled>
                <NavLink className="list-group-item" to="/">推荐</NavLink>
              </MenuItem>
              <MenuItem disabled>
                <NavLink className="list-group-item" to="/type">分类</NavLink>
              </MenuItem>
              <MenuItem disabled>
                <NavLink className="list-group-item" to="/live">直播</NavLink>
              </MenuItem>
              <MenuItem disabled>
                <NavLink className="list-group-item" to="/hot">热门</NavLink>
              </MenuItem>
            </Menu>
          </div> : null
        }

      </div>
      <SearchWrapper Focus={Focus} onFocusChange={onFocusChange} ></SearchWrapper>
    </div>
  )
}

export default AppHeader