// Handler and Mapper (mode) Selection
const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
// Input Validation Schema
const { InputValidation } = require('ebased/schema/inputValidation');

// Service Command
const dynamo = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const TABLE_NAME = config.get('MENU_TABLE');

// Domain
const getFoodDomain = async () => {
  const listedFood = await listService();
  return { status: 200, body: listedFood };
};

// Service
const listService = async () => {
  const { Items } = await dynamo.queryTable({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'pk = :food',
    ExpressionAttributeValues: { ':food': 'food' },
  });
  return Items.map(e => {
    Object.keys(e).forEach(k => { if (k === 'pk' || k === 'sk') delete e[k] });
    return e;
  });
}

// Handler invocation
module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, getFoodDomain, outputMode);
};

class listFoodInputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: 'FOOD.LIST',
      specversion: 'v1.0.0',
      schema: { strict: false },
    });
  }
};