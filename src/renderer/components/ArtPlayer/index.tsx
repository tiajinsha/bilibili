import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { useRef } from "react"
import Artplayer from "artplayer"
import Option from "artplayer/types/option"

export interface ArtPlayerProps {
    options: Option,
    reset?: any,
    getInstance?: (Artplayer) => void,
    ref:any
}
const ArtPlayer: React.FC<ArtPlayerProps> = forwardRef(({ options, getInstance, reset }, ref) => {
    const artPlayerRef = useRef<any>(null)
    const art = useRef(null)
    useImperativeHandle(ref, () => {
        return {
            destroy,
        };
    });
    const destroy = () => {
        if (art.current && art.current.destroy) {
            art.current.destroy(false)
        }
    }
    useEffect(() => {
        art.current = new Artplayer({
            ...options,
            container: artPlayerRef.current
        })
        if (getInstance && typeof getInstance === 'function') {
            getInstance(art.current)
        }
        return ()=> destroy()
    }, [])
    return <div style={{ width: "100%", height: "100%" }} ref={artPlayerRef} {...reset}></div>
})

export default ArtPlayer