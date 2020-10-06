const { InputValidation } = require('ebased/schema/inputValidation');

class ReportExchangeValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'EXCHANGE.REPORT_EXCHANGE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        id: { type: 'uuid/v4', required: true },
        baseCurrency: { type: String, required: true },
        baseAmount: { type: Number, required: true },
        destinationCurrency: { type: String, required: true },
        destinationAmount: { type: Number, required: true },
        rate: { type: Number, required: true },
      },
    })
  }
}

module.exports = { ReportExchangeValidation };