console.log('loaded Camera.js')
/* 
Handles camera
*/

class Camera {
    constructor(x,y,z,rx,ry,rz){
        this.x = x
        this.y = y
        this.z = z
        this.rx = rx
        this.ry = ry
        this.rz = rz

        this.player = undefined
    }
    setOrientation(x,y,z,rx,ry,rz){
        if(this.player){
            this.x = this.player.x
            this.y = this.player.y
            this.z = this.player.z
            this.rx = this.player.rx
            this.ry = this.player.ry
            this.rz = this.player.rz
        }else{
            this.x = x
            this.y = y
            this.z = z
            this.rx = rx
            this.ry = ry
            this.rz = rz
        }

        // setTransformPlayers()
        // setTransform(null,null,null, null,null,null, null,null,null, null,null,null, this.x,this.y,this.z,this.rx,this.ry,this.rz,null)
    }
    setPlayer(player){
        this.player = player
    }
    getOrientation(){
        return createTransformMatrix(this.x,this.y,this.z,this.rx,this.ry,1)
    }
}