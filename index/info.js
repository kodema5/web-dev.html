import { html, } from '../js/web.js'

export let Info = ({
    label="This is a component"
}) => {
    return html`
    <div><i class="bi bi-info-circle"></i> ${label}</div>
    `
}
