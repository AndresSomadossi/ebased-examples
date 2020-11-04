const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { InputValidation } = require('ebased/schema/inputValidation');

const dynamo = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');
const { ErrorHandled } = require('ebased/util/error');
const TABLE_NAME = config.get('MENU_TABLE');

// Domain
const getFoodDomain = async (commandPayload, commandMeta) => {
  const food = new getFoodInputSchema(commandPayload, commandMeta).get();
  const gettedFood = await getService(food);
  return { status: 200, body: gettedFood };
};

// Service
const getService = async (food) => {
  const { Item } = await dynamo.getItem({
    TableName: TABLE_NAME,
    Key: { pk: 'food', sk: food.id },
  });
  if (!Item) throw new ErrorHandled('Missing Food', { status: 404, code: 'NOT_FOUND' });
  Object.keys(Item).forEach(k => { if (k === 'pk' || k === 'sk') delete Item[k] });
  return Item;
}

// Handler
module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, getFoodDomain, outputMode);
};

class getFoodInputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: 'FOOD.GET',
      specversion: 'v1.0.0',
      schema: {
        strict: false,
        id: { type: String, required: true },
      },
    });
  }
};