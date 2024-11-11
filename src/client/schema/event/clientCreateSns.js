const { DownstreamEvent } = require('nbased/schema/downstreamEvent');

class ClientCreatedEventSns extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CLIENT_CREATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      inputSchema: {
        strict: false,
        dni: { type: String, required: true },
        age: {type: Number, required: true},
        birthDay: {type: String, required: true}
      },
    })
  }
}

module.exports = { ClientCreatedEventSns };