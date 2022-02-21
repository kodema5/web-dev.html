import { html, createContext, useReducer, } from '../web.js'

let RESET = Symbol()

export let FormContext = createContext(null)

export let Form = ({
    values:initialValues = {},
    calc = (a) => a,
    children,
}) => {
    let [values, update] = useReducer(
        (state, values) => calc (
            values === RESET
            ? initialValues
            : {...state, ...values}
        ),
        initialValues,
        calc)

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