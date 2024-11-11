const { FaultHandled } = require('nbased/util/error');
const { DeleteClientValidation } = require('../schema/input/deleteClient');

const { deleteClientDB } = require('../service/externalDbClient');

const deleteClientDomain = async (commandPayload, commandMeta) => {
  new DeleteClientValidation(commandPayload, commandMeta);
  const { dni } = commandPayload;

    try{
    await deleteClientDB(dni);
    console.log("Cliente eliminado correctamente");
    }catch(Exception){
      throw new FaultHandled(`Error actualizando BD = > | ${Exception}` , { code: 'SEND_SNS_CREATE_CLIENT', layer: 'DOMAIN' });
    }

    const response={
      statusCode: 200,
      message: 'Client delete success'
    };
    
      return {body: response};
}
module.exports = {deleteClientDomain}