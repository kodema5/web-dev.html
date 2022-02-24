// various components for index.html
import { html, render, useRef, createContext, useState, createRef, useReducer, useContext, forwardRef, getId, useLayoutEffect, isEmpty, isFunction, isString, } from '../js/web.js'
import { FormCard } from './form_card.js'
import { ModalCard } from './modal_card.js'
import { OptionsCard } from './options_card.js'
import { PaginationCard } from './pagination_card.js'
import { TextSearchCard} from './text_search_card.js'
import { TooltipCard } from './tooltip_card.js'


render(html`
<div class="container">
<div class="row mt-3 row-cols-1 row-cols-lg-3 g-4">
    <div class="col"><${FormCard} /></div>
    <div class="col"><${TextSearchCard} /></div>
    <div class="col"><${OptionsCard} /></div>
    <div class="col"><${TooltipCard} /></div>
    <div class="col"><${ModalCard} /></div>
    <div class="col"><${PaginationCard} /></div>
</div>
</div>
`, document.getElementById('root'))
