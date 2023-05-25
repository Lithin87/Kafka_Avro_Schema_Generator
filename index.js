import  express from 'express';
import generate from './Avro-schema-generator.js' 

const app = express();

app.post('/', (req, res) => {
  
  const name = req.body;
  res.send(generate(name));
});


const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
