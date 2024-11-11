const config = require('nbased/util/config');
const dynamo = require('nbased/service/storage/dynamo');

const CREATED_PURCHASE_DB = config.get('CREATED_PURCHASE_DB');


const createPurchaseDB = async (createPurchaseDB) => {

    var params = {
        TableName: CREATED_PURCHASE_DB,
        Item: {
            'id': createPurchaseDB.id,
            'dni': createPurchaseDB.dni,
            'products': createPurchaseDB.products
        }
    };

    try {
        await dynamo.putItem(params);
        console.log("Registro creado correctamente en BD");
    } catch (Exception) {
        console.log("Error Base de datos => ", Exception);
    }
}



module.exports = { createPurchaseDB };