const config = require('nbased/util/config');
const dynamo = require('nbased/service/storage/dynamo');

const CREATED_CLIENT_DB = config.get('CREATED_CLIENT_DB');


const updateClientDB = async (createClientDB) => {
    const { eventPayload } = createClientDB.get();
    var params = {
        TableName: CREATED_CLIENT_DB,
        Key: { dni: eventPayload.dni },
        UpdateExpression: "set #gift = :c",
        ExpressionAttributeNames: {
            '#gift': 'gift'
        },
        ExpressionAttributeValues: {
            ":c": eventPayload.gift
        }
    }


    try {
        await dynamo.updateItem(params);
        console.log("Registro Actualizado correctamente en BD");
    } catch (Exception) {
        console.log("Error Base de datos => ", Exception);
    }
}

module.exports = { updateClientDB };