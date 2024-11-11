const { FaultHandled } = require('nbased/util/error');
const { UpdateClientValidation } = require('../schema/input/updateClient');

const { UpdateClientDBEvent } = require('../schema/event/updateClientDB');
const { updateClientDB, getClientByIdDB } = require('../service/externalDbClient');


const { ClientCreatedEventSns } = require('../schema/event/clientCreateSns');
const { emitClientCreate } = require('../service/emitClientCreate');

const updateClientDomain = async (commandPayload, commandMeta) => {
  new UpdateClientValidation(commandPayload, commandMeta);
  const { dni, name, lastName, birthDay, points } = commandPayload;
  const age = getAge(birthDay);

  var data = [];

  try {
    data = await getClientByIdDB(dni);
    console.log("La data de retorno es => ", data);
  } catch (Exception) {
    throw new FaultHandled(`Error consultando BD = > | ${Exception}`, { code: 'GET_DB_CLIENT', layer: 'DOMAIN' });
  }

  if(data){

  const client = {
    dni: dni,
    name: name,
    lastName: lastName,
    birthDay: birthDay,
    points: points
  };


    try{
    await updateClientDB(new UpdateClientDBEvent(client, commandMeta));
    }catch(Exception){
      throw new FaultHandled(`Error actualizando BD = > | ${Exception}` , { code: 'SEND_SNS_CREATE_CLIENT', layer: 'DOMAIN' });
    }
  

  const paramSNS = {
    dni: dni,
    age: age,
    birthDay:birthDay
  };

  try{
  await emitClientCreate(new ClientCreatedEventSns(paramSNS, commandMeta));
  console.log("SNS enviado correctamente");
  }catch(Exception){
    throw new FaultHandled(`Error enviando SNS = > | ${Exception}` , { code: 'SEND_SNS_CREATE_CLIENT', layer: 'DOMAIN' });
  }
}

  const response={
    statusCode: 200,
    message: 'Client update success'
  };
  
    return {body: response};
}

function getAge(birthDay) {

  const dateBirth = new Date(birthDay);
  const dateNow = new Date();
  const month = dateNow.getMonth() - dateBirth.getMonth();


  var age = dateNow.getFullYear() - dateBirth.getFullYear();
  if (month < 0 || (month === 0 && dateNow.getDate() < dateBirth.getDate())) {
      age--;
  }

  return age;

}

module.exports = {updateClientDomain}