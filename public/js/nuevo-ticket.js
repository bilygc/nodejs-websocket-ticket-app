
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('#btnNewTicket');

const socket = io();

socket.on('connect', () => {    
    btnNewTicket.disabled = false;
});

socket.on('last-ticket', lastTicket =>{
    lblNewTicket.innerText = `Ticket No: ${lastTicket}`;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnNewTicket.disabled = true;
});

btnNewTicket.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});