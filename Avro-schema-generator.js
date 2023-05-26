import jsonfile from 'jsonfile';
import avsc from 'avsc';
import jp from 'jsonpath';
import regex_types from './custom_regex.js';

export default function generate(a) {

  const filecontent = isEmpty(a) ? jsonfile.readFileSync("Schema-Files/pizza-order.json") : a;

  let original_schema = avsc.Type.forValue(filecontent).schema(); 
  var custom_schema = { ...original_schema };

  // var extracted = jp.query(schema, '$.fields[*].type')
  console.log("-------------------------")

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
        }
    }
  }

  let custom_regex_fields = JSON.parse(JSON.stringify(custom_schema.fields))
  custom_regex_fields.forEach(func_replace);
  custom_schema.fields = custom_regex_fields;

  return custom_schema;
}
