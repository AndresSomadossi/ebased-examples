const { DownstreamCommand } = require('ebased/utils/downstreamCommand');

class ReportExchangeCommand extends DownstreamCommand {
  constructor(payload) {
    super({
      type: 'REPORT_EXCHANGE_COMMAND',
      payload: payload,
      requestSchema: {
        id: { type: 'uuid/v4', required: true },
        baseCurrency: { type: String, required: true },
        baseAmount: { type: Number, required: true },
        destinationCurrency: { type: String, required: true },
        destinationAmount: { type: Number, required: true },
        rate: { type: Number, required: true },
        message: { type: String, required: false },
      },
      responseSchema: {
        strict: false,
        data: { type: Object, required: true }
      },
      errorCatalog: {}
    })
  }
}

module.exports = { ReportExchangeCommand };