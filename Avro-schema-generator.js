import jsonfile from 'jsonfile';
import avsc from 'avsc';
import regex_types from './custom_regex.js';

export default function generate(json_payload) {

  if (Object.keys(json_payload).length === 0) {
    json_payload = jsonfile.readFileSync("Schema-Files/pizza-order.json")
  }

  let custom_schema = avsc.Type.forValue(json_payload).schema(); 
  
 console.dir(custom_schema, { depth : null})

  const func_replace = e => {

    switch (e.type) {
      case 'int':
        e.type = regex_types.int_range_1_100;
        break;
      case 'string':
        e.type = regex_types.string_user_1_10;
        break;
      case 'float':
        if (["date", "ts", "time"].includes(e.name))
          e.type = regex_types.date_time_millis;
        else
          e.type = regex_types.float_1_10;
        break;
      case 'double':
        e.type = regex_types.double_100000000;
        break;
      default:
        if (e.type.items.type === "record") {
          let b = JSON.parse(JSON.stringify(e.type.items.fields))    //  nexted fields
          b.forEach(func_replace);
          e.type.items.fields = b;
          e.type.arg.properties =  regex_types.array_min_max;
        }
    }
  }

  let custom_regex_fields = JSON.parse(JSON.stringify(custom_schema.fields))
  custom_regex_fields.forEach(func_replace);
  custom_schema.fields = custom_regex_fields;

  return custom_schema;
}
