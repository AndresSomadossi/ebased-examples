const { batchIterator } = require('ebased/handler/input/batchEventQueue');
const { processingFinished, processingFinishedError } = require('ebased/handler/output/eventConfirmation');

module.exports.handler = async (events, context) => {
  try {
    console.log(JSON.stringify(events));
    const domain = ({ eventPayload }) => ({ body: eventPayload });
    await batchIterator(events, context, domain, processingFinished);
  } catch (error) {
    return processingFinishedError(error);
  }
}