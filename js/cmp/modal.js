import { html, render, useRef, createRef, forwardRef, getId, useLayoutEffect, isEmpty, isFunction, isString, } from '../web.js'

let Fn = (f) => isFunction(f) ? f : (() => f)

let Button = ({
    label,
    class:cls="btn btn-primary",
    isClose = false,
    ...attr
}) => html`
    <button
        type="button"
        class=${cls}
        ...${attr}
        ...${isClose && ({"data-bs-dismiss":"modal"}) }
    >${label}</button>`


let View = ({
    id = getId('modal'),
    title = location.host,
    content,
    buttons = [],
}) => {
    let modalRef = useRef(null)

    useLayoutEffect(() => {
        let el = modalRef.current

        let m = new bootstrap.Modal(el)
        el.addEventListener('hidden.bs.modal', () => {
            m.dispose()
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
    <div class="modal-dialog">
    <div class="modal-content">
        ${title && html`<div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
        </div>`}

        <div class="modal-body">${Fn(content)()}</div>

        ${ !isEmpty(buttons) && html`
            <div class="modal-footer">
                ${buttons.map(a => html`<${Button} ...${a} />`)}
            </div>
        `}

    </div>
    </div>
    </div>`
}

// usually there's only 1 modal at any time
//
let show = ({
    id:id_ = getId('modal'),
    title = location.host,
    content,
    buttons,
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
            content=${content}
            buttons=${buttons}
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

let promptView = forwardRef(({label, value}, ref) => html`
    <div class="mb-3">
    <label class="form-label">${label}</label>
    <input ref=${ref} type="text" class="form-control" value=${value} />
    </div>
    `)


let prompt = (msg, value, onClose=()=>{}) => {
    let ref = createRef()
    let { title, content } = isString(msg)
        ? { content:html`<${promptView} ref=${ref} value=${value} label=${msg} />` }
        : msg

    show({
        title,
        content,
        buttons: [{
            label:'OK',
            isClose:true,
            onClick:() => onClose(ref.current.value)
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
