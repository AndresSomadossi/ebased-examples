const config = require('ebased/util/config');
const lambda = require('ebased/service/downstream/lambda');
const { ErrorHandled } = require('ebased/util/error');

// Configs
const GET_RATE_FUNCTION_NAME = config.get('GET_RATE_FUNCTION_NAME');

const requestGetRate = async (getRateCommand) => {
  const { commandPayload, commandMeta } = getRateCommand.get();
  const lambdaInvokeParams = {
    FunctionName: GET_RATE_FUNCTION_NAME,
    Payload: commandPayload,
  };
  const response = await lambda.invoke(lambdaInvokeParams, commandMeta).catch(error => {
    // Errors from internal commands has the same error structure
    if (error instanceof ErrorHandled) getRateCommand.getErrorCataloged(error.code, error.message);
    throw error;
  });
  getRateCommand.validateResponse(response);
  return response.rate;
}

module.exports = { requestGetRate };