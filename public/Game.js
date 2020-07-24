console.log('loaded Game.js')
/* 
This class will handle players, camera

*/

class Game {
    constructor(){
        this.players = []
        this.camera
    }

    start(inputs){
        // Setup all game

        // connect peer connection

        // Setup player
        this.players.push(new Player(0,0,0, 0,0,0, inputs, true))
        this.players.push(new Player(0,0,0, 0,0,0, dataChannel, false))

        // Setup camera and attach localPlayer
        this.camera = new Camera()
        this.camera.setPlayer(this.players[0])
    }

    update(){
        // Player
        this.players.forEach(player=>{
            player.update()
        })

        // Update camera
        this.camera.setOrientation()
        

        // Set transforms
        // setTransform(0,0,0,0,0,0,0,0,0,0,0,0,this.camera.x,this.camera.y,this.camera.z,this.camera.rx,this.camera.ry,this.camera.rz,)
        setTransformPlayers(this.players[1].getOrientation(),this.camera.getOrientation())
        console.log('this.players[1].getOrientation()',this.players[1].getOrientation())


        // datachannel
        if(dataChannel !== undefined){
            dataChannel.strSend(this.players[0].info())
            // dataChannel = undefined
        }


        //  
        clear()
        render()
    }
}
