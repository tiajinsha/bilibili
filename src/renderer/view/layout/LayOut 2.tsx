import React, { FC, useEffect } from "react";
import reactVersion from "react/package.json";
import "./LayOut.scss";
import SliderBar from "@/components/SliderBar/SliderBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import { useLocation, useOutlet } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
const LayOut: FC = (props) => {
    const outlet = useOutlet()
    const location = useLocation();
    return (
        <div className="app">
            <SliderBar></SliderBar>
            <div className="rightSlider">
                <AppHeader></AppHeader>
                <div id="main" className="main" >
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} classNames="fade" timeout={200}>
                            {outlet}
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    );
};

export default LayOut


