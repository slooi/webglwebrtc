// Require modules
const express = require('express')
const ws = require('ws')
const path = require('path')
const https = require('https')
const fs = require('fs')

// Config variables
const PORT = 8443



// Initialise app
const app = express()

// Middleware
app.use(express.static(path.resolve(__dirname,'public')))

// Routing
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})

// Create server
const server = https.createServer(
{
    cert: fs.readFileSync(path.resolve(__dirname,'cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname,'key.pem'))
}, app).listen(PORT,()=>{
    console.log('Listening on https://localhost:'+PORT)   
})


// Create websocket server
const wss = new ws.Server({server})

wss.broadcast = function(message,wsSender){
    wss.clients.forEach(ws=>{
        if(ws !== wsSender){
            // We dont want the sender to receive his own network/media information, he already knows it. The remote client needs it to know how to communicate
            // with the sender (eg: what codec to use, which ip address and port the packets should be sent to, etc...) 
            ws.send(message)
        }
    })
}

wss.on('connection',ws=>{
    ws.on('message',message=>{
        console.log('message e:',message)
        wss.broadcast(message,ws)
    })
})