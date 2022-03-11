import { html, render, useRef, useContext, createRef, forwardRef, getId, useLayoutEffect, isEmpty, isFunction, isString, } from '../web.js'
import { Form, FormContext, } from './form.js'

let Fn = (f) => isFunction(f) ? f : (() => f)

let Button = ({
    label,
    class:cls="btn btn-primary",
    isClose = false,
    onClick:onClick_,
    values,
    update,
    reset,
    ...attr
}) => html`
    <button
        type="button"
        class=${cls}
        ...${attr}
        ...${isClose && ({"data-bs-dismiss":"modal"}) }
        onClick=${() => {
            onClick_({values, update, reset})
        }}
    >${label}</button>`


let View = ({
    id = getId('modal'),
    title = location.host,
    size = '', // modal-sm modal-lg modal-xl
    content,
    values={},
    buttons = [],
}) => {
    let modalRef = useRef(null)

    useLayoutEffect(() => {
        let el = modalRef.current

        let m = new bootstrap.Modal(el)
        el.addEventListener('hidden.bs.modal', () => {
            m.dispose()
            el.parentElement.remove()
        })
        m.show()
    }, [])

    return html`
    <div
        id=${id}
        ref=${modalRef}
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
    >
    <div class=${`modal-dialog ${size}`}>
    <div class="modal-content">
        <${Form} values=${values}>
        ${title && html`<div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
        </div>`}

        <div class="modal-body"><${() => {
            let { values, update } = useContext(FormContext)
            return Fn(content)({ values, update})
        }} /></div>

        ${ !isEmpty(buttons) && html`<${() => {
            // ctx = { values, update, reset}
            //
            let ctx = useContext(FormContext)
            return html`
                <div class="modal-footer">
                ${buttons.map(a => html`<${Button} ...${ctx} ...${a} />`)}
                </div>`
        }} />`}
        </>
    </div>
    </div>
    </div>`
}

// usually there's only 1 modal at any time
//
let show = ({
    id:id_ = getId('modal'),
    title = location.host,
    size = '',
    content,
    buttons,
    values,
}, modalId='modal') => {
    let el = document.getElementById(modalId)
    if (!el) {
        el = document.createElement('div')
        document.body.appendChild(el)
    }
    render(html`
        <${View}
            id=${id_}
            title=${title}
            size=${size}
            content=${content}
            buttons=${buttons}
            values=${values}
        />
    `, el)
}

let alert = (arg, onClose=()=>{}) => {
    let { title, content } = isString(arg)
        ? { content:arg }
        : arg

    show({
        title,
        content,
        buttons: [{
            label:'OK',
            isClose:true,
            onClick:() => onClose()
        }]
    })
}

let confirm = (msg, onClose=()=>{}) => {
    let { title, content } = isString(msg)
        ? { content:msg }
        : msg

    show({
        title,
        content,
        buttons: [{
            label:'OK',
            isClose:true,
            onClick:() => onClose(true)
        }, {
            label: 'Cancel',
            isClose:true,
            class: 'btn btn-secondary',
            onClick:() => onClose(false)
        }]
    })
}

let prompt = (msg, value, onClose=()=>{}) => {

    let { title, content } = isString(msg)
        ? { content: ({values, update}) => {
            return html`
                <div class="mb-3">
                <label class="form-label">${msg}</label>
                <input
                    type="text"
                    class="form-control"
                    value=${values.prompt}
                    onInput=${(e) => update({prompt:e.target.value}) }
                />
                </div>
            ` }
        }
        : msg

    show({
        title,
        content,
        values: { prompt: value || '' },
        buttons: [{
            label:'OK',
            isClose:true,
            onClick:({values, update, reset}) => onClose(values.prompt)
        }, {
            label: 'Cancel',
            isClose:true,
            class: 'btn btn-secondary',
            onClick:() => onClose(null)
        }]
    })
}


export let Modal = {
    alert,
    show,
    confirm,
    prompt,
}
