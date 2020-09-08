const { ErrorHandled } = require('ebased/utils/error');
const downstreamRequest = require('ebased/downstream/request');

const GET_RATES_URL = process.env.GET_RATES_URL;
const GET_RATES_TIMEOUT = process.env.GET_RATES_TIMEOUT;

const requestGetCurrentRates = async (getCurrentRatesCommand) => {
  const { commandPayload } = getCurrentRatesCommand.get();
  const requestParams = {
    url: GET_RATES_URL,
    timeout: GET_RATES_TIMEOUT,
    params: commandPayload,
  };

  const response = await downstreamRequest(requestParams).catch(error => {
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