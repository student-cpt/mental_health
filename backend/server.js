import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/route.js';
import Connection from './database/db.js';

mongoose.set('strictQuery', true);


const app = express();
app.use (express.json());
app.use (cors());
app.use (cookieParser());

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());



import { MongoClient } from 'mongodb';
import { ServerApiVersion } from 'mongodb';


// const uri = "mongodb+srv://manan:root@cluster0.y87adak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
Connection();
app.use('/', userRoutes);

const port = process.env.PORT || 4000;

app.listen (port, () => {
    console.log ("Server is running on port", port); 
})