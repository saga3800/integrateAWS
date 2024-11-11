'use strict'

const { InputValidation } = require('nbased/schema/inputValidation');

const schema ={
  strict: false,
  dni: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDay: { type: String, required: true }
}
class CreateClientValidation extends InputValidation {
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

module.exports = { CreateClientValidation};