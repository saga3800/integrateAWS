const config = require('nbased/util/config');
const dynamo = require('nbased/service/storage/dynamo');

const CREATED_CLIENT_DB = config.get('CREATED_CLIENT_DB');


const createClientDB = async (createClientDB) => {
    const { eventPayload } = createClientDB.get();
    var params = {
        TableName: CREATED_CLIENT_DB,
        Item: {
            'dni': eventPayload.dni,
            'name': eventPayload.name,
            'lastName': eventPayload.lastName,
            'birthDay': eventPayload.birthDay,
            'status': 'Activo',
            'points': 0
        }
    };

    try {
        await dynamo.putItem(params);
        console.log("Registro creado correctamente en BD");
    } catch (Exception) {
        console.log("Error Base de datos => ", Exception);
    }
}


async function getClientDB() {
    console.log("entro afuncion getClientDB");

    try {
        var params = {
            TableName: CREATED_CLIENT_DB
        };

        var data = await dynamo.scanTable(params);

        console.log("La respuesta dynamo item es => ", data.Items)
    } catch (Exception) {
        console.log("Fallo consulta a BD => ", Exception);
    }

    return data.Items;

}



async function getClientByIdDB(dniValue) {
    console.log("entro a funcion getClientByIdDB");
 
    try {
        var params = {
            TableName: CREATED_CLIENT_DB,
            Key: {
                'dni': dniValue
            }
        };


        var data = await dynamo.getItem(params);

        console.log("La respuesta dynamo item es => ", data.Item )
    } catch (Exception) {
        console.log("Fallo consulta a BD => ", Exception);
    }

    return data.Item;

}

const updateClientDB = async (createClientDB) => {
    const { eventPayload } = createClientDB.get();

    const params = {
        TableName: CREATED_CLIENT_DB,
        Key: { dni: eventPayload.dni},
        UpdateExpression: "set #name = :c, #lastName = :a, #birthDay = :b, #points = :d",
        ExpressionAttributeNames: {
          '#name': 'name',
          '#lastName': 'lastName',
          '#birthDay': 'birthDay',
          '#points': 'points'
        },
        ExpressionAttributeValues: {
          ":c": eventPayload.name,
          ":a": eventPayload.lastName,
          ":b": eventPayload.birthDay ,
          ":d": eventPayload.points   
        }
      };
  

    try {
        await dynamo.updateItem(params);
        console.log("Registro actualizado correctamente en BD");
    } catch (Exception) {
        console.log("Error Base de datos => ", Exception);
    }
}


const deleteClientDB = async (dniValue) => {
   

    const params = {
        TableName: CREATED_CLIENT_DB,
        Key: { dni: dniValue},
        UpdateExpression: "set #status = :c",
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: {
          ":c": 'Inactivo'
        }
      };
  

    try {
        await dynamo.updateItem(params);
        console.log("Registro eliminado correctamente en BD");
    } catch (Exception) {
        console.log("Error Base de datos => ", Exception);
    }
}
module.exports = { createClientDB, getClientDB, getClientByIdDB, updateClientDB, deleteClientDB };