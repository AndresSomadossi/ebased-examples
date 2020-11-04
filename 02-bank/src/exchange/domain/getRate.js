const { ErrorHandled } = require('ebased/util/error');
const { GetRateValidation } = require('../schema/input/getRateValidation');

const { GetCurrentRatesCommand } = require('../schema/command/getCurrentRates');
const { requestGetCurrentRates } = require('../service/externalRequestCurrentRates');

module.exports = async (commandPayload, commandMeta) => {
  new GetRateValidation(commandPayload, commandMeta);
  const { base, destination } = commandPayload;
  const rate = await requestGetCurrentRates(new GetCurrentRatesCommand({ base }, commandMeta));
  if (!rate[destination])
    throw new ErrorHandled(`Destination '${destination}' is not supported`, {
      code: 'INVALID_DESTINATION_ERROR',
      layer: 'DOMAIN'
    });
  return { body: { rate: rate[destination] } };

}