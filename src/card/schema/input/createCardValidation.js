const { InputValidation } = require('nbased/schema/inputValidation');

const schema={
  strict: false,
  dni: { type: String, required: true },
  age: { type: Number, required: true },
  birthDay : { type: String, required: true }
}

class CreateCardValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CARD.CREATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      inputSchema: {
        schema
      },
    })
  }
}

module.exports = { CreateCardValidation};