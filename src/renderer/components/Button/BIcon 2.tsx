import React, { ButtonHTMLAttributes, Children, CSSProperties, ReactNode } from "react";
import classNames from 'classnames'
import './BIcon.scss'
import { type } from "os";
export type ThemenProps = 'default' | 'hover' | 'click'

interface BIconProps extends Omit<ButtonHTMLAttributes<HTMLElement>, 'type'> {
    className?: string,
    size?: number,
    type?: ThemenProps,
    children?: ReactNode,
    iconName?: string,
    active?: boolean,
    fontSize?: number,
    style?: CSSProperties
}


const BIcon: React.FC<BIconProps> = (props) => {
    const { className, style, active, fontSize, iconName, type, size, children, ...resetProps } = props
    const classes = classNames('iconfont', {
        [`icon-${iconName}`]: iconName,
    })
    return (
        <div style={style} {...resetProps} className={classNames('buttonBox FlexCenter ', className, {
            "icon-hover": type === 'default',
            'active': active,
            'clickCss': type === "click"
        })}>
            {iconName ? <span style={{ fontSize: size ? size : "25px" }} className={classes}></span> : ''}
            {children ? <span className="contentText" style={{ fontSize: fontSize }}>{children}</span> : ''}
        </div>
    )
}

BIcon.defaultProps = {
    type: "default",
    active: false
}
export default BIcon