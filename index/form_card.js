// various components for index.html
import { html, useContext} from '../js/web.js'
import { Form, FormContext, } from '../js/cmp.js'

let Child = ({title, fieldName, increment=1}) => {
    let {values, update, reset} = useContext(FormContext)
    return html`
    <div class="row">
        <div class="col">${title}</div>

        <div class="col">${ values[fieldName] }</div>

        <div class="col">
        <button type="button"
            class="btn btn-secondary"
            onClick=${(e) => update({[fieldName]:values[fieldName] + increment})}>
        (+) ${increment}
        </button>
        </div>
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
            onClick=${(e) => alert(JSON.stringify(values))}>show</button>
        <button type="button"
            class="btn btn-primary m-1"
            onClick=${(e) => reset()}>reset</button>

        </div>
    </div>
    `
}

export let FormCard = () => {
    return html`
    <div class="card">
    <div class="card-header">Form and FormContext</div>
    <div class="card-body">
        <${Form}
            values=${{count1:100, count2:10}}
        >
        <${Child} title="Count 1" increment=${100} fieldName="count1"/>
        <${Child} title="Count 2" increment=${10} fieldName="count2"/>
        <${Buttons} />
        </>
    </div>
    <div class="card-body h6 small">
        to track values of a form (assumed as object),
        Form accepts values={}, calc(values) attributes;
        FormContext provides values, update and reset
        for child component to update a key in values
    </div>
    </div>
    `
}
