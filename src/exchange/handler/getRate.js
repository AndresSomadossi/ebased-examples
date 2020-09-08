const { request } = require('ebased/input/commandInvoke');
const { response, responseError } = require('ebased/output/commandInvoke');
const getRateDomain = require('../domain/getRate');

module.exports.handler = async (command, context) => {
  try {
    const { commandPayload, commandMeta } = request(command, context);

    const domainReturn = await getRateDomain(commandPayload, commandMeta);

    return response(domainReturn, commandMeta);
  } catch (error) {
    return responseError(error);
  }
}