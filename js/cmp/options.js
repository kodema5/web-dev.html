// various components for index.html
import { html, render, useEffect, useState, getId, } from '../web.js'

let arrayFrom = (v) => {
    return v===null || v===undefined ? []
        : Array.isArray(v) ? v
        : [v]
}

let Option = ({
    selected = false,
    value,
    children,
    checkedIcon = 'bi-check-circle',
    unCheckedIcon = 'bi-circle',
    toggle = () => {}
}) => {
    return html`
    <div
        onClick=${() => toggle(value)}>
        <i class="${selected ? checkedIcon : unCheckedIcon}">${' '}</i>
        ${children}
    </div>`
}

export let Options = ({
    options = [],
    values:val_ = [],
    getOption = (a) => a,
    onInput = () => {},
    cls = 'overflow-auto h-50'
}) => {
    let [values, setValues] = useState(arrayFrom(val_))

    useEffect(() => {
        if (values==val_) return

        onInput(values)
    }, [values])

    return html`<div class=${cls}>
        ${options.map(a => html`<${Option}
            selected=${values.indexOf(a)>=0}
            value=${a}

            toggle=${(a) => {
                let i = values.indexOf(a)
                if (i<0) {
                    setValues(values.concat(a))
                } else {
                    values.splice(i, 1)
                    setValues([].concat(values))
                }
            }}

        >${getOption(a)}</option>`
        )}
    </div>`
}
