const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { InputValidation } = require('ebased/schema/inputValidation');

const dynamo = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const TABLE_NAME = config.get('MENU_TABLE');

// Domain
const updateFoodDomain = async (commandPayload, commandMeta) => {
  const food = new updateFoodInputSchema(commandPayload, commandMeta).get();
  const updatedFood = await updateService(food);
  return { status: 200, body: updatedFood };
};

// Service
const updateService = async (food) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { pk: 'food', sk: food.id },
    UpdateExpression: 'SET',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: 'ALL_NEW',
  }
  Object.keys(food).forEach(key => {
    params.UpdateExpression += ` #${key}=:${key},`;
    params.ExpressionAttributeNames[`#${key}`] = key;
    params.ExpressionAttributeValues[`:${key}`] = food[key];
  });
  params.UpdateExpression = params.UpdateExpression.slice(0, -1);
  const { Attributes } = await dynamo.updateItem(params);
  Object.keys(Attributes).forEach(k => { if (k === 'pk' || k === 'sk') delete Attributes[k] });
  return Attributes;
};

// Handler invocation
module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, updateFoodDomain, outputMode);
};

class updateFoodInputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: 'FOOD.UPDATE',
      specversion: 'v1.0.0',
      schema: {
        strict: false,
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    });
  }
};