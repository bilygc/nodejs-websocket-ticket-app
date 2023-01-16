// Workaround to import json files using ECMA module
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const data = require('../db/data.json');
// Workaround to import json files using ECMA module

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//workaround to use __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//class for a single ticket

class Ticket{
    constructor(number, desk){
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    
    constructor(){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJson(){
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }        
    }

    init(){
        if(this.today === data.today)                {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.saveToDB();
        }
    }

    next(){
        this.last += 1;
        const ticket = new Ticket(this.last, null)
        this.tickets.push(ticket);

        this.saveToDB();

        return 'Ticket No: ' + ticket.number;

    }

    attendTicket(desk){

        if(this.tickets.length === 0 ){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desk = desk;
        this.last4.unshift(ticket);

        if (this.last4.length > 4){
            this.last4.splice(-1,1);
        }
        this.saveToDB();

        return ticket;
    }


    saveToDB(){
        const filePath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(filePath, JSON.stringify(this.toJson));
    }
}

export default TicketControl;