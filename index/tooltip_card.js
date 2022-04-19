import { html, render, useRef, } from '../js/web.js'
import { Tooltip, Options, } from '../js/cmp.js'
import { Info, } from './info.js'

export let TooltipCard = () => html`
<div class="card m-1 h-100">
    <div class="card-header">Tooltip</div>
    <div class="card-body">
        <${Tooltip}
            data-bs-placement="bottom"
            title=${() => {

                return html`
                <div class="container bg-body text-start text-dark" >
                <${Info} label="select below" />
                <${Options}
                ...${(() => {
                    let options = [ {a:'Foo'}, {a:'Bar'}, {a:'Baz'}, {a:'Bat'} ]
                    let values = options[0]
                    return {options, values}

                })()}

                getOption=${(a) => a.a}

                />
                </div>

                `
            }}
        >
        <i class="bi bi-info-circle"></i>
        </> hover here
    </div>
    <div class="card-footer h6 small fst-italic">
        <p>it wraps bootstrap.Tooltip to accept title function
        to be rendered in inner-tooltip element.</p>

        <p>tooltip will be kept when hovered.
            $tooltip-max-width=200px</p>
    </div>
</div>
`