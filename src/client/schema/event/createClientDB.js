const { DownstreamEvent } = require('nbased/schema/downstreamEvent');

class CreateClientDBEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CLIENT_CREATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      inputSchema: {
        strict: false,
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        fechaNacimiento: { type: String, required: true }
      },
    })
  }
}

module.exports = { CreateClientDBEvent };