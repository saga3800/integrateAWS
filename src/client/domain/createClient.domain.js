const { FaultHandled } = require('nbased/util/error');
const { CreateClientValidation } = require('../schema/input/createClient');

const { CreateClientDBEvent } = require('../schema/event/createClientDB');
const { createClientDB } = require('../service/externalDbClient');

const { ClientCreatedEventSns } = require('../schema/event/clientCreateSns');
const { emitClientCreate } = require('../service/emitClientCreate');

const createClientDomain = async (commandPayload, commandMeta) => {
  new CreateClientValidation(commandPayload, commandMeta);
  const { dni, name, lastName, birthDay } = commandPayload;
  const age = getAge(birthDay);
  var message = "Client created success";
  var codeM = 200

  const client = {
    dni: dni,
    name: name,
    lastName: lastName,
    birthDay: birthDay,
    age: age
  };

  if (age <= 65) {
    try{
    await createClientDB(new CreateClientDBEvent(client, commandMeta));
    }catch(Exception){
      throw new FaultHandled(`Error guardando BD = > | ${Exception}` , { code: 'SEND_SNS_CREATE_CLIENT', layer: 'DOMAIN' });
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

}else{
  var message = "Client doesn not is less than 65 years old";
  var codeM = 400
}

  const response={
    statusCode: codeM,
    message: message
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

module.exports = {createClientDomain}