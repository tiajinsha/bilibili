import React, { Children, createContext, HtmlHTMLAttributes, ReactHTML, ReactNode, useState } from "react";
import "./Menu.scss"
import { MenuItemProps } from "../Menu/menuItem";

interface MenuProps {
    children: ReactNode
    defaultIndex?: string
    onClickx: (index: string) => any
}

interface MenuContextProps {
    index: string,
    onSelect?: (selcet: string) => void
}
export const MenuContext = createContext<MenuContextProps>({ index: '0' })
const Menu: React.FC<MenuProps> = (props) => {
    const { children, defaultIndex, onClickx } = props
    const [index, setIndex] = useState(defaultIndex)
    const handleIndex = (index) => {
        setIndex(index)
        onClickx(index)
    }

    const passedContext: MenuContextProps = {
        index: index ? index : '0',
        onSelect: handleIndex,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childrenlement = child as React.FunctionComponentElement<MenuItemProps>
            return React.cloneElement(childrenlement, {
                index: index.toString()
            })
        })
    }
    return (
        <ul className="Menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0'
}

export default Menu