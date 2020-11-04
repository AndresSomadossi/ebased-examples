const uuid = require('uuid');

const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { InputValidation } = require('ebased/schema/inputValidation');

const dynamo = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const TABLE_NAME = config.get('MENU_TABLE');

// Domain
const createFoodDomain = async (commandPayload, commandMeta) => {
  commandPayload.id = uuid.v4();
  const food = new createFoodInputSchema(commandPayload, commandMeta).get();
  await createService({ pk: 'food', sk: food.id, ...food });
  return { status: 200, body: food };
};

// Service
const createService = async (item) => dynamo.putItem({ TableName: TABLE_NAME, Item: item });

// Handler
module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, createFoodDomain, outputMode);
};

class createFoodInputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: 'FOOD.CREATE',
      specversion: 'v1.0.0',
      schema: {
        strict: false,
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    });
  }
};