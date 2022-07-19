import React, { ReactNode, useContext, useRef } from "react";
import { MenuContext } from "./Menu";
import classNames from "classnames"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export interface MenuItemProps {
    disabled?: boolean,
    className?: string,
    to?: string,
    index?: string,
    children: ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    let location = useLocation();
    const { className, index, disabled,children } = props
    const navigate = useNavigate();
    const ref = useRef()
    const context = useContext(MenuContext)
    useEffect(() => {
    }, [location])
    const handleClick = () => {
        if (context.onSelect) {
            context.onSelect(index)
        }
    }
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index && !disabled,
        'subscript': context.index === index && !disabled ,
    })
    return (
        <li >
            <span ref={ref} className={classes} onClick={handleClick}>
                {children}
            </span>
        </li>
    )
}

export default MenuItem