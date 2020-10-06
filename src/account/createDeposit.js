const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/eventConfirmation');

const domain = async (eventPayload) => ({ body: eventPayload });

module.exports.handler = async (events, context) => {
  return batchEventMapper({ events, context }, inputMode, domain, outputMode);
}