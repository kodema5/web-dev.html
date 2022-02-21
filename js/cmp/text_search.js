import { html, useRef,  getId, isFunction, useState, render, } from '../web.js'

export let TextSearch = ({
    id = getId('textsearch'),
    searchStyle:searchStyle_,
    value:val_ = null,
    text:txt_ = null,

    ...attr
}) => {
    let textRef = useRef(null)
    let searchRef = useRef(null)
    let [value, setValue] = useState(val_)
    let [text, setText] = useState(txt_)

    for (let [k, fn] of Object.entries(attr)) {
        if (!isFunction(fn) || k.indexOf('on') !==0) continue

        attr[k] = (ev) => fn(Object.assign(ev, {

            searchEl: searchRef.current,
            update: (a) => {
                render(a, searchRef.current)
            },

            value, setValue,
            text, setText,

            show: () => {
                searchRef.current.style.display = 'block'
            },
            hide: () => {
                searchRef.current.style.display = 'none'
            },
            reset: function() {
                setValue(val_)
                setText(txt_)
            }
        }))
    }

    return html`
    <div>
        <input
            id=${id}
            ref=${textRef}
            class="form-control"
            value=${text}
            ...${attr}
        />
        <div
            id=${id + '-search'}
            ref=${searchRef}
            style=${Object.entries(Object.assign({
                    'background-color': '#fff',
                    'border': '1px solid #e4e4e4',
                    'display': 'none',
                    'margin-top': '5px',
                    'max-height': '300px',
                    'overflow-y': 'auto',
                    'padding': '5px',
                    'position': 'absolute',
                    'white-space': 'normal',
                    'width': '96.25%',
                    'z-index': 100,
                }, searchStyle_))
                .filter( ([_,v]) => v)
                .map(a => a.join(':'))
                .join(';')
            }
        ></div>
    </div>
    `
}


