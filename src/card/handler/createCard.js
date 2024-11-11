const { batchEventMapper } = require('nbased/handler');
const inputMode = require('nbased/handler/input/batchEventQueue');
const outputMode = require('nbased/handler/output/batchEventConfirmation');

const {createCardDomain} = require('../domain/createCard.domain');


const retryStrategy = (receiveCount) => 5 * receiveCount;

module.exports.handler = async (events, context) => {
  return batchEventMapper({ events, context }, inputMode, createCardDomain, outputMode, retryStrategy);
}