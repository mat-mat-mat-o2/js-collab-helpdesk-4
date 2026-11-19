import { getticketCounter,gettickets } from '../script.js';
import { saveToStorage,filter,createTicketRow } from './listLogic.js';

let tickets = gettickets();
let ticketCounter = getticketCounter();

export function initImport(){
    document.getElementById("fileInput").addEventListener("change", listImport);

    async function listImport() {
        try {
            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];

            if (!file) {
                throw new Error("No file selected");
            }
            if (!file.name.toLowerCase().endsWith(".json")) {
                throw new Error("Invalid file extension. Only JSON files are allowed.");
            }

            const data = JSON.parse(await file.text());

            if (data === null || typeof data !== "object" || !Array.isArray(data)) {
                throw new Error("JSON must contain an array");
            }
            if (data.length >= 1000) {
                throw new Error("JSON can't contain more than 1000 tickets");
            }

            data.forEach(function(ticket) {
                if (ticket === null || typeof ticket !== "object" || Array.isArray(ticket)) {
                    throw new Error("Ticket must be an object");
                }
                if (typeof ticket.id !== "string" ||
                    typeof ticket.title !== "string" ||
                    typeof ticket.status !== "string" ||
                    typeof ticket.priority !== "string"
                ) {
                    throw new Error("Invalid data structure");
                }
                if (!ticket.id || ticket.id.trim().length === 0 || ticket.id.length > 100) {
                    throw new Error("Invalid ticket Id");
                }
                if (ticket.title.trim().length < 3 || ticket.title.trim().length > 80) {
                    throw new Error("The title must be between 3 and 80 characters long.");
                }
                if (ticket.status !== 'new' && ticket.status !== 'doing' && ticket.status !== 'done') {
                    throw new Error("Invalid ticket Status");
                }
                if (ticket.priority !== 'low' && ticket.priority !== 'normal' && ticket.priority !== 'high') {
                    throw new Error("Invalid ticket Priority");
                }
            })
            const ids = data.map(ticket => ticket.id);
            if (new Set(ids).size !== ids.length) {
                throw new Error("Ticket IDs must be unique");
            }
            
            tickets = data.map(ticket => ({
                id: ticket.id,
                title: ticket.title.trim(),
                status: ticket.status,
                priority: ticket.priority
            }));

            const numericIds = tickets
                .map(ticket => Number(ticket.id))
                .filter(id => Number.isSafeInteger(id) && id >= 0);

            ticketCounter = Math.max(0, ...numericIds) + 1;

            saveToStorage();
            document.getElementById('ticketForm').reset();
            filter();
            document.getElementById("message_import").textContent = "Import succesful";
        } catch (error) {
            document.getElementById("message_import").textContent = error.message;
        }
    }
}