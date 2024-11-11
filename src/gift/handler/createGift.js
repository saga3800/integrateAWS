const { batchEventMapper } = require('nbased/handler');
const inputMode = require('nbased/handler/input/batchEventQueue');
const outputMode = require('nbased/handler/output/batchEventConfirmation');
const { FaultHandled } = require('nbased/util/error');

const {createGiftDomain} = require('../domain/createGift.domain');


const retryStrategy = (receiveCount) => 5 * receiveCount;

module.exports.handler = async (events, context) => {
  return batchEventMapper({ events, context }, inputMode, createGiftDomain, outputMode, retryStrategy);
}