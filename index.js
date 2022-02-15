import { html, render, useState, useRef,  getId, isFunction, } from './js/web.js'
// import { DataListCard } from './index/datalist.js'
import { TextSearch } from './index/text_search.js'
import { Tooltip } from './index/tooltip.js'

let TextSearchCardInfo = ({
    label="This is a component"
}) => {
    return html`
    <div><i class="bi bi-info-circle"></i> ${label}</div>
    `
}


let TextSearchCard = () => html`
<div class="card">
    <div class="card-header">Text-Search</div>
    <div class="card-body">
        <${TextSearch}
        placeholder="Enter text to start search"

        onFocus=${(e) => {
            e.show()
            if (e.value) return
            render(html`<${TextSearchCardInfo} label="a component for text-search" />`, e.searchEl)
        }}

        onInput=${async (e) => {
            let a = new Date()
            let t = e.target.value

            e.setValue(a)
            e.setText(e.target.value)

            let h = html`<div class="d-flex justify-content-center">
                <div class="spinner-border text-secondary m-3" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>`
            render(h, e.searchEl)
            setTimeout(() => {
                render(html`
                    ${t}, now is ${a.toLocaleString()}
                `, e.searchEl)
            }, 2000)
        }}

        onBlur=${(e) => {
            e.hide()
        }}

        />

    </div>
    <div class="card-footer h6">
        consists of a text-field and a "search" div underneath it.
        for attribute "on" with function, reference to
        searchEl (div), text/setText, value/setValue, reset, show/hide
        will be injected to event object
    </div>
</div>
`

let TooltipCard = () => html`
<div class="card">
    <div class="card-header">Tip</div>
    <div class="card-body">
    <${Tooltip}
        data-bs-placement="bottom"
        title=${() => html`<${TextSearchCardInfo} label="a component for tooltip" />`}
    >
    <i class="bi bi-info-circle"></i>
    </> hover here
    </div>
    <div class="card-footer h6">
        it wraps bootstrap.Tooltip to accept components,
        tooltip will be kept when hovered
    </div>
</div>
`



let Form = ({children}) => {

    return html`
    <div class="container">
    <div class="row mt-1">
        <h2>select</h2>
        <div class="card-group">
            <${TextSearchCard} />
            <${TooltipCard} />

        </div>
    </div>
    </div>`
}


render(html`
    <div>
        <${Form} >
            <hr />
            <p>Testing.....</p>
        </>

    </div>


`, document.getElementById('root'))