import { html, render, useState, useRef,  getId, isFunction, } from './js/web.js'
// import { DataListCard } from './index/datalist.js'
import { TextSearch } from './index/text_search.js'

let TextSearchCardInfo = () => {
    return html`
    <div><i class="bi bi-info-circle"></i> Enter a text to start search</div>
    `
}


let TextSearchCard = () => html`
    <div class="card">
        <div class="card-header">text search</div>
        <div class="card-body">
            <${TextSearch}
            placeholder="Enter text to start search"

            onFocus=${(e) => {
                e.show()
                if (e.value) return
                render(html`<${TextSearchCardInfo} />`, e.search)
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
                    `, e.search)
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



let Form = ({children}) => {

    return html`
    <div class="container">
    <div class="row mt-1">
        <h2>select</h2>
        <div class="card-group">
            <${TextSearchCard} />
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