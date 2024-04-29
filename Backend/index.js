const express = require("express");
const connectToMongo = require("./db");
var cors = require('cors')


const app = express();

//Middleware for handling CORS POLICY
//Option 1: Allow All origins with Default of cors(*)
app.use(cors())
//Option 2: Allow Custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], //Methods allowed from the custom origin
//     allowedHeaders: ['Content-Type', 'Authorization'] //Request headers you want to allow, add more if needed like
// }));


//Connect to mongodb databse from db.js file
connectToMongo();

const PORT = 3000;

//Middleware for parsing body data 
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

//Available routes
app.use('/api/books', require('./routes/books'));

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`))
