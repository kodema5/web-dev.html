import { html, useRef, useLayoutEffect, getId, } from '../web.js'
import '../jquery.js'
import '../datatables.js'

export let Grid = ({
    id = getId('grid'),
    on = {},
    once = {},
    ...dataTableOptions
}) => {
    let ref = useRef(null)

    useLayoutEffect(() => {
        let table = new DataTable(ref.current, dataTableOptions)

        Object.entries(on).forEach( ([e,f]) => {
            table.on(e, f)
        })

        Object.entries(once).forEach( ([e,f]) => {
            table.once(e, f)
        })
    },[])

    return html`<table id=${id} ref=${ref} class="table table-striped" style="width:100%"></table>`
}