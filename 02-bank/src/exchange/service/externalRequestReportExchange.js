const config = require('ebased/util/config');
const downstreamRequest = require('ebased/service/downstream/request');
const { ErrorHandled } = require('ebased/util/error');

const URL = config.get('REPORT_EXCHANGE_URL');
const METHOD = config.get('REPORT_EXCHANGE_METHOD');
const TIMEOUT = config.get('REPORT_EXCHANGE_TIMEOUT');
const TIMEOUT2 = config.get('REPORT_EXCHANGE_TIMEOUT2');

// const { URL, METHOD, TIMEOUT } = config.get('REPORT_EXCHANGE_SERVICE');

const reportExchange = async (reportExchangeCommand) => {
  const { commandPayload } = reportExchangeCommand.get();
  const requestParams = {
    url: URL,
    method: METHOD,
    timeout: TIMEOUT,
    data: commandPayload,
  };
  // External commands doesn't use meta injection

  const response = await downstreamRequest(requestParams).catch(error => {
    if (error instanceof ErrorHandled) reportExchangeCommand.getErrorCataloged(error.code, error.message);
    throw error;
  });
  reportExchangeCommand.validateResponse(response);
  return response;
}

module.exports = { reportExchange };