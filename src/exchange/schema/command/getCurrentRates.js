const { DownstreamCommand } = require('ebased/utils/downstreamCommand');

class GetCurrentRatesCommand extends DownstreamCommand {
  constructor(payload) {
    super({
      type: 'GET_CURRENT_RATES_COMMAND',
      payload: payload,
      requestSchema: {
        base: { type: String, required: true },
      },
      responseSchema: {
        strict: false,
        base: { type: String, required: true },
        rates: { type: Object, required: true },
      },
      errorCatalog: {
        'INVALID_BASE_ERROR': { code: 'INVALID_BASE_ERROR' },
      }
    })
  }
}

module.exports = { GetCurrentRatesCommand };