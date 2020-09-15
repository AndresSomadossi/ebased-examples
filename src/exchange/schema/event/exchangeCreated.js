const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ExchangeCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'EXCHANGE.EXCHANGE_CREATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        id: { type: 'uuid/v4', required: true },
        baseCurrency: { type: String, required: true },
        baseAmount: { type: Number, required: true },
        destinationCurrency: { type: String, required: true },
        destinationAmount: { type: Number, required: true },
        rate: { type: Number, required: true },
        message: { type: String, required: false },
      },
    })
  }
}

module.exports = { ExchangeCreatedEvent };