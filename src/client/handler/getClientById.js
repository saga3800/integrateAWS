
const { commandMapper } = require('nbased/handler');
const inputMode = require('nbased/handler/input/commandApi');
const outputMode = require('nbased/handler/output/commandApi');

const { getClientByIdDomain } = require('../domain/getClientById.domain');


module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, getClientByIdDomain, outputMode);
};

