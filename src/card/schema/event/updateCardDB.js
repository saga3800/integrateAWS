const { DownstreamEvent } = require('nbased/schema/downstreamEvent');

class UpdateClientDBEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CARD.CARD_UPDATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        creditCard: { type: String, required: true },
        cardNumber: { type: String, required: true },
        dueDateCard: { type: String, required: true },
        securityCode: { type: String, required: true }
      },
    })
  }
}

module.exports = { UpdateClientDBEvent };