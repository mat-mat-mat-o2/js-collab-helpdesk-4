import { getticketCounter,gettickets } from '../script.js';
import { saveToStorage,filter,createTicketRow } from './listLogic.js';

let tickets= gettickets();
let ticketCounter = getticketCounter();

export function initTicketLogic(){
    window.onload = function(){
        filter();
    }

    document.getElementById("ticketForm").addEventListener("submit", function(event) {
        event.preventDefault();
        addTicket();
        filter();
    });

    document.getElementById("statusFilter").addEventListener("change", filter);

    function dataSanitization(id, title, status, priority) {
        const messageEl = document.getElementById("message_add");
        
        if (tickets.length >= 1000) {
            if (messageEl) {
                messageEl.textContent = "The maximum limit of 1000 tickets has been reached.";
            }
            return false;
        }

        if (!id || typeof id !== "string" || id.trim().length === 0 || id.length > 100) {
            if (messageEl) {
                messageEl.textContent = "Invalid ticket ID.";
            }
            return false;
        }

        const trimmedTitle = title ? title.trim() : "";
        if (trimmedTitle.length < 3 || trimmedTitle.length > 80) {
            if (messageEl) {
                messageEl.textContent = "The title must be between 3 and 80 characters long.";
            } 
            return false;
        }

        if (status !== 'new' && status !== 'doing' && status !== 'done') {
            if (messageEl) {
                messageEl.textContent = "Invalid ticket status.";
            }
            return false;
        }

        if (priority !== 'low' && priority !== 'normal' && priority !== 'high') {
            if (messageEl) {
                messageEl.textContent = "Invalid ticket priority.";
            }
            return false;
        }

        if (messageEl) {
            messageEl.textContent = "";
        }
        return true;
    }

    function addTicket() {
        const form = document.getElementById('ticketForm');
        const formData = new FormData(form);

        const rawTitle = formData.get('title') || "";
        const cleanTitle = rawTitle.trim();
        const priority = formData.get('priority') || "normal";
        const status = 'new';
        const id = String(ticketCounter);

        if (dataSanitization(id, cleanTitle, status, priority)) {
            tickets.push({
                id: id,
                title: cleanTitle,
                status: status,
                priority: priority
            });

            ticketCounter += 1;
            saveToStorage();
            form.reset();
        }
    }

    function changeStatus() 
    {
        let ticketId = document.getElementById("ticketId").value;
        let newStatus = document.getElementById("newStatus").value;

        if (ticketId.trim() === "" || isNaN(ticketId)) 
        {
            document.getElementById("message_change").textContent = "Ticket ID must be a number.";
            return;
        }

        let found = false;

        for (let i = 0; i < tickets.length; i++) 
        {
            if (Number(ticketId) === Number(tickets[i].id)) 
            {
                tickets[i].status = newStatus;
                found = true;
                break;
            }
        }

        if (!found)
        {
            document.getElementById("message_change").textContent = "No ticket found with this ID.";
            return;
        }

        saveToStorage();
        document.getElementById("message_change").textContent = "Ticket status updated successfully.";
        filter();
    }

    function resetMemory() 
    {
        tickets = [];
        ticketCounter = 1;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.setItem("ticketCounter", ticketCounter);
        filter();
    }

    const resetId=document.getElementById('resetMemory');
    resetId.addEventListener("click", function(event) {
        resetMemory();
    });

    const changeStatusId=document.getElementById('changeStatus');
    changeStatusId.addEventListener("click", function(event) {
        changeStatus();
    });
}