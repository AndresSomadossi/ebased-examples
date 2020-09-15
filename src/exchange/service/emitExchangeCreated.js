const sns = require('ebased/service/downstream/sns');

const EXCHANGE_CREATED_TOPIC = process.env.EXCHANGE_CREATED_TOPIC;

const emitExchangeCreated = async (exchangeCreatedEvent) => {
  const { eventPayload, eventMeta } = exchangeCreatedEvent.get();
  const lambdaInvokeParams = {
    TopicArn: EXCHANGE_CREATED_TOPIC,
    Message: eventPayload,
  };
  await sns.publish(lambdaInvokeParams, eventMeta);
}

module.exports = { emitExchangeCreated };