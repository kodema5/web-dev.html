// various components for index.html
import { html, useContext} from '../js/web.js'
import { Form, FormContext, } from '../js/cmp.js'

let Child = ({label, name, increment=1}) => {
    let {values, update, } = useContext(FormContext)

    return html`
    <div class="row">
        <div class="col">${label}</div>

        <div class="col">${ values[name] }</div>

        <div class="col">
        <button type="button"
            class="btn btn-secondary"
            onClick=${(e) => update({[name]:values[name] + increment})}>
        (+) ${increment}
        </button>
        </div>
    </div>
    `
}

let TextBox = ({label, name, placeholder}) => {
    let {values, update, } = useContext(FormContext)

return html`
    <div class="row">
        <div class="col">${label}</div>

        <div class="col">
        <input class="form-control"
            value=${values[name]}
            placeholder=${placeholder}
            onInput=${(e) => update({[name]:e.target.value})}>
        </button>
        </div>
        <div class="col"></div>
    </div>
    `
}

let Buttons = () => {
    let {values, reset} = useContext(FormContext)
    return html`
    <div class="row">
        <div class="col">
        <button type="button"
            class="btn btn-primary m-1"
            onClick=${(e) => alert(JSON.stringify(values))}
            >show values</button>
        <button type="button"
            class="btn btn-primary m-1"
            onClick=${(e) => reset()}
            >reset</button>

        </div>
    </div>
    `
}

export let FormCard = () => {
    return html`
    <div class="card m-1 h-100">
    <div class="card-header">Form and FormContext</div>
    <div class="card-body">
        <${Form}
            values=${{count1:100, count2:10, text:''}}
        >
        <${Child} label="Count 1" increment=${100} name="count1"/>
        <${Child} label="Count 2" increment=${10} name="count2"/>
        <${TextBox} label="Text" name="text" placeholder="enter text"/>
        <${Buttons} />
        </>
    </div>
    <div class="card-footer h6 small fst-italic">
        to track form's field values,
        Form accepts values={}, calc(values) attributes;
        FormContext provides values, update and reset
        for child components
    </div>
    </div>
    `
}
