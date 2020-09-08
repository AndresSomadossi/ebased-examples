const lambda = require('ebased/downstream/lambda');

const REPORT_EXCHANGE_FUNCTION_NAME = process.env.REPORT_EXCHANGE_FUNCTION_NAME;

const emitExchangeCreated = async (exchangeCreatedEvent) => {
  const { eventPayload, eventMeta } = exchangeCreatedEvent.get();
  const lambdaInvokeParams = {
    FunctionName: REPORT_EXCHANGE_FUNCTION_NAME,
    Payload: eventPayload,
  };
  // Event meta injection
  lambdaInvokeParams.Payload.meta = eventMeta;
  
  await lambda.invokeAsync(lambdaInvokeParams);
  // Event emitters do not receive errors (only faults), so, makes no sense to handle errors here.
}

module.exports = { emitExchangeCreated };