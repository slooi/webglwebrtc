console.log('loaded Player.js')
class Player {
    constructor(x,y,z,rx,ry,rz, inputs,isLocalPlayer){
        this.x = x
        this.y = y
        this.z = z
        this.rx = rx
        this.ry = ry
        this.rz = rz
        this.speed = 5

        this.inputs = inputs
        this.isLocalPlayer = isLocalPlayer || false
    }

    update(){
        if(this.isLocalPlayer){
            // Exists

            const radX = this.rx/180*Math.PI
            const radY = this.ry/180*Math.PI
            const radZ = this.rz/180*Math.PI

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

            this.rx += this.inputs.mouse.movementY
            this.ry += this.inputs.mouse.movementX
        }else{
            if(this.inputs !== undefined && this.inputs.data !== undefined){
                const [x,y,z,rx,ry] = this.inputs.data
                
                this.x = x
                this.y = y
                this.z = z
                this.rx = rx
                this.ry = ry
            }
            // throw new Error('ERROR')
            // Does not exist. Use p2p data
            // console.log('this.inputs p2p:',this.inputs)
            // // throw new Error('ERROR',e)
            // try{
            //     if(this.inputs !== undefined && this.inputs.data !== undefined){
            //         console.log(this.inputs.data)
            //         console.warn('pie')
            //     }
            // }catch (e){
            //     throw new Error('ERROR',e)
            // }
        }
    }

    attachInputs(inputs){
        this.inputs = inputs
    }

    getOrientation(){
        return createTransformMatrix(this.x,this.y,this.z,this.rx,this.ry,0)
    }

    info(){
        return [this.x,this.y,this.z,this.rx,this.ry]
    }

}