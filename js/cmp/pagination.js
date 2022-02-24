import { html, } from '../web.js'

export let Pagination = ({
    page,
    totalCount = 0,
    pageSize = 10,
    range = 3,
    setPage,
    class:class_ = "pagination"
}) => {
    return html`<ul class=${class_}>
    ${(() => {
        let total = Math.ceil(totalCount / pageSize)
        if (total===0) return null

        let ps = getPages(page, total, range)
        if (ps.length===0) return null

        let maxPage = ps[ps.length - 1]
        let minPage = ps[0]
    	let arr = []

        if (page !== 1) {
            arr.push(pageItem({
            	pageNo: '<',
            	pageTo: page-1,
            	setPage,
        	}))
        }


        for (let i=0, n=ps.length; i<n; i++) {
            let p = ps[i]
            let f = i === n-2 && p+1 !== ps[i+1]
            arr.push(pageItem({
                isActive: p===page,
                pageNo: f ? '...' : p,
                pageTo: f ? Math.floor((p+ ps[i+1])/2) : p,
                setPage,
            }))
        }

        if (page!==maxPage) arr.push(pageItem({
           	pageNo: '>',
            pageTo: page + 1,
            setPage,
        }))

        return arr
    })()}
    </ul>`
}

let getPages = (
    page = 0,
    total = 0, // Math.ceil(total/sizePerPage)
    range = 2,
) => {
    if (total===0) return []

    range = range * 2
    var pages = []
    if (page < range) {
        pages = [...Array(range).keys()].map(i => i + 1)
    }
    else if (page + range >= total) {
        pages = [...Array(range).keys()].map(i => total - range + i)
    }
    else {
        pages = [...Array(range).keys()].map(i => page - range/2 + i)
    }
    pages = pages.filter(a => a<total)
    pages.push(total)

    return pages
}

let pageItem = ({
    isActive = false,
    pageTo,
    pageNo,
    setPage,
}) => html`
	<li class=${'page-item ' + (isActive ? 'active' : '')}>
    <span class="page-link"
    	onClick=${() => setPage(pageTo)}
	>${
		pageNo === '<' ? html`<i class="bi-chevron-left"></i>`
		: pageNo === '>' ? html`<i class="bi-chevron-right"></i>`
		: pageNo
	}</span></li>
`

