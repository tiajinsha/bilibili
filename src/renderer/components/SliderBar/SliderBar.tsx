import React from "react";
import BIcon from "../Button/BIcon";
import "./SliderBar.scss"
import { Outlet, useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import {ipcRenderer} from "electron"
const SliderBar = () => {
  const navigate = useNavigate();
  const open= ()=>{
    console.log(12312)
    ipcRenderer.send('open3D')
  }
  return (
    <div className="slider">
      <div className="dynamic">
        <BIcon iconName="fanhui" type="click" className="back"></BIcon>
      </div>
      <div className="recommend">
        <div>
          <NavLink className="list-group-item" to="/"> <BIcon iconName="shouye">首页</BIcon></NavLink>
        </div>
        <div className="mt-10" >
          <BIcon iconName="bilibili-line" onClick={open}>Web3</BIcon>
        </div> 
    {/*     <div className="mt-10" >
          <NavLink className="list-group-item" to="/DynaMic"> <BIcon iconName="dongtai">动态</BIcon> </NavLink>
        </div>
        <div className="mt-10" >
          <NavLink className="list-group-item" to="/my"> <BIcon iconName="bilibili-line">我的</BIcon></NavLink>
        </div> */}
      </div>
      <div className="personal">
     {/*    <div className="avatar FlexCenter">
          <div className="userimg">
            <img src="https://gw.alicdn.com/tfs/TB1MOyyesieb18jSZFvXXaI3FXa-2880-1500.png" alt="" />
          </div>
        </div>
        <BIcon iconName="night" size={23}></BIcon>
        <BIcon iconName="shezhi"></BIcon> */}
      </div>
    </div>
  )
}
export default SliderBar