const sns = require('ebased/service/downstream/sns');

const EXCHANGE_CREATED_TOPIC = process.env.EXCHANGE_CREATED_TOPIC;

const emitExchangeCreated = async (exchangeCreatedEvent) => {
  const { eventPayload, eventMeta } = exchangeCreatedEvent.get();
  const snsPublishParams = {
    TopicArn: EXCHANGE_CREATED_TOPIC,
    Message: eventPayload,
  };
  await sns.publish(snsPublishParams, eventMeta);

  const sqs = require('ebased/service/downstream/sqs');
  const sqsSendParams = {
    QueueUrl: process.env.CREATE_DEPOSIT_QUEUE,
    MessageBody: eventPayload,
  };
  await sqs.send(sqsSendParams, eventMeta);
}

module.exports = { emitExchangeCreated };