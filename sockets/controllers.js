import TicketControl from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) =>{

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('last-4', ticketControl.last4);
    socket.emit('queue', ticketControl.tickets.length );

    socket.on('next-ticket', (payload, callback) =>{
        //this.io.emit('send-msg', payload);
        const nextTicket = ticketControl.next()
        socket.broadcast.emit('queue', ticketControl.tickets.length );
        callback(nextTicket);
        //socket.broadcast.emit('next-ticket',payload);
    });

    socket.on('attend-ticket', ({escritorio}, callback) =>{
        
        if(!escritorio){
            callback( {
                ok: false,
                msg:'escritorio is mandatory'
            });
        }

        const ticket = ticketControl.attendTicket(escritorio);

        if(!ticket){
            callback( {
                ok: false,
                msg: 'Theres no tickets'
            });
        }

        callback( {
            ok:true,
            ticket
        });

        socket.broadcast.emit('last-4', ticketControl.last4);
        socket.broadcast.emit('queue', ticketControl.tickets.length );
        socket.emit('queue', ticketControl.tickets.length );
    });
}