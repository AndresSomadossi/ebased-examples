const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { InputValidation } = require('ebased/schema/inputValidation');

const dynamo = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const TABLE_NAME = config.get('MENU_TABLE');

// Domain
const deleteFoodDomain = async (commandPayload, commandMeta) => {
  const food = new deleteFoodInputSchema(commandPayload, commandMeta).get();
  await deleteService(food);
  return { status: 204 };
};

// Service
const deleteService = async (food) => dynamo.deleteItem({ TableName: TABLE_NAME, Key: { pk: 'food', sk: food.id } });

// Handler
module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, deleteFoodDomain, outputMode);
};

class deleteFoodInputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: 'FOOD.DELETE',
      specversion: 'v1.0.0',
      schema: {
        strict: false,
        id: { type: String, required: true },
      },
    });
  }
};