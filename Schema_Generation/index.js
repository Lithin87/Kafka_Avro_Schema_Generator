const jsonfile = require('jsonfile')
const avsc = require('avsc');
var jp = require('jsonpath');


const file = './Schema-Files/pizza-order.json'




jsonfile.readFile(file).then( jsonObject => 
    {
        let inferredType = avsc.Type.forValue(jsonObject); // Infer the type 
        var schema = inferredType.schema();


        // console.dir(schema, { depth: null });

        // console.log(Object.keys(schema.fields));
        var extracted = jp.query(schema, '$.fields[*].type')
        console.log("-------------------------")
        console.dir(extracted, { depth: null });

    }
    ).catch(e => console.error("Error"+e))

