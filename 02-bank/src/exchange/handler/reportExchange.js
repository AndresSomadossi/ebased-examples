const { eventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/eventTopic');
const outputMode = require('ebased/handler/output/eventConfirmation');

const createExchangeDomain = require('../domain/reportExchange');

module.exports.handler = async (event, context) => {
  return eventMapper({ event, context }, inputMode, createExchangeDomain, outputMode);
}