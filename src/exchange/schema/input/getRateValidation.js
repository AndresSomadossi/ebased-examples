const { InputValidation } = require('ebased/utils/inputValidation');

class GetRateValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'EXCHANGE.GET_RATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        base: { type: String, required: true },
        destination: { type: String, required: true },
      },
    })
  }
}

module.exports = { GetRateValidation };