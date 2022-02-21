import { html, render, getId, } from '../js/web.js'
import { Options } from '../js/cmp.js'

export let OptionsCard = () => {
    let id = getId()

    return html`
    <div class="card">
        <div class="card-header">Options</div>
        <div class="card-body">
        <${Options}
            options=${[ {a:'Foo'}, {a:'Bar'}, {a:'Baz'}, {a:'Bat'} ]}

            onInput=${(a) => {
                let t = a.length===0
                    ? 'Select the above'
                    : 'Selected: ' + a.map(i => i.a).join()
                render(t, document.getElementById(id))
            }}

            getOption=${(a) => a.a}
        />
        <div id=${id}>select the above</div>
        </div>
        <div class="card-body h6 small">
            a simple/example of a multi-select component,
            onInput is a callback for selection-change
        </div>
    </div>
    `
}