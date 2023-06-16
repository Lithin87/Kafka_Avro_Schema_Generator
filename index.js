import  express from 'express';
import generate from './Avro-schema-generator.js' 
import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json());
// app.post('/', (req, res) => {   res.send(generate(req.body));   });
// const port = parseInt(process.env.PORT) || 8080;
// app.listen(port , ()=> console.log("Listening on the port : "+port));


let str = {
  "store_id": 7,
  "order_lines": [
    {
      "product_id": 69,
      "category": "salad",
      "quantity": 3,
      "unit_price": 17.07,
      "net_price": 51.21
    }
  ]
};


console.dir(generate(str), {  depth :null });




