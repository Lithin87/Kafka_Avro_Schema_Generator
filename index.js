import  express from 'express';
import generate from './Avro-schema-generator.js' 
import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json());

// app.post('/', (req, res) => {   res.send(generate(req.body));   });

// app.get('/createkafka', (req, res) => {   res.send(generate(req.body));   });


// const port = parseInt(process.env.PORT) || 8080;
// app.listen(port);


console.dir(generate(), { depth : null});
