const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', function connection(ws){
    ws.id = wss.getUniqueID();
    ws.on('message', function incoming(data){
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                console.log(`Client ${client.id} and ${ws.id} has changed the timetable`);
                client.send(data);
            }
        })
    })
})

server.listen(port, function(){
    console.log(`Server is listening on ${port}`);
})
