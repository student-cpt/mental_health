require ('dotenv').config();
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');
mongoose.set('strictQuery', true);


const app = express();
app.use (express.json());
app.use (cors());
app.use (cookieParser());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://manan:root@cluster0.y87adak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 4000;

app.listen (port, () => {
    console.log ("Server is running on port", port); 
})