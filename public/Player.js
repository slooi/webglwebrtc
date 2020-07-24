console.log('loaded Player.js')
class Player {
    constructor(x,y,z,rx,ry,rz, inputs,isLocalPlayer){
        this.x = x
        this.y = y
        this.z = z
        this.rX = rx
        this.rY = ry
        this.rZ = rz
        this.speed = 5

        this.inputs = inputs
        this.isLocalPlayer = isLocalPlayer || false
    }

    update(){
        if(this.isLocalPlayer){
            // Exists

            const radX = this.rX/180*Math.PI
            const radY = this.rY/180*Math.PI
            const radZ = this.rZ/180*Math.PI

            if(this.inputs.keyPressed.KeyW){
                // Controlled by y Axis
                this.z += this.speed * Math.cos(radY)
                this.x += this.speed * Math.sin(radY)
            }
            if(this.inputs.keyPressed.KeyS){
                // Controlled by y Axis
                this.z -= this.speed * Math.cos(radY)
                this.x -= this.speed * Math.sin(radY)
            }
            if(this.inputs.keyPressed.KeyA){
                // Controlled by y Axis
                this.z += this.speed * Math.sin(radY)
                this.x -= this.speed * Math.cos(radY)
            }
            if(this.inputs.keyPressed.KeyD){
                // Controlled by y Axis
                this.z -= this.speed * Math.sin(radY)
                this.x += this.speed * Math.cos(radY)
            }
            if(this.inputs.keyPressed.KeyQ){
                this.y -= this.speed
            }
            if(this.inputs.keyPressed.KeyE){
                this.y += this.speed                
            }

            this.rX += this.inputs.mouse.movementY
            this.rY += this.inputs.mouse.movementX
        }else{
            // Does not exist. Use p2p data
            console.log(this.inputs)
            try{
                if(this.inputs !== undefined && this.inputs.data !== undefined){
                    console.log(this.inputs.data)
                }
            }catch{

            }
        }
    }

    attachInputs(inputs){
        this.inputs = inputs
    }

    getOrientation(){
        return createTransformMatrix(this.x,this.y,this.z,this.rX,this.rY,this.rZ,0)
    }

}