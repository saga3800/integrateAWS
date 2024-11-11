'use strict'

const { InputValidation } = require('nbased/schema/inputValidation');

 const products={
  product_code: { type: String, required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
 }

const schema = {
  dni_client: { type: String, required: true },
  products: {type: [products], required: true  }
}


class CreatePurchaseValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'PURCHASE.CREATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      inputSchema: {
        schema
      },
    })
  }
}

module.exports = { CreatePurchaseValidation };