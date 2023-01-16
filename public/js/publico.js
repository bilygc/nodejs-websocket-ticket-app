const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('last-4', last4 =>{
    const [ticket1, ticket2, ticket3, ticket4] = last4;

    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    if(ticket1){
        lblTicket1.innerText = 'Ticket '+ ticket1.number;
        lblEscritorio1.innerText = 'Service desk '+ticket1.desk;
    }

    if(ticket2){
        lblTicket2.innerText = 'Ticket '+ ticket2.number;
        lblEscritorio2.innerText = 'Service desk '+ticket2.desk;
    }

    if(ticket3){
        lblTicket3.innerText = 'Ticket '+ ticket3.number;
        lblEscritorio3.innerText = 'Service desk '+ticket3.desk;
    }

    if(ticket4){
        lblTicket4.innerText = 'Ticket '+ ticket4.number;
        lblEscritorio4.innerText = 'Service desk '+ticket4.desk;
    }
});