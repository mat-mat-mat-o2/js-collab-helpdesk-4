import { gettickets,getlink,getfilename,setfilename,setlink } from '../script.js';

let tickets = gettickets();
let link=getlink();
let filename=getfilename();

export function initExport(){
    document.getElementById("exJSON").addEventListener("click", () => {
        event.preventDefault();
        exportJSON();
    });

    document.getElementById("exCSV").addEventListener("click", () => {
        event.preventDefault();
        exportCSV();
    });

    document.getElementById("exXML").addEventListener("click", () => {
        event.preventDefault();
        exportXML();
    });

    function exportJSON()
    {
        setfilename('export.json');

        const text = JSON.stringify(tickets);

        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(text);
        link.download = filename;
        link.click();
    }

    function exportCSV()
    {
        setfilename('export.csv');

        let textCSV='';

        tickets.forEach(i => {
            textCSV+=`${i.id},${i.title},${i.status},${i.priority}\n`
        });
        
        link.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(textCSV);
        link.download = filename;
        link.click();
    }

    function exportXML()
    {
        setfilename('export.xml');

        let textXML='<?xml version="1.0" encoding="UTF-8"?>';
        textXML+='<tickets>';

        tickets.forEach(i => {
            textXML+=`<ticket id="${i.id}"><title>${i.title}</title><status>${i.status}</status><priority>${i.priority}</priority></ticket>`
        });
    
        textXML+='</tickets>';
        link.href = 'data:application/xml;charset=utf-8,' + encodeURIComponent(textXML);
        link.download = filename;
        link.click();
    }
}