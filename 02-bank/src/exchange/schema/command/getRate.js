const { DownstreamCommand } = require('ebased/schema/downstreamCommand');

class GetRateCommand extends DownstreamCommand {
  constructor(payload, meta) {
    super({
      type: 'GET_RATE_COMMAND',
      payload: payload,
      meta: meta,
      requestSchema: {
        base: { type: String, required: true },
        destination: { type: String, required: true },
      },
      responseSchema: {
        rate: { type: Number, required: true },
      },
      errorCatalog: {
        'INVALID_BASE_ERROR': { code: 'INVALID_BASE_ERROR' },
      }
    })
  }
}

module.exports = { GetRateCommand };