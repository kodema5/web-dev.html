import { html, render,  } from './js/web.js'
import { TextSearchCard, TooltipCard } from './index/index.js'

let Form = ({children}) => {

    return html`
    <div class="container">
    <div class="row mt-3 row-cols-1 row-cols-lg-2 g-4">
        <div class="col"><${TextSearchCard} /></div>
        <div class="col"><${TooltipCard} /></div>
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