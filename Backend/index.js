const connectToMongo=require('./db');

const express = require('express')
var cors=require('cors')
// const path = require('path');
connectToMongo();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
 app.use('/api/auth',require('./routes/auth'))
 app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
// \Backend> nodemon .\index.js for starting server