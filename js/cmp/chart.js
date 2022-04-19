import { html, useRef, useLayoutEffect, getId, } from '../web.js'
import '../chart.js'

export let Chart = ({
    id = getId('chart'),
    width = '100%',
    height = '400px',
    ...chartConfig

}) => {
    let ref = useRef(null)

    useLayoutEffect(() => {
        let chart = new window.Chart(ref.current, chartConfig)
        return () => {
            chart.destroy()
        }
    },[])

    return html`<canvas id=${id} ref=${ref}
        width=${width}
        height=${height}></canvas>`
}