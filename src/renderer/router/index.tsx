import LayOut from "@/view/layout/LayOut";
import React, { lazy } from "react";
import { HashRouter, RouteObject, useRoutes,Navigate } from "react-router-dom";
import DynaMic from "@/view/dynamic/DynaMic";
import My from "@/view/my/My";
import UserInfo from "@/view/userInfo/userInfo";
import Setting from "@/view/setting/setting";
import Commad from "@/view/command/Command";
import ClassiFication from "@/view/ClassiFication/ClassiFication";
import Live from "@/view/live/Live";
import Hot from "@/view/hot/Hot";
import VideoInfo from "@/view/Video/VideoInfos";
import LiveDetail from "@/view/LiveDetail/LiveDetail";
export const InnerRoute = () => {
    const routeList: RouteObject[] = [
        {
            path: "/",
            element: <LayOut />,
            children: [
                {
                    path: "/",
                    children: [
                        { index:true, element: <Commad  /> },
                        { path: "/type", element: <ClassiFication /> },
                        { path: "/live", element: <Live /> },
                        { path: "/hot", element: <Hot /> },
                    ]
                },
                {
                    path: "/DynaMic",
                    element: <DynaMic />,
                },
                {
                    path: "/my",
                    element: <My />,
                },
                {
                    path: "/userInfo",
                    element: <UserInfo />,
                },
                {
                    path: "/setting",
                    element: <Setting />,
                },
            ]
        },
        {
            path: "/VideoDetails/:aId",
            element: <VideoInfo />,
        },
        {
            path: "/LiveDetail/:roomId",
            element: <LiveDetail />,
        },
    ]
    const element = useRoutes(routeList);

    return element
}

const Container = () => {
    return (
        <HashRouter basename="/">
            <InnerRoute />
        </HashRouter>
    )
}

export default Container