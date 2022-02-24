import { html, useState, } from '../js/web.js'
import { Pagination } from '../js/cmp.js'


export let PaginationCard = () => {
    let [value, setValue] = useState('')

    return html`
    <div class="card m-1 h-100">
        <div class="card-header">Pagination</div>
        <div class="card-body">
        <${() => {
            let [page, setPage] = useState(1)

            return html`
                <div class="text-end">
                <${Pagination}
                page=${page}
                setPage=${setPage}
                totalCount=${101}
                class="pagination justify-content-center"
                />
                </div>
                Current Page: ${page}
            `
        }} />
        </div>
        <div class="card-footer h6 small fst-italic">
            <p>a simple pagination component</p>
        </div>
    </div>
    `
}
