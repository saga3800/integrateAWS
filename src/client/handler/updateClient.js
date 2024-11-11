
const { commandMapper } = require('nbased/handler');
const inputMode = require('nbased/handler/input/commandApi');
const outputMode = require('nbased/handler/output/commandApi');

const { updateClientDomain } = require('../domain/updateClient.domain');

module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, updateClientDomain, outputMode);
};
