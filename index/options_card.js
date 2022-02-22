import { html, render, getId, } from '../js/web.js'
import { Options } from '../js/cmp.js'

export let OptionsCard = () => {
    let id = getId()

    return html`
    <div class="card m-1 h-100">
        <div class="card-header">Options</div>
        <div class="card-body">
        <${Options}
            ...${(() => {
                let options = [ {a:'Foo'}, {a:'Bar'}, {a:'Baz'}, {a:'Bat'} ]
                let values = options[0]
                return {options, values}

            })()}



            onInput=${(a) => {
                let t = a.length===0
                    ? 'Select the above'
                    : 'Selected: ' + a.map(i => i.a).join()
                render(t, document.getElementById(id))
            }}

            getOption=${(a) => a.a}
        />
        <div id=${id}>Select the above</div>
        </div>
        <div class="card-footer h6 small fst-italic">
            an example for a multi-select,
            onInput is a callback for selection-change
        </div>
    </div>
    `
}

// options=${[ {a:'Foo'}, {a:'Bar'}, {a:'Baz'}, {a:'Bat'} ]}