const { FaultHandled } = require('nbased/util/error');
const { getClientByIdDB } = require('../service/externalDbClient');
const { GetClientValidation } = require('../schema/input/getClient');


const getClientByIdDomain = async (commandPayload, commandMeta) => {
  console.log("Entro a get clientes by id");
  console.log("El payload es => ", commandPayload);
  new GetClientValidation(commandPayload, commandMeta);
  const { dni } = commandPayload;
  console.log("El valor dni es ", dni);


  var data = [];

  try {
    data = await getClientByIdDB(dni);
    console.log("La data de retorno es => ", data);
  } catch (Exception) {
    throw new FaultHandled(`Error consultando BD = > | ${Exception}`, { code: 'GET_DB_CLIENT', layer: 'DOMAIN' });
  }


  return { status: 200, body: data };
}


module.exports = { getClientByIdDomain }