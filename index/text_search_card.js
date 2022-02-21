import { html, render, } from '../js/web.js'
import { TextSearch, } from '../js/cmp.js'
import { Info, } from './info.js'

export let TextSearchCard = () => html`
<div class="card">
    <div class="card-header">TextSearch</div>
    <div class="card-body">
        <${TextSearch}

        placeholder="Enter text to start search"
        onFocus=${(e) => {
            e.show()
            if (e.value) return
            render(html`<${Info} label="a component for text-search" />`, e.searchEl)
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
            e.update(h)
            setTimeout(() => {
                e.update(html`${t}, now is ${a.toLocaleString()}`)
            }, 2000)
        }}

        onBlur=${(e) => { e.hide() }}

        />
    </div>
    <div class="card-body h6 small">
        it consists of a text-field and a "searchEl" div below it.
        it iterates "on"-functions and add to its event param:
        searchEl, update (the searchEl div),
        text/setText,
        value/setValue,
        reset, show/hide
    </div>
</div>
`