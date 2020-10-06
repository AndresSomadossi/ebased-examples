const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandInvoke');
const outputMode = require('ebased/handler/output/commandInvoke');

const createExchangeDomain = require('../domain/createExchange');

module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, createExchangeDomain, outputMode);
}