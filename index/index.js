// various components for index.html
import { html, render, createContext, useState, useReducer, useContext} from '../js/web.js'
import { FormCard } from './form_card.js'
import { OptionsCard } from './options_card.js'
import { TextSearchCard} from './text_search_card.js'
import { TooltipCard } from './tooltip_card.js'

// import { Form, FormContext, } from '../js/cmp.js'

// let Child = ({title, increment=1}) => {
//     let {values, update, reset} = useContext(FormContext)
//     return html`
//     <div class="row">
//         <div class="col">${title}</div>

//         <div class="col">${ values.count }</div>

//         <div class="col">
//         <button type="button"
//             class="btn btn-secondary"
//             onClick=${(e) => update({count:values.count + increment})}>
//         (+) ${increment}
//         </button>
//         </div>

//         <div class="col">
//         <button type="button"
//             class="btn btn-primary"
//             onClick=${(e) => reset()}>RESET</button>
//         </div>
//     </div>
//     `
// }

// let FormCard = () => {
//     return html`
//     <div class="card">
//     <div class="card-header">Form and FormContext</div>
//     <div class="card-body">
//         <${Form}
//             values=${{count:100}}
//         >
//         <${Child} title="Form 1" increment=${100} />
//         </>
//         <br/>
//         <${Form}
//             values=${{count:0}}
//         >
//         <${Child} title="Form 2"/>
//         </>
//     </div>
//     <div class="card-body h6 small">
//         to track values of a form (assumed as object),
//         Form accepts values={}, calc(values) attributes;
//         FormContext provides values, update and reset
//         for child component to update a key in values
//     </div>
//     </div>
//     `
// }


render(html`
<div class="container">
<div class="row mt-3 row-cols-1 row-cols-lg-2 g-4">
    <div class="col"><${TextSearchCard} /></div>
    <div class="col"><${TooltipCard} /></div>
    <div class="col"><${OptionsCard} /></div>
    <div class="col"><${FormCard} /></div>
</div>

</div>
`, document.getElementById('root'))