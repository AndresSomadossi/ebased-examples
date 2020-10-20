const config = require('ebased/util/config');
const sns = require('ebased/service/downstream/sns');
const sqs = require('ebased/service/downstream/sqs');

const EXCHANGE_CREATED_TOPIC = config.get('EXCHANGE_CREATED_TOPIC');
const CREATE_DEPOSIT_QUEUE = config.get('CREATE_DEPOSIT_QUEUE');

const emitExchangeCreated = async (exchangeCreatedEvent) => {
  const { eventPayload, eventMeta } = exchangeCreatedEvent.get();
  const snsPublishParams = {
    TopicArn: EXCHANGE_CREATED_TOPIC,
    Message: eventPayload,
  };
  await sns.publish(snsPublishParams, eventMeta);

  const sqsSendParams = {
    QueueUrl: CREATE_DEPOSIT_QUEUE,
    MessageBody: eventPayload,
  };
  await sqs.send(sqsSendParams, eventMeta);
}

module.exports = { emitExchangeCreated };