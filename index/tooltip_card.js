import { html, } from '../js/web.js'
import { Tooltip, } from '../js/cmp.js'
import { Info, } from './info.js'

export let TooltipCard = () => html`
<div class="card m-1 h-100">
    <div class="card-header">Tooltip</div>
    <div class="card-body">
        <${Tooltip}
            data-bs-placement="bottom"
            title=${() => html`<${Info} label="a component for tooltip" />`}
        >
        <i class="bi bi-info-circle"></i>
        </> hover here
    </div>
    <div class="card-footer h6 small fst-italic">
        <p>it wraps bootstrap.Tooltip to accept title function
        to be rendered in inner-tooltip element.</p>

        <p>tooltip will be kept when hovered.</p>
    </div>
</div>
`