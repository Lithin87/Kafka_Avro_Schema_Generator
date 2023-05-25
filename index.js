import  express from 'express';
import generate from './Avro-schema-generator.js' 

const app = express();

app.post('/', (req, res) => {
  
  const name = req.body;
  const ret  = generate(name);
  console.log("--33"+ret)
  res.send(ret);
});


const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
