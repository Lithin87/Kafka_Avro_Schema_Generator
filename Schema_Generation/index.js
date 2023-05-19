import jsonfile from 'jsonfile';
import avsc from 'avsc';
import jp from 'jsonpath';
import regex_types from './custom_regex.js';
const file = "Schema-Files/pizza-order.json";


jsonfile.readFile(file).then( jsonObject => 
    {
        let inferredType = avsc.Type.forValue(jsonObject); // Infer the type 
        var schema = inferredType.schema();
        var schema_c = {...schema};

        console.dir(schema_c, { depth: null });

        // var extracted = jp.query(schema, '$.fields[*].type')
        // console.dir(extracted, { depth: null });
        console.log("-------------------------")
        
        console.log(regex_types);

        const  func_replace = e => { 
         
            if(['int','string','float'].includes(e.type))
            {
            e.type  = { 
            "type": "int",
            "arg.properties": {
                "range": {
                    "min": 1,
                    "max": 10
                }
            }
        }  
            }else{
                if(e.type.items.type === "record" )
                {
                    // console.log("found a nexted array")
                    let n = e.type.items.fields;
                    let b = JSON.parse(JSON.stringify(n))
                    b.forEach(func_replace);
                    e.type.items.fields = b;
                }
            }
        }
        
        
        
        var a = schema_c.fields;
        let b = JSON.parse(JSON.stringify(a))
        b.forEach(func_replace);



        schema_c.fields = b;



        console.dir(schema_c,  { depth: null });
        // console.dir(mod_schema,  { depth: null });

        // JSONObject songs= json.getJSONObject("songs");
        // Iterator x = songs.keys();



        // schema_c.fields[0].type = { 
        //     "type": "int",
        //     "arg.properties": {
        //         "range": {
        //             "min": 1,
        //             "max": 10
        //         }
        //     }
        // };


        // console.dir(schema_c,{ depth: null })


    }
    ).catch(e => console.error("Error"+e))

