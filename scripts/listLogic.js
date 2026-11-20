import { gettickets, getticketCounter } from '../script.js';

export function saveToStorage() {
    localStorage.setItem("tickets", JSON.stringify(gettickets()));
    localStorage.setItem("ticketCounter", getticketCounter());
}

export function filter() {
    const statusFilterEl = document.getElementById("statusFilter");
    const value_filter = statusFilterEl ? statusFilterEl.value : "all";
    const list = document.getElementById("ticketList");

    if (!list) return;

    list.innerHTML = "";

    let visibleCount = 0;
    const tickets = gettickets();

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

    const visibleCountEl = document.getElementById("visibleCount");
    const totalCountEl = document.getElementById("totalCount");

    if (visibleCountEl) visibleCountEl.textContent = visibleCount;
    if (totalCountEl) totalCountEl.textContent = tickets.length;
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