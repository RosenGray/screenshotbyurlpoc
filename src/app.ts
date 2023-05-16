import express from "express";
import pocController from './pocController';
import * as dotenv from 'dotenv'

dotenv.config()

const server = express();

server.use(express.json()); // creates request.body object if exists
server.use("/api", pocController);


server.listen(3001, () => console.log(`Listening on http://localhost:${3001}`));

