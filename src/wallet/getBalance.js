const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const domain = async (commandPayload) => ({ status: 200, body: commandPayload });

module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, domain, outputMode);
}