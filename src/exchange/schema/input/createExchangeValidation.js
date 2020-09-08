const { InputValidation } = require('ebased/utils/inputValidation');

class CreateExchangeValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'EXCHANGE.CREATE_EXCHANGE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        base: { type: String, required: true },
        destination: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    })
  }
}

module.exports = { CreateExchangeValidation };