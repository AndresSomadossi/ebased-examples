const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');
const { FaultHandled } = require('ebased/util/error');

const domain = async (eventPayload, eventMeta, rawEvent) => {
  if (Math.random() > 0.5) throw new FaultHandled('Random Fault', { code: 'FAULT_RANDOM', layer: 'DOMAIN' });
  return { body: eventPayload };
};

const retryStrategy = (receiveCount) => 5 * receiveCount;

module.exports.handler = async (events, context) => {
  return batchEventMapper({ events, context }, inputMode, domain, outputMode, retryStrategy);
}