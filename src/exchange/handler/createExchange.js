// Input & Output Handler Mode
const { request } = require('ebased/input/commandInvoke');
const { response, responseError } = require('ebased/output/commandInvoke');
// Domain
const createExchangeDomain = require('../domain/createExchange');

module.exports.handler = async (command, context) => {
  try {
    const { commandPayload, commandMeta } = request(command, context);

    const domainReturn = await createExchangeDomain(commandPayload, commandMeta);

    return response(domainReturn, commandMeta);
  } catch (error) {
    return responseError(error);
  }
}