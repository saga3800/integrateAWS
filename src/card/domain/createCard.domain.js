const { FaultHandled } = require('nbased/util/error');
const { CreateCardValidation } = require('../schema/input/createCardValidation');

const { UpdateClientDBEvent } = require('../schema/event/updateCardDB');
const { updateClientDB } = require('../service/externalDbClient')


const createCardDomain = async (eventPayload, eventMeta, rawEvent) => {

  try {
    new CreateCardValidation(eventPayload, eventMeta);
    const { dni, age } = eventPayload;
    console.log("validacion createCard.js => age ", eventPayload);
    const cardAttributes = getCardAttributes(age, dni);
    console.log("cardAttributes es => ", cardAttributes);

    
      try {
        await updateClientDB(new UpdateClientDBEvent(cardAttributes, eventMeta));
      } catch (Exception) {
        throw new FaultHandled(`Error actualizando BD = > | ${Exception}`, { code: 'UPDATE_DB_CLIENT', layer: 'DOMAIN' });
      }
 

  } catch (Exception) {
    throw new FaultHandled(` = > | ${Exception}`, { code: 'READ_SNS_CLIENT_EVENT', layer: 'DOMAIN' });
  }


  return { body: eventPayload };
};



function getCardAttributes(age, dni) {

  var creditCard = "Classic"

  if (age >= 45) {
    creditCard = "Gold";
  };

  let cardNumber = Math.floor(Math.random() * 10000000000);
  cardNumber = cardNumber.toString();
  const dateNow = new Date();
  const year = dateNow.getFullYear() + 5;
  const day = String(dateNow.getDate()).padStart(2, '0');
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const dueDateCard = year + "/" + month + "/" + day;
  let securityCode = Math.floor(Math.random() * 1000);
  securityCode = securityCode.toString();


  const card = {
    dni,
    creditCard,
    cardNumber,
    dueDateCard,
    securityCode
  }
  return card;

}

module.exports ={createCardDomain};