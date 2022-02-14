import { html, render, getId, useState, isEmpty, } from '../js/web.js'


let DataList = ({
    id = getId('datalist'),
    placeholder = 'Type to search...',
    options:opt = [],
    onInput = () => {},
    onEnter = () => {},
    onEscape = () => {},
    value:val,
    ...attr
}) => {
    let [options, setOptions] = useState(opt)
    let [value, setValue] = useState(val)

return html`
    <div>
        <input
            class="form-control"
            list=${id + '-options'}
            id=${id}
            placeholder=${placeholder}

            value=${value}
            onInput=${(e) => {
                onInput(e, { setOptions, setValue })
            }}

            onKeyUp=${(e)=> {
                let k = e.key
                let fn = (k==='Enter') ? onEnter :
                    (k==='Escape') ? onEscape :
                    null
                if (fn) {
                    return fn(e, { setOptions, setValue })
                }
            }}
            ...${attr}
        />
        <datalist id=${id + '-options'}>
        ${options.map((a) => html`
            <option value=${a} />
        `)}
        </datalist>
    </div>
    `
}

export let DataListCard = () => html`
    <div class="card">
    <div class="card-header h6">
        datalist is useful for finding valid entries
    </div>
    <div class="card-body">
        <${DataList}
            onInput=${async (e, {setOptions}) => {
                let v = e.target.value
                console.log('--v?', v)

                setTimeout(() => {
                    setOptions([
                    'San Diego',
                    'San Francisco'
                    ])

                }, 100)
            }}

            onBlur=${e => {
                console.log('e.target.value?', e.target.value)
            }}
        />
    </div>
    <div class="card-body h6">
        it is great for searching entries
    </div>
    </div>
`