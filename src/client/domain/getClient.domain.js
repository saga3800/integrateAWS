const { FaultHandled } = require('nbased/util/error');
const { getClientDB } = require('../service/externalDbClient');


const getClientDomain = async (eventPayload, eventMeta, rawEvent) => {

  console.log("Entro a get clientes");

  var data = [];

  try {
    data = await getClientDB();
    console.log("La data de retorno es => ", data);
  } catch (Exception) {
    throw new FaultHandled(`Error consultando BD = > | ${Exception}`, { code: 'GET_DB_CLIENT', layer: 'DOMAIN' });
  }


  return { status: 200, body: data };
}

module.exports = { getClientDomain }