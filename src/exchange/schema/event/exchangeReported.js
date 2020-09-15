const { MetricEvent } = require('ebased/schema/metricEvent');

// Metric-Only Event
class ExchangeReported extends MetricEvent {
  constructor(payload) {
    super({
      type: 'EXCHANGE.EXCHANGE_REPORTED',
      specversion: 'v1.0.0',
      payload: payload,
      schema: {
        exchangeCreatedId: { type: String, required: true },
        status: { type: String, required: true },
      },
    })
  }
}

module.exports = { ExchangeReported };