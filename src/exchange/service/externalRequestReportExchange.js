const { ErrorHandled } = require('ebased/util/error');
const downstreamRequest = require('ebased/service/downstream/request');

const REPORT_EXCHANGE_URL = process.env.REPORT_EXCHANGE_URL;
const REPORT_EXCHANGE_METHOD = process.env.REPORT_EXCHANGE_METHOD;
const REPORT_EXCHANGE_TIMEOUT = process.env.REPORT_EXCHANGE_TIMEOUT;

const reportExchange = async (reportExchangeCommand) => {
  const { commandPayload } = reportExchangeCommand.get();
  const requestParams = {
    url: REPORT_EXCHANGE_URL,
    method: REPORT_EXCHANGE_METHOD,
    timeout: REPORT_EXCHANGE_TIMEOUT,
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