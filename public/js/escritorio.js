const lblDesk = document.querySelector('h1');
const btnAttendTicket = document.querySelector('button');
const lblTicket = document.querySelector('h4 small');
const lblNoTickets = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error("variable escritorio is mandatory");
}

const escritorio = searchParams.get('escritorio');

lblDesk.innerText = `Service desk ${escritorio}`;
lblNoTickets.style.display = 'none';

const socket = io();

socket.on('connect', () => {    
    btnAttendTicket.disabled = false;
});

socket.on('last-ticket', lastTicket =>{
    //lblNewTicket.innerText = `Ticket No: ${lastTicket}`;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttendTicket.disabled = true;
});

socket.on('queue', queue =>{
    
    if(!queue){
        lblNoTickets.style.display = '';
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.innerText = queue;
        lblNoTickets.style.display = 'none';
        lblPendientes.style.display = '';
    }
});

btnAttendTicket.addEventListener( 'click',  () => {    
    
    socket.emit('attend-ticket', { escritorio }, ( {ok, ticket, msg} ) => {
        
        if(!ok){
            lblTicket.innerText = 'Nobody.'
            return lblNoTickets.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.number}`;

    });

});