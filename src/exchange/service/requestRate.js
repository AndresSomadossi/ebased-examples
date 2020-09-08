const { ErrorHandled } = require('ebased/utils/error');
const lambda = require('ebased/downstream/lambda');

// Configs
const GET_RATE_FUNCTION_NAME = process.env.GET_RATE_FUNCTION_NAME;

const requestGetRate = async (getRateCommand) => {
  const { commandPayload, commandMeta } = getRateCommand.get();
  const lambdaInvokeParams = {
    FunctionName: GET_RATE_FUNCTION_NAME,
    Payload: commandPayload,
  };
  // Command meta injection
  lambdaInvokeParams.Payload.meta = commandMeta;

  const response = await lambda.invoke(lambdaInvokeParams).catch(error => {
    // Errors from internal commands has the same error structure
    if (error instanceof ErrorHandled) getRateCommand.getErrorCataloged(error.code, error.message);
    throw error;
  });
  getRateCommand.validateResponse(response);
  return response.rate;
}

module.exports = { requestGetRate };