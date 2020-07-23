console.log('loaded webgl.js')

// Elements
const mainContent = document.getElementById('main-content')
const placeholder = document.getElementById('canvas-placeholder')

// Source
const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText


// canvas
const canvas = document.createElement('canvas')
// const canvas = document.getElementById('canvas')
canvas.width = 300
canvas.height = 300
mainContent.replaceChild(canvas,placeholder)

// gl
let gl = canvas.getContext('webgl')
if(!gl){
    gl = canvas.getContext('experimental-webgl')
}
if(!gl){
    alert('ERROR: all version of webgl not supported. Please use an updated browser')
}

// gl init
gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(0.2,0.2,0.23,1)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

gl.enable(gl.CULL_FACE)
gl.enable(gl.DEPTH_TEST)

// program
const program = buildProgram()
gl.useProgram(program)

// location
// attributes
const attribLoc = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
    const attribName = gl.getActiveAttrib(program,i).name
    attribLoc[attribName] = gl.getAttribLocation(program,attribName)
}

// uniforms
const uniformLoc = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
    const uniformName = gl.getActiveUniform(program,i).name
    uniformLoc[uniformName] = gl.getUniformLocation(program,uniformName)
}

// data

// BUFFER   !@#!@
// Position
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(position),gl.STATIC_DRAW)

gl.vertexAttribPointer(
    attribLoc.a_Position,
    3,
    gl.FLOAT,
    0,
    0,
    0
)
gl.enableVertexAttribArray(attribLoc.a_Position)

// Color
const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(color),gl.STATIC_DRAW)

gl.vertexAttribPointer(
    attribLoc.a_Color,
    4,
    gl.UNSIGNED_BYTE,
    1,
    0,
    0
)
gl.enableVertexAttribArray(attribLoc.a_Color)



// uniform
setTransform()

// render
render()


// FUNCTIONS
function clear(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function setTransform(tx,ty,tz,rx,ry,rz,sx,sy,sz,ox,oy,oz){
    /*  Order:
     - scale
     - origin
     - rotate
     - translate
    */
    
    let transform = m4.projection(canvas.width,canvas.height,canvas.width)
    transform = m4.perspective(70,1,0.0001,99999)
    transform = m4.translate(transform,tx||0,ty||0,tz||0)   // translate
    transform = m4.rotateZ(transform,rz||0)
    transform = m4.rotateY(transform,ry||0)
    transform = m4.rotateX(transform,rx||0)    
    transform = m4.translate(transform,ox||0,oy||0,oz||0) // Origin
    transform = m4.scale(transform,sx||1,sy||1,sz||1)
    
    gl.uniformMatrix4fv(uniformLoc.u_Transform,false,transform)
}

function render(){
    gl.drawArrays(gl.TRIANGLES,0,position.length/3)
    gl.drawArrays(gl.POINTS,0,position.length/3)
}

function buildShader(type,source){
    const shader = gl.createShader(type)
    gl.shaderSource(shader,source)
    gl.compileShader(shader)
    
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        throw new Error('ERROR: compiling shader. Info: '+gl.getShaderInfoLog(shader))
    }
    return shader
}

function buildProgram(){
    // build program
    const program = gl.createProgram()
    gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
    gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
    gl.linkProgram(program)
    gl.validateProgram(program)
    
    // test
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
        throw new Error('ERROR: linking program. Info: '+gl.getProgramInfoLog(program))
    }
    if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
        throw new Error('ERROR: validating program. Info: '+gl.getProgramInfoLog(program))
    }
    return program
}




/* 
Two players both using the saved mesh.
+ Ground

How am i going to move them independently?

methods:
1) create two copies of anime mesh. and move each vertex depending on position of player <= CPU intensive
2) onlly have one anime mesh. Multiple draw calls. One uniform, its value just change twice?


2) 
draw player one

function drawFrame(){
    // player 1 YOU DON'T ACTUALLY DRAW THE PLAYER, just need to use player1 info to offest everything else 
    setTransform()
    // player 2
    setTransoform2()
    render()
}


*/