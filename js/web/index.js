// curl -L https://unpkg.com/preact@10.6.6/dist/preact.module.js > preact.js
// curl -L https://unpkg.com/preact@10.6.6/hooks/dist/hooks.module.js > preact.hooks.js
// curl -L https://unpkg.com/preact@10.6.6/compat/dist/compat.module.js > preact.compat.js
// then fix references
// curl -L https://unpkg.com/htm@3.1.0/dist/htm.module.js > htm.js

import { h, render } from './preact.js'
import { useState, useReducer, useMemo, useCallback, useRef, useContext, useEffect, useLayoutEffect, useErrorBoundary, } from './preact.hooks.js'
import { createContext, createRef, } from './preact.js'
import { forwardRef, } from './preact.compat.js'
import htm from "./htm.js"
const html = htm.bind(h)

// utilities

const isEmpty = (a) => (a==null) || (a==='') || (Array.isArray(a) && a.length===0)

const isString = (a) => (typeof a === 'string')

const isBoolean = (a) => (typeof a === 'boolean')

const isFunction = (a) => (typeof a === 'function')

const isObject = (a) => (a !== null && a instanceof Object && a.constructor === Object)


const cleanObject = (obj) => {
    let v = {}
    for (let k in obj) {
        let a = obj[k]
        if (isEmpty(a)) continue
        v[k] = a
    }
    return v
}

const setObject = (root, path, value) => {

    let keys = path.split('.')
    let lastKey = keys.pop()

    var r = root || {}
    keys.forEach(k => {
        if (!r.hasOwnProperty(k)) r[k] = {}
        r = r[k]
    })

    r[lastKey] = value

    return root
}

const getObject = (root, path, defaultValue) => {
    let keys = path.split('.')
    let r = root || {}
    for (let k of keys) {
        if (!r.hasOwnProperty(k)) return defaultValue
        r = r[k]
    }
    return r
}

const deleteObject = (root, path) => {
    let keys = path.split('.')
    let lastKey = keys.pop()

    var r = root || {}
    for (let k of keys) {
        if (!r.hasOwnProperty(k)) return false
        r = r[k]
    }

    return delete r[lastKey]
}

const parseJSON = (s, defaultValue) => {
    try {
        return JSON.parse(s)
    } catch(x) {
        return defaultValue
    }
}

var arrayFrom = (val) => (val === undefined || val===null) ? []
	: Array.isArray(val) ? val
	: [val]

// stored functions
const Fn = (a) => isFunction(a) ? a : (() => a)

const functions = {}

const fset = (name, fn) => {
    if (fn===null || fn===undefined) {
        delete functions[name]
    } else {
        functions[name] = fn
    }
}

const fpipe = async (names, arg0) => {
    var fs = arrayFrom(names)
        .map((n) => functions[n])
        .filter(Boolean)

    var x = arg0
    while(fs.length > 0) {
        let fn = fs.shift()
        x = await Fn(fn)(x)
    }
    return x
}

const fcall = async(name, arg) => {
	if (Array.isArray(name)) return fcallarray(name, arg)
    if (isObject(name)) return fcallobject(name)

    let fn = functions[name]
    if (!fn) return undefined
    return await Fn(fn)(arg)
}


const fcallarray = async (names, arg) => {
	let ps = arrayFrom(names)
        .map(n => functions[n])
        .filter(Boolean)
        .map(async (fn) => await Fn(fn)(arg))

    return await Promise.all(ps)
}


const fcallobject = async (names) => {
	let ns = Object.entries(names)
        .map( ([n, arg]) => {
            let fn = functions[n]
            return !fn ? null : ([n, Fn(fn)(arg)])
        })
        .filter(Boolean)

    let ps = ns.map( ([n,p]) => p)
    let values = await Promise.all(ps)
    let entries = ns.map( (a, i) => [a[0], values[i]])
    return Object.fromEntries(entries)
}



// ID
var _Id = 0

const getId = (t = 'el') => {
    return t + '-' + (++_Id)
}

// AJAX
//
const defaultAjaxHeaders = {
    'Content-Type': 'application/json'
}

const CANCEL_AJAX_REQUEST = Symbol('cancel-ajax-request')

const requestBody = (data, type) => {
    switch(type) {
        case "any": return data
        case "text": return data ? data.toString() : data
        case "json": return JSON.stringify(data)
    }

    throw new Error('unknown request data type')
}

const responseData = (res, type) => {
    switch(type) {
        case 'arrayBuffer': return res.arrayBuffer()
        case 'blob': return res.blob()
        case 'formData': return res.formData()
        case 'json': return res.json()
        case 'text': return res.text()
    }

    throw new Error('unknown response type')
}

const Ajax = ({
    url,
    data,
    input = (a) => a,
    output = (a) => a,

    headers, // to be overridden
    body, // for FormData, URLSearchParams, string, etc

    method = 'POST',
    timeout = 0,

    requestType = 'json', // json, text, any
    responseType = 'json', // arrayBuffer, blob, formData, json, text

} = {}) => {
    if (!url) throw new Error('missing required url')

	// validate data
    //
    try {
        data = input(data)
    } catch(e) {
        if (e === CANCEL_AJAX_REQUEST) return
        throw e
    }

    // build fetch options
    //
    let signon = getStorage('auth.signon') || {}
    let fetchOpt = {
        method,
        headers: Object.assign(cleanObject({
            namespace: signon.session_id
        }), defaultAjaxHeaders, headers),
    }

    // fix-body
    let hasBody = !(method==='GET' || method==='HEAD')
    if (hasBody) {
        fetchOpt.body = body
        	|| requestBody(data, requestType)
    }

	// add abort
    var timedOut = false
    let abortCtrl = new AbortController()
    if (timeout) {
        setTimeout(() => {
            timedOut = true
            abortCtrl.abort()
        }, timeout)
    }
    fetchOpt.signal = abortCtrl.signal


    // fetch
    let response = fetch(url, fetchOpt)
    .then(r => {
        if (!r.ok) throw new Error('network error')
        return responseData(r, responseType)
    })
    .then(r => output(r))

    return {
        response,
        abort: () => abortCtrl.abort(),
        isTimedOut: () => timedOut
    }
}

const ajax = async (cfg) => {
    let { response } = Ajax(cfg)
    let { data, error } = await response
    if (error) throw new Error(error)
    return data
}

const ajaxFn = (cfg) => (data) => {
    let { response } = Ajax(Object.assign({}, cfg, {data})) || {}
    return response
}

// STORAGE/STATE
//
const SESSION_STORAGE_ID = 'web-dev-storage'
var state = null

const setStorage = (path, value) => {
    state = setObject(state || {}, path, value)
}

const getStorage = (path, defaultValue) => state && path
    ? getObject(state , path, defaultValue)
    : state

const removeStorage = (path) => state && deleteObject(state, path)

const clearStorage = () => {
    state = null
    window.sessionStorage.clear()
}

const saveStorage = () => {
    window.sessionStorage.setItem(SESSION_STORAGE_ID, JSON.stringify(state))
}

const loadStorage = () => {
    let s = window.sessionStorage.getItem(SESSION_STORAGE_ID)
    state = parseJSON(s)
}

// maintain state on page reload
//
loadStorage()
window.addEventListener('beforeunload', saveStorage)

// PUBSUB
//
class PubSub {
    constructor ({
        broadcastChannelId
    }) {
        var me = this
        me._id = 0
        me.channels = {}

        if (broadcastChannelId) {
            let bc = new BroadcastChannel(broadcastChannelId)

            bc.onmessage = (ev) => {
                let {ch, args} = ev.data
                me.publish_.apply(me, [ch].concat(args))
            }

            me.broadcastChannel = bc
        }
    }


    names(id) {
        let [ch, ...ns] = (id || '').split('.')
        return [ch, ns.join('.')
            || `_${++this._id}`] // fallback-id
    }


    subscribe(id, fn, {override=false} ={}) {
        let [ch, n] = this.names(id)
        if (!ch) return

        let channels = this.channels
        if (!channels[ch]) channels[ch] = {}
        let subscribers = channels[ch]

        if (subscribers[n] && !override) {
            throw `subscribe: ${id} already exists`
        }

        subscribers[n] = fn
        return [ch, n].join('.')
    }


    unsubscribe(id) {
        let [ch, n] = this.names(id)
        if (!ch) return

        let subscribers = this.channels[ch]
        if (!subscribers) return

        return delete subscribers[n]
    }

    publish_(ch, ...args) {
        let subscribers = this.channels[ch]
        if (!subscribers) return

        let fns = Object.values(subscribers)
        setTimeout(() => {
            fns.map(fn => fn.apply(null, args))
        }, 0)

        return fns.length

    }

    publish(ch, ...args) {
        if (ch.slice(-1)==='!' && this.broadcastChannel ) {
            this.broadcastChannel.postMessage({
                ch, args
            })
        }
        return this.publish_.apply(this, [ch].concat(args))
    }


    async exec(ch, ...args) {
        let subscribers = this.channels[ch]
        if (!subscribers) return

        let fns = Object.values(subscribers)
            . map(fn => fn.apply(null, args))
        let arr = await Promise.all(fns)

        return Object.keys(subscribers)
            .reduce( (x, id, i) => {
                x[id] = arr[i]
                return x
            }, {})
    }
}

// for a global pubsub
//
const BROADCAST_CHANNEL_ID = 'web-dev-channel'
let ps = new PubSub({
    broadcastChannelId: BROADCAST_CHANNEL_ID
})
const publish = ps.publish.bind(ps)
const subscribe = ps.subscribe.bind(ps)
const unsubscribe = ps.unsubscribe.bind(ps)
const exec = ps.exec.bind(ps)


// export to global
//
window.Web = {
    html, render,
    useState, useReducer, useMemo, useCallback, useRef, useContext, useEffect, useLayoutEffect, useErrorBoundary,
    createContext, createRef, forwardRef,
    ajax, ajaxFn,
    setStorage, getStorage, removeStorage, clearStorage, saveStorage, loadStorage,
    PubSub, publish, subscribe, unsubscribe, exec,
    isEmpty, isString, isBoolean, isObject, isFunction,
    cleanObject, setObject, getObject, deleteObject,
    arrayFrom, Fn, functions, fset, fcall, fpipe,
    getId,
}

// ex:
// <script type="module">
// import {ajax, } from '/web.js'
// </script>
export {
    html, render,
    useState, useReducer, useMemo, useCallback, useRef, useContext, useEffect, useLayoutEffect, useErrorBoundary,
    createContext, createRef, forwardRef,
    ajax, ajaxFn,
    setStorage, getStorage, removeStorage, clearStorage, saveStorage, loadStorage,
    PubSub, publish, subscribe, unsubscribe, exec,
    isEmpty, isString, isBoolean, isObject, isFunction,
    cleanObject, setObject, getObject, deleteObject,
    arrayFrom, Fn, functions, fset, fcall, fpipe,
    getId,
}

