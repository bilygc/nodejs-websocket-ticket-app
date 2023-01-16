import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { socketController } from '../sockets/controllers.js';

class nodeServer{

    constructor(){
        this.port = process.env.PORT;

        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);


        //routes
        this.path ={
            
        }

        //middlewares
        this.middlewares();

        //routes
        this.routes();

        //sockets
        this.sockets()
    }

    routes(){
        //this.app.use(this.path.auth, authRouter);
        
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //DIRECTORIO PUBLICO
        this.app.use( express.static('public'));

    }

    start(){
        this.server.listen(this.port, () =>{
            console.log(`Server listening on port: ${this.port}`);
        });
    }

    
}

export default nodeServer;