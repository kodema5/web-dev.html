import { html, render, } from './js/web.js'
import { DataListCard } from './index/datalist.js'


let Form = ({children}) => {

    return html`
    <div class="container">
    <div class="row mt-1"><${DataListCard} /></div>

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