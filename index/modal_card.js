import { html, useState, } from '../js/web.js'
import { Modal } from '../js/cmp.js'


export let ModalCard = () => {
    let [value, setValue] = useState('')

    return html`
    <div class="card m-1 h-100">
        <div class="card-header">Modal</div>
        <div class="card-body">
            <p>
            <button
                class="btn btn-primary m-1"
                onClick=${() => Modal.alert(
                    'hello world',
                    () => {setValue(undefined)}
                )}
            >alert</button>

            <button
                class="btn btn-primary m-1"
                onClick=${() => Modal.confirm(
                    'hello world',
                    (v) => {
                        setValue(v)
                    }
                )}
            >confirm</button>
            <button
                class="btn btn-primary m-1"
                onClick=${() => Modal.prompt(
                    'hello world',
                    '123',
                    (v) => {
                        setValue(v)
                    }
                )}
            >prompt</button>

            </p>
            <p>Callback value: ${''+value}</p>
        </div>
        <div class="card-footer h6 small fst-italic">
            <p>it wraps bootstrap.Modal for modal windows.
            alert, confirm and prompt with a callback,
            and generic show are provided.</p>
        </div>
    </div>
    `
}
