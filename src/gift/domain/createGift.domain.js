const { FaultHandled } = require('nbased/util/error');
const { CreateGiftValidation } = require('../schema/input/createGiftValidation');

const { UpdateGiftDBEvent } = require('../schema/event/updateGiftDB');
const { updateClientDB } = require('../service/externalDbClient')


const createGiftDomain = async (eventPayload, eventMeta, rawEvent) => {

  try {
    new CreateGiftValidation(eventPayload, eventMeta);
    const { dni, birthDay } = eventPayload;
    console.log("validacion createCard.js => age ", eventPayload);
    const giftAttributes = getGiftAttributes(birthDay, dni);
    console.log("giftAttributes es => ", giftAttributes);


    try {
      await updateClientDB(new UpdateGiftDBEvent(giftAttributes, eventMeta));
    } catch (Exception) {
      throw new FaultHandled(`Error actualizando BD = > | ${Exception}`, { code: 'UPDATE_DB_CLIENT', layer: 'DOMAIN' });
    }


  } catch (Exception) {
    throw new FaultHandled(` = > | ${Exception}`, { code: 'READ_SNS_CLIENT_EVENT', layer: 'DOMAIN' });
  }


  return { body: eventPayload };
};



function getGiftAttributes(birthDay, dni) {

  const dateNow = new Date(birthDay);

  const month = String(dateNow.getMonth() + 1).padStart(2, '0');

  const day = String(dateNow.getDate()).padStart(2, '0');

  let monthNumber = Number(month);

  let dayNumber = Number(day);

  var gift = "";

  if (monthNumber < 3 || monthNumber == 12 && dayNumber >= 21) {
    gift = "remera";
    console.log("verano");
  }

  if (monthNumber == 3 && dayNumber >= 20 || monthNumber == 4 || monthNumber == 5 || monthNumber == 6 && dayNumber <= 21) {
    gift = "buzo";
    console.log("otoño");
  }

  if (monthNumber == 6 && dayNumber > 21 || monthNumber == 7 || monthNumber == 8 || monthNumber == 9 && dayNumber <= 23) {
    gift = "sweater";
    console.log("invierno");
  }

  if (monthNumber == 9 && dayNumber >= 24 || monthNumber == 10 || monthNumber == 11 || monthNumber == 12 && dayNumber < 21) {
    gift = "camisa";
    console.log("primavera");
  }

  const card = {
    dni,
    gift
  }
  return card;

}

module.exports = {createGiftDomain};