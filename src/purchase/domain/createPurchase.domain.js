const { FaultHandled } = require('nbased/util/error');
const { CreatePurchaseValidation } = require('../schema/input/createPurchase');
const { createPurchaseDB } = require('../service/externalDbClient');
const { v4: uuidv4 } = require('uuid');
const { getClientByIdDB } = require('../../client/service/externalDbClient');
const { getProductPrice } = require('../helper/getProducts');
const { updateClientDB } = require('../../client/service/externalDbClient');
const { UpdateClientDBEvent } = require('../../client/schema/event/updateClientDB')

const createPurchaseDomain = async (commandPayload, commandMeta) => {
  const info = new CreatePurchaseValidation(commandPayload, commandMeta);
  const infoPurchase = info.get();
  const { dni_client } = infoPurchase;


  var message = 'Product created success';
  var status = 200;

  const id = uuidv4();

  var data = [];

  try {
    data = await getClientByIdDB(dni_client);
  } catch (Exception) {
    throw new FaultHandled(`Error consultando BD = > | ${Exception}`, { code: 'GET_DB_CLIENT', layer: 'DOMAIN' });
  }

  if (!data) {
    status = 400;
    message = 'DNI does not exist in Database';
  } else {

    if (data.status == "Activo") {

      const productsInfo = await getProductPrice(data, infoPurchase);
      console.log("El retorno de productsInfo es => ", productsInfo);

      const purchase = {
        id,
        dni: dni_client,
        products: productsInfo.products
      };

      try {
        await createPurchaseDB(purchase);
      } catch (Exception) {
        throw new FaultHandled(`Error guardando BD = > | ${Exception}`, { code: 'PRODUCTS_CREATE_DB', layer: 'DOMAIN' });
      }

      const client = {
        dni: dni_client,
        name: productsInfo.client.name,
        lastName: productsInfo.client.lastName,
        birthDay: productsInfo.client.birthDay,
        points: productsInfo.client.points
      };


      try {
        await updateClientDB(new UpdateClientDBEvent(client, commandMeta));
      } catch (Exception) {
        throw new FaultHandled(`Error actualizando BD = > | ${Exception}`, { code: 'SEND_SNS_CREATE_CLIENT', layer: 'DOMAIN' });
      }


    } else {
      status = 400;
      message = 'Client  does not Active in System';
    }
  }



  const response = {
    statusCode: status,
    message: message
  };

  return { body: response };
}

module.exports = { createPurchaseDomain }