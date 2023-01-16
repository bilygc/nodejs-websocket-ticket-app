import * as dotenv from 'dotenv';
dotenv.config();
import nodeServer from './models/server.js'


const server = new nodeServer();

server.start();