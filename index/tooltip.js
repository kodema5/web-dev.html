import { html, useRef, render, isFunction} from '../js/web.js'

export let Tooltip = ({
    title: title_,
    tipCfg = {},

    children,
    ...attr
}) => {
    let spanEl = useRef(null)
    return html`
    <span
        ref=${spanEl}

        onMouseOver=${() => {
            var t = bootstrap.Tooltip.getInstance(spanEl.current)
            if (t) {
                t.show()
                return
            }

            t = bootstrap.Tooltip.getOrCreateInstance(spanEl.current, Object.assign({
                html: true,
                trigger: 'manual',
                title: ' '
            }, tipCfg))

            spanEl.current.addEventListener('show.bs.tooltip', () => {
                if (!t.tip) return

                let e = t.tip.getElementsByClassName('tooltip-inner')[0]
                e.innerHTML = ' '
            })

            spanEl.current.addEventListener('shown.bs.tooltip', () => {
                let e = t.tip.getElementsByClassName('tooltip-inner')[0]
                if (!e) return

                render(isFunction(title_) ? title_() : title_, e)

                e.addEventListener('mouseover', () => {
                    e.dataset.hovered = 'true'
                })

                e.addEventListener('mouseleave', () => {
                    delete e.dataset.hovered
                    t.hide()
                })
            })

            t.show()
        }}

        onMouseLeave=${() => {
            let t = bootstrap.Tooltip.getInstance(spanEl.current)
            if (!t) return

            setTimeout(() => {
                let e = t.tip.getElementsByClassName('tooltip-inner')[0]
                if (e.dataset.hovered=='true') return

                t.hide()
            }, 200)
        }}


        ...${attr}
    >${children}</span>
    `
}