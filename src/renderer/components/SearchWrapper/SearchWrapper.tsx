import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames"
import BIcon from "../Button/BIcon";
import "./SearchWrapper.scss"
import useDebounce from "@/usehooks/useDebounce";
import img1 from "@/assets/img/4d579fb61f9655316582db193118bba3a721eec0.png"
import img2 from "@/assets/img/e9e7a2d8497d4063421b685e72680bf1cfb99a0d.png"
import axios from "axios";

const handleFetch = (query: string) => {
    return axios.get(`https://www.baidu.com/sugrec?prod=pc&wd=${query}`)
        .then(res => {
            return res.data.g?.slice(0, 10).map((item: any) => {
                return { value: item.q, putval: res.data.q }
            })
        })
}
const SearchWrapper = (props) => {
    const { Focus, onFocusChange } = props
    const [inputValue, setInputValue] = useState('')
    const [resultList, setResultList] = useState([])
    const ref = useRef<HTMLInputElement>()
    const iconRef = useRef<HTMLInputElement>()
    const inputRef = useRef<HTMLInputElement>()
    const triggerSearch = useRef(false)
    const isSelcet = useRef(true)

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        triggerSearch.current = true
        isSelcet.current = true
        if (e.target.value === "") {
            setResultList([])
        }
    }
    const debouncedValue = useDebounce(inputValue, 400)
    useEffect(() => {
        ref.current.onmousedown = (e) => {
            e.preventDefault()
        }
        iconRef.current.onmousedown = (e) => {
            e.preventDefault()
        }
    }, [])
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const result = handleFetch(debouncedValue)
            result.then(res => {
                setResultList(res)
                console.log(resultList)
            })
        }
    }, [debouncedValue, handleFetch])
    const search = (e) => {
        e.preventDefault()
    }
    const handleSelect = (e) => {
        setInputValue(e.value)
        triggerSearch.current = false
        isSelcet.current = false
    }
    return (
        <div className={classNames('searchWrapper', {
            'is-fcous': Focus
        })}>
            <div className={classNames('searchPosition', {
                'addWidth': Focus
            })}>
                <div className={classNames('searchinput', {
                    'is-fcous': Focus
                })}>
                    <input ref={inputRef} type="text" value={inputValue} onChange={inputChange} onFocus={() => onFocusChange(true)} onBlur={() => onFocusChange(false)} placeholder="搜索感兴趣的视频" />
                    <div ref={iconRef} className="searchIconWrapper">
                        <BIcon style={{ margin: "0 10px 0 5px", visibility: `${inputValue.length === 0 ? 'hidden' : 'visible'}` }} onClick={() => { setInputValue(''), setResultList([]), isSelcet.current=true }} iconName="shanchu" size={15}></BIcon>
                        <BIcon onClick={search} iconName="sousuo" size={20}></BIcon>
                    </div>
                </div>
                <div ref={ref} className="searchResult" style={{ display: Focus && isSelcet.current ? 'block' : 'none' }} >
                    {
                        resultList?.length || inputValue !== "" ? <div style={{ marginTop: `${resultList?.length ? '50px' : '40px'}` }} className="searchList">
                            {resultList?.map((item, index) => {
                                return <div onClick={() => handleSelect(item)} key={index} className="searchItem">{item.value}</div>
                            })}
                        </div> : <div className="searchContent">
                            <div className="searchTitle">
                                <h3>搜索历史</h3>
                                <p>清空</p>
                            </div>
                            <div className="searchHistory">
                                <div className="historyList">awaw</div>
                                <div className="historyList">awdaw</div>
                                <div className="historyList">daw</div>
                                <div className="historyList">awdaw</div>
                                <div className="historyList">awdaw</div>
                                <div className="historyList">addwdaw</div>
                                <div className="historyList">awdddddaw</div>
                                <div className="historyList">awdw</div>
                                <div className="historyList">awddddaw</div>
                                <div className="historyList">awdw</div>
                            </div>
                            <div className="searchTitle mt-10">
                                <h3 >热搜</h3>
                            </div>
                            <div className="hotSearchList">
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawd娃大awdawdadaw王大王大王大的awdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="hotSearchList-item">
                                    <div className="paiming">1</div>
                                    <div className="text">awdawdawdawd</div>
                                    <div className="tagimg">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default SearchWrapper

