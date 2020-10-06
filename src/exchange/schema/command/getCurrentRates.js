const { DownstreamCommand } = require('ebased/schema/downstreamCommand');

class GetCurrentRatesCommand extends DownstreamCommand {
  constructor(payload, meta) {
    super({
      type: 'GET_CURRENT_RATES_COMMAND',
      payload: payload,
      meta: meta,
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