import { html, useRef, useLayoutEffect, } from '../web.js'
import '../jquery.js'
import '../datatables.js'

export let Grid = ({
    on = {},
    once = {},
    ...dataTableOptions
}) => {
    let ref = useRef(null)
    console.log('options?', dataTableOptions)

    useLayoutEffect(() => {
        let table = new DataTable(ref.current, dataTableOptions)

        Object.entries(on).forEach( ([e,f]) => {
            table.on(e, f)
        })

        Object.entries(once).forEach( ([e,f]) => {
            table.once(e, f)
        })
    },[])

    return html`<table ref=${ref} class="table table-striped" style="width:100%"></table>`
}