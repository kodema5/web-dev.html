// AjV seems to be good
// https://ajv.js.org/

// https://json-schema.org/understanding-json-schema/index.html
// is a good resources for building schema

let schema= {
    type: 'object',
    properties: {
        title: {
            type: 'string'

        },
        name: {
            type: 'number',
            minimum: 1,
            maximum: 100,
        },
        some: {
            type: 'object',
            properties:{
                no: {
                    type: 'number',
                    maximum: 10,
                }
            },
        }
    },

    "additionalProperties": true
}

import Ajv from 'ajv'
let ajv = new Ajv({ allErrors:true, $data:true})
let validate = ajv.compile(schema)
let a = validate({title:'a',foo:'bar', some: { no:1000}})


let getErrors = (errors) => {
    if (!errors) return {}
    return errors.reduce( (x, a) => {
        return Object.assign({
            ...x,
            [a.instancePath?.replace('/', '') || '_']: a.message,
        })
    }, {})
}


// some issues with extracting the property names
//
console.log('----', a, getErrors(validate.errors))
// console.log('---2', ajv.errorsText(validate.errors))

// https://ajv.js.org/guide/managing-schemas.html
// useful when to combine varios schemas
