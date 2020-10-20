const config = require('ebased/util/config');
const downstreamRequest = require('ebased/service/downstream/request');
const { ErrorHandled } = require('ebased/util/error');

const { URL, METHOD, TIMEOUT } = config.get('GET_CURRENT_RATES_SERVICE');

const requestGetCurrentRates = async (getCurrentRatesCommand) => {
  const { commandPayload, commandMeta } = getCurrentRatesCommand.get();
  const requestParams = {
    url: URL,
    method: METHOD,
    timeout: TIMEOUT,
    params: commandPayload,
  };

  const response = await downstreamRequest(requestParams, commandMeta).catch(error => {
    if (error instanceof ErrorHandled) {
      // In this case, errors come in this format: {error: 'details about the error'}, so we have to
      // normalize it.
      const { error: responseError } = error.message;
      const code = (responseError.includes('not supported')) ? 'INVALID_BASE_ERROR' : null;
      getCurrentRatesCommand.getErrorCataloged(code, responseError);
    }
    throw error;
  });
  getCurrentRatesCommand.validateResponse(response);
  return response.rates;
};

module.exports = { requestGetCurrentRates };