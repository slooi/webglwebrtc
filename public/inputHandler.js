console.log('loaded InputHandler.js')

function createInputHandler(){
    // Variables
    const keyPressed = {
        KeyW: false,
        KeyS: false,
        KeyA: false,
        KeyD: false,
        KeyQ: false,
        KeyE: false,
    }

    const mouse = {
        movementX:0,
        movementY:0
    }
    
    // Event listeners
    // Keys
    window.addEventListener('keydown',e=>{
        keyPressHandler(e,true)
    })
    window.addEventListener('keyup',e=>{
        keyPressHandler(e,false)
    })
    // Mouse
    window.addEventListener('mousemove',e=>{
        mouse.movementX = e.movementX
        mouse.movementY = e.movementY
    })

    // FUNCTIONS
    function calibrateMouse(){
        mouse.movementX = 0
        mouse.movementY = 0 
    }
    function keyPressHandler(e,isDown){
        const code = e.code
    
        if (keyPressed[code] !== undefined){
            keyPressed[code] = isDown
        }
    }

    // Return object
    return {
        keyPressed,
        mouse,
        calibrateMouse
    }
}