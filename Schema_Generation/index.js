import jsonfile from 'jsonfile';
import avsc from 'avsc';
import jp from 'jsonpath';
import regex_types from './custom_regex.js';
const file = "Schema-Files/pizza-order.json";


jsonfile.readFile(file).then( jsonObject => 
    {
        let inferredType = avsc.Type.forValue(jsonObject); // Infer the type 
        var original_schema = inferredType.schema();
        var custom_schema = {...original_schema};

        console.dir(original_schema, { depth: null });

        // var extracted = jp.query(schema, '$.fields[*].type')
        console.log("-------------------------")
        
        const  func_replace = e => { 
         
          switch (e.type) {
            case 'int':
              e.type  = regex_types.int_date_18000_19000;
              break;
            case 'string':
              e.type  = regex_types.string_regex_user_1_10;
              break;
            case 'float':
              e.type  = regex_types.int_range_10000_200000;
              break;
            default:
              if(e.type.items.type === "record" )
                {
                    let b = JSON.parse(JSON.stringify(e.type.items.fields))    //  nexted fields
                    b.forEach(func_replace);
                    e.type.items.fields = b;
                }
          }
        }
        
      let custom_regex_fields =  JSON.parse(JSON.stringify(custom_schema.fields))
      custom_regex_fields.forEach(func_replace);
      custom_schema.fields = custom_regex_fields;

      console.dir(custom_schema,  { depth: null });
    }
    ).catch(e => console.error("Error"+e))

