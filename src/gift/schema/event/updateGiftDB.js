const { DownstreamEvent } = require('nbased/schema/downstreamEvent');

class UpdateGiftDBEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CARD.CARD_UPDATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        gift: { type: String, required: true }
      },
    })
  }
}

module.exports = { UpdateGiftDBEvent };