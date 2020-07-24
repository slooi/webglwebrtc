// Websocket setup (as it takes time for ws to setup and we want to use it. Dont do this in production i think)
const ws = new WebSocket(location.origin.replace(/^http/,'ws'))
ws.addEventListener('message',onServerMessage)
ws.strSend = function(data){
    ws.send(JSON.stringify(data))
}


// Global Variables
let pc // peer connection
let signallingChannel // We will send the ice candidates and sdp packets using this channel to the server to relay them to remote client 
let dataChannel // this the p2p data channel connecting the two clients

const pcConfig = {
    iceServers:[
        {urls: 'stun:stun.stunprotocol.org:3478'},
        {urls: 'stun:stun.l.google.com:19302'},
    ]
}
// start()
// FUNCTIONS
function start(isOfferer){
    console.log(`You are ${isOfferer ? 'an offerer' : 'a listener' }`)

    // Start initialising RTCPeerConnection
    pc = new RTCPeerConnection(pcConfig)
    pc.onicecandidate = gotIceCandidate // found an ice candidate. Ice candidates are sent in the a= field of SDP packets. Ice candidates are ip address and port where client can be connected to
    
    // Create dataChannel
    // Create on
    // Create sdp(offer/answer)

    if(isOfferer){
        // Data channel
        dataChannel = pc.createDataChannel('dataChannel')
        setupDataChannel()

        // Client is offerer. AFTER create datachanel
        createSesDescription(true)
    }else{
        // Client is receiver
        pc.addEventListener('datachannel',e=>{
            console.log('CLIENT HAS RECEIVE CALLBACK FROM DATACHANNEL')
            dataChannel = e.channel

            setupDataChannel()
        })
    }

    
}


async function onServerMessage(e){
    console.log('Received server message')

    const data = JSON.parse(e.data) // data = remoteSessionDescription
    console.log('data:',data)
    if(data.sdp){
        // sdp was sent from remote client to local client
        try{
            console.log('data',data)
            await pc.setRemoteDescription(data.sdp)// The parameter IS NOT data.sdp, it is data
            if(data.sdp.type === 'offer'){
                createSesDescription(false)
            }
        }catch(err){
            console.warn('ERROR:',err)
        }
    }else if(data.ice){
        // ice candidate was sent from remote client to local client
        try{
            pc.addIceCandidate(data.ice)
        }catch(err){
            console.warn('ERROR addIceCandidate:',err)
        }
    }
}

function gotIceCandidate(e){
    console.log('gotIceCandidate e:',e)
    const candidate = e.candidate
    if(candidate){
        // If candidate is NOT null, then ICE has not been resolved
        ws.strSend({ice:candidate})
    }else{
        // ICE is resolved
    }
}

async function createSesDescription(isOfferer){
    // Create Session Description
    try{
        const sesDescription = await (isOfferer ? pc.createOffer() : pc.createAnswer())    // Create offer (includes SDP offer). Can fail (eg: created multiple offers?)
        console.log(sesDescription)
        await pc.setLocalDescription(sesDescription)
        ws.strSend({sdp:pc.localDescription})


        console.log(pc.localDescription)
    }catch(err){
        console.warn('ERROR createOffer:',err)
    }
}

function setupDataChannel(e){
    dataChannel.onmessage = function(e){
        console.log('SUCCESS onmessage e:',e)
        const data = JSON.parse(e.data)
        console.log('JSON.parse:',data)
        dataChannel.data = data
    }
    console.log('setupDataChannel e',e)

    dataChannel.strSend = function(data){
        dataChannel.send(JSON.stringify(data))
    }

    
    // !@#!@#!@#!@#!@#!@#!@#!@#!@#  PUT SOMEWHERE ELSE and refactor IN FUTURE 
    game.players[1].attachInputs(dataChannel)
}




// TRY USING PUBLIC STUN SERVERS


/* 
GACHAS:

1) SEND INFORMATION - If you do not send any information through datachannel, the onicecandidate event listener will never fire.

2) ORDER - The order is important. Make sure to place your pc.createOrder function is called AFTER your pc.createDataChannel function.
This might be because the type of data that you are going to be sending needs to be established before the offer as the SDP packet contains
the codecs and a bunch of other information about the media you are sending.
*/

/* 
GENERAL INFORMATION:
 - Concepts surround WebRTC: NAT, SDP, ICE, STUN server, TURN server
 - pc.signalingState is a good way to inspecting the state of your sessionDescriptionOffer/sessionDescriptionAnswer
 - pc.localDescription and pc.remoteDescription is a good way of inspecting the state of sessionDescriptionOffer/sessionDescriptionAnswer
*/