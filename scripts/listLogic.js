import { getticketCounter,gettickets } from '../script.js';

let tickets= gettickets();
let ticketCounter = getticketCounter();

export function saveToStorage() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
    localStorage.setItem("ticketCounter", ticketCounter);
}

export function filter() {
    const value_filter = document.getElementById("statusFilter").value;
    const list = document.getElementById("ticketList");

    list.innerHTML = "";

    let visibleCount = 0;

    for (let i = 0; i < tickets.length; i++) {
        if (value_filter === "all" || tickets[i].status === value_filter) {
            const ticketRow = createTicketRow(tickets[i]);
            list.appendChild(ticketRow);
            visibleCount++;
        }
    }

    if (visibleCount === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.textContent = "No tickets to display.";
        emptyLi.style.textAlign = "center";
        emptyLi.style.fontStyle = "italic";
        list.appendChild(emptyLi);
    }

    document.getElementById("visibleCount").textContent = visibleCount;
    document.getElementById("totalCount").textContent = tickets.length;
}

export function createTicketRow(ticket) {
    const li = document.createElement("li");

    const p1 = document.createElement("p");
    p1.textContent = "Id: " + ticket.id;

    const p2 = document.createElement("p");
    p2.textContent = "Title: " + ticket.title;

    const p3 = document.createElement("p");
    p3.textContent = "Status: " + ticket.status;

    const p4 = document.createElement("p");
    p4.textContent = "Priority: " + ticket.priority;

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);

    return li;
}