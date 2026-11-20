function loadTickets() {
    try {
        const parsed = JSON.parse(localStorage.getItem("tickets"));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function loadTicketCounter(list) {
    const stored = Number(localStorage.getItem("ticketCounter")) || 1;
    const maxId = list
        .map(ticket => Number(ticket && ticket.id))
        .filter(id => Number.isSafeInteger(id) && id >= 0)
        .reduce((max, id) => Math.max(max, id), 0);
    return Math.max(stored, maxId + 1);
}

export let tickets = loadTickets();
export let ticketCounter = loadTicketCounter(tickets);
export let link = document.createElement('a');
export let filename;
export let qbajzmibpbisqvoqavbqb = Number(localStorage.getItem("qbajzmibpbisqvoqavbqb")) || 0;
const lisioImg = document.getElementById("Fox");
export { lisioImg };

//qbajzmibpbisqvoqavbqb
export function setQbajzmibpbisqvoqavbqb(arg){
    qbajzmibpbisqvoqavbqb=arg;
    localStorage.setItem("qbajzmibpbisqvoqavbqb",arg);
}

export function getQbajzmibpbisqvoqavbqb(){
    return qbajzmibpbisqvoqavbqb;
}

//tickets
export function settickets(arg) {
    tickets = arg;
    localStorage.setItem("tickets", JSON.stringify(arg));
}

export function gettickets(){
    return tickets;
}

//ticketCounter
export function setticketCounter(arg){
    ticketCounter=arg;
    localStorage.setItem("ticketCounter",arg);
}

export function getticketCounter(){
    return ticketCounter;
}

//link
export function setlink(arg){
    link=arg;
}

export function getlink(){
    return link;
}

//filename
export function setfilename(arg){
    filename=arg;
}

export function getfilename(){
    return filename;
}

async function loadSnowmanModule(){
    try{
        const module = await import('./scripts/snowman.js');
        
        module.initSnowman();
    }

    catch (error) {
        console.error("Failed to load snowman module:", error);
    }
}

async function loadFoxModule(){
    try{
        const module = await import('./scripts/lisLogic.js');
        
        module.initLisLogic();
    }

    catch (error) {
        console.error("Failed to load lisLogic module:", error);
    }
}

async function loadTicketLogic(){
    try{
        const module = await import('./scripts/ticketLogic.js');
        
        module.initTicketLogic();
    }

    catch (error) {
        console.error("Failed to load ticketLogic module:", error);
    }
}

async function loadExport(){
    try{
        const module = await import('./scripts/export.js');
        
        module.initExport();
    }

    catch (error) {
        console.error("Failed to load export module:", error);
    }
}

async function loadImport(){
    try{
        const module = await import('./scripts/import.js');
        
        module.initImport();
    }

    catch (error) {
        console.error("Failed to load import module:", error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadTicketLogic();
    loadSnowmanModule();
    loadFoxModule();
    loadExport();
    loadImport();

    const headings = [document.querySelector('h1'), document.querySelector('.tickets-section > h2')];

    const colors = ['#ffa81d','#59ce7e','#ffdb45','#398cff','#f247de'];

    function createLights(heading) 
    {

        if (!heading) return;
        let lights = heading.querySelector('.title-lights');

        if (!lights) 
        {
            lights = document.createElement('div');
            lights.className = 'title-lights';
            heading.appendChild(lights);
        }

        lights.innerHTML = '';

        const width = lights.clientWidth;
        const height = lights.clientHeight;
        const inset = 5;
        const left = inset;
        const right = width - inset;
        const top = inset;
        const bottom = height - inset;
        const horizontal = right - left;
        const vertical = bottom - top;
        const perimeter = 2 * (horizontal + vertical);
        const spacing = 55;
        const count = Math.floor(perimeter / spacing);
        const actualSpacing = perimeter / count;

        for (let i = 0; i < count; i++) 
        {
            const distance = i * actualSpacing;
            let x, y;

            if (distance < horizontal) 
            {
                x = left + distance;
                y = top;
            }

            else if (distance < horizontal + vertical) 
            {
                x = right;
                y = top + (distance - horizontal);
            }

            else if (distance < 2 * horizontal + vertical) 
            {
                x = right - (distance - horizontal - vertical);
                y = bottom;
            }

            else 
            {
                x = left;
                y = bottom - (distance - 2 * horizontal - vertical);
            }

            createBulb(x, y);
        }

            
        function createBulb(x, y) 
        {

        const bulb = document.createElement('span');
        bulb.className = 'title-bulb';
        bulb.style.left = x + 'px';
        bulb.style.top = (y + 2.5) + 'px';

        bulb.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        bulb.style.setProperty('--speed', (1.5 + Math.random() * 2) + 's');
        bulb.style.setProperty('--delay', (Math.random() * 3) + 's');

        lights.appendChild(bulb);
        }

        }

        headings.forEach(createLights);

        window.addEventListener('resize', function () 
        {
            headings.forEach(createLights);
        });

        if(qbajzmibpbisqvoqavbqb>=10) document.getElementById("backgroundMusic").src='./sounds/foxSounds/qbajzmibpbisqvoqavbqb.mp3';
    });

// - Jak to jest być skrybą? Dobrze?
// Moim zdaniem to nie ma tak, że dobrze albo że nie dobrze. 
// Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. 
// Ekhm... Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam. 
// I co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. 
// Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne, bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. 
// Ja miałem szczęście, by tak rzec, ponieważ je znalazłem. 
// I dziękuję życiu. 
// Dziękuję mu, życie to śpiew, życie to taniec, życie to miłość. 
// Wielu ludzi pyta mnie o to samo, ale jak ty to robisz?, skąd czerpiesz tę radość? 
// A ja odpowiadam, że to proste, to umiłowanie życia, to właśnie ono sprawia, że dzisiaj na przykład buduję maszyny, a jutro... kto wie, dlaczego by nie, oddam się pracy społecznej i będę ot, choćby sadzić... doć... marchew.