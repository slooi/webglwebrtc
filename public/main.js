console.log('main.js loaded')
/* 
Handles the functioning of the entire page

*/
const inputs = createInputHandler()
const game = new Game()
let localPlayer
let mainCam

setup()

// FUNCTIONS
function setup(){

    // Get local player and setup game
    game.start(inputs)

    tick()
}

function tick(){
    // Get data from other player


    // Update players
    game.update()


    // End stuff
    inputs.calibrateMouse()
    requestAnimationFrame(tick)
}




canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.onclick = function(){
    canvas.requestPointerLock()
}