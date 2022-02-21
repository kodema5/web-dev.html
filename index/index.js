// various components for index.html
import { html, render, createContext, useState, useReducer, useContext} from '../js/web.js'
import { OptionsCard } from './options_card.js'
import { TextSearchCard} from './text_search_card.js'
import { TooltipCard } from './tooltip_card.js'

let RESET = Symbol()
let FormContext = createContext(null)

let Form = ({
    values:initialValues = {},
    init = (a) => a,
    calc = (a) => a,
    children,
}) => {
    let [values, update] = useReducer(
        (state, values) => {
            return values === RESET
                ? init(initialValues)
                : calc({...state, ...values}) 
        }, 
        initialValues,
        init)

    return html`
        <${FormContext.Provider} value=${{
            values,
            update,
            reset: () => update(RESET)
        }}>
        ${children}
        </>
    `
}

let Child = () => {
    let {values, update, reset} = useContext(FormContext)
    console.log('---state?', values)
    return html`
    <button onClick=${(e) => update({count:values.count+1})}>${values.count}</button>
    <button onClick=${(e) => reset()}>RESET</button>
    `
}

let FormCard = () => {
    return html`
    <div>
        <${Form} values=${{count:100}}>
        Form 1
        <${Child} />
        </>
        <br/>
        <${Form} values=${{count:0}}>
        Form 2
        <${Child} />
        </>


    </div>
    `
}


render(html`
<div class="container">
<div class="row mt-3 row-cols-1 row-cols-lg-2 g-4">
    <div class="col"><${TextSearchCard} /></div>
    <div class="col"><${TooltipCard} /></div>
    <div class="col"><${OptionsCard} /></div>
</div>
<${FormCard} />
</div>
`, document.getElementById('root'))