const uuid = require('uuid');
const { FaultHandled } = require('ebased/util/error');
const { CreateExchangeValidation } = require('../schema/input/createExchangeValidation');

const { GetRateCommand } = require('../schema/command/getRate');
const { requestGetRate } = require('../service/requestRate');

const { ExchangeCreatedEvent } = require('../schema/event/exchangeCreated');
const { emitExchangeCreated } = require('../service/emitExchangeCreated');

module.exports = async (commandPayload, commandMeta) => {
  // Input validation
  new CreateExchangeValidation(commandPayload, commandMeta);
  const { base, destination, amount } = commandPayload;
  // Service Sync 
  const rate = await requestGetRate(new GetRateCommand({ base, destination }, commandMeta));
  // Helper Function (only for this domain, so it belongs to this file) 
  const destinationAmount = getDestinationAmount(amount, rate);
  const exchangeCreated = {
    id: uuid.v4(),
    baseCurrency: base,
    baseAmount: amount,
    destinationCurrency: destination,
    destinationAmount: destinationAmount,
    rate: rate,
    message: `You have sold ${amount} ${base} and you have bought ${destinationAmount} ${destination}`,
  };
  // Service Async
  await emitExchangeCreated(new ExchangeCreatedEvent(exchangeCreated, commandMeta));
  // Body is always the payload of the command response
  return { body: exchangeCreated };
}

function getDestinationAmount(amount, rate) {
  try {
    return parseFloat((parseFloat(amount) * parseFloat(rate)).toFixed(2));
  } catch (error) {
    throw new FaultHandled(`Error calculating destination amount`, { code: 'GET_DESTINATION_AMOUNT', layer: 'DOMAIN' });
  }
}