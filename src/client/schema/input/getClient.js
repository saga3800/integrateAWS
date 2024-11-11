'use strict'

const { InputValidation } = require('nbased/schema/inputValidation');

const schema ={
  dni: { type: String, required: true }
}
class GetClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      inputSchema: {
        schema
      },
    })
  }
}

module.exports = { GetClientValidation};