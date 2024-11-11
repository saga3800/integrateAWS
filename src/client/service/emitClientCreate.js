const config = require('nbased/util/config');
const sns = require('nbased/service/downstream/sns');
const sqs = require('nbased/service/downstream/sqs');

const CLIENT_CREATED_TOPIC = config.get('CLIENT_CREATED_TOPIC');

const emitClientCreate = async (exchangeCreatedEvent) => {
  const { eventPayload, eventMeta } = exchangeCreatedEvent.get();
  const snsPublishParams = {
    TopicArn: CLIENT_CREATED_TOPIC,
    Message: eventPayload,
  };

  try{
    await sns.publish(snsPublishParams, eventMeta);
    console.log("mensaje SNS enviaso a SQS");
  }catch(Exception){
    console.log("mensaje SNS No enviaso a SQS");
  }

}

module.exports = { emitClientCreate };