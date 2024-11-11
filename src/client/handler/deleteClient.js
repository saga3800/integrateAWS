
const { commandMapper } = require('nbased/handler');
const inputMode = require('nbased/handler/input/commandApi');
const outputMode = require('nbased/handler/output/commandApi');

const { deleteClientDomain } = require('../domain/deleteClient.domain');

module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, deleteClientDomain, outputMode);
};
