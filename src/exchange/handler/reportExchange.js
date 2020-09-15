const { eventReceived } = require('ebased/handler/input/eventTopic');
const { processingFinished, processingFinishedError } = require('ebased/handler/output/eventConfirmation');
const reportExchangeDomain = require('../domain/reportExchange');

module.exports.handler = async (event, context) => {
  try {
    const { eventPayload, eventMeta } = eventReceived(event, context);

    const domainReturn = await reportExchangeDomain( eventPayload, eventMeta);

    return processingFinished(domainReturn, eventMeta);
  } catch (error) {
    return processingFinishedError(error);
  }
}