// various components for index.html
import { html, render, } from '../js/web.js'
import { OptionsCard } from './options_card.js'
import { TextSearchCard} from './text_search_card.js'
import { TooltipCard } from './tooltip_card.js'




let Form = ({children}) => {

    return html`
    <div class="container">
    <div class="row mt-3 row-cols-1 row-cols-lg-2 g-4">
        <div class="col"><${TextSearchCard} /></div>
        <div class="col"><${TooltipCard} /></div>
        <div class="col"><${OptionsCard} /></div>
    </div>
    </div>`
}


render(html`
    <div>
    <${Form} />
    </div>
`, document.getElementById('root'))