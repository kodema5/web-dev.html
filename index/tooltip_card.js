import { html, } from '../js/web.js'
import { Tooltip, } from '../js/cmp.js'
import { Info, } from './info.js'

export let TooltipCard = () => html`
<div class="card">
    <div class="card-header">Tooltip</div>
    <div class="card-body">
        <${Tooltip}
            data-bs-placement="bottom"
            title=${() => html`<${Info} label="a component for tooltip" />`}
        >
        <i class="bi bi-info-circle"></i>
        </> hover here
    </div>
    <div class="card-body h6 small">
        it wraps bootstrap.Tooltip to accept title function that returns preact's components.
        tooltip will be kept when hovered.
    </div>
</div>
`