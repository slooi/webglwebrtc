console.log('loaded webgl.js')

// Source
const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText


// canvas
const canvas = document.createElement('canvas')
// const canvas = document.getElementById('canvas')
canvas.width = 300
canvas.height = 300
document.body.append(canvas)

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
gl.clearColor(1,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)

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
let data = [
// X Y Z
    0,0,0,
    30,0,0,
    0,30,0,
]

// BUFFER   !@#!@
const dataBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,dataBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)

// attribute
gl.vertexAttribPointer(
    attribLoc.a_Position,
    3,
    gl.FLOAT,
    0,
    0,
    0
)
gl.enableVertexAttribArray(attribLoc.a_Position)

// uniform
setTransform()

// render
render()


// FUNCTIONS
function setTransform(){
    let transform = m4.projection(canvas.width,canvas.height,canvas.width)
    // let transform = m4.identity()
    // transform = m4.scale(transform,2/300,2/300,1) // everything after this is affect by this   So this is applied at the very end???
    // transform = m4.scale(transform,2,2,1)
    // transform = m4.translate(transform,50,0,0)   // origin
    // transform = m4.rotateZ(transform,90)
    // transform = m4.rotateY(transform,0)
    transform = m4.rotateX(transform,0)
    // transform = m4.translate(transform,50,0,0)   // translate
    console.log('transform',transform)
    gl.uniformMatrix4fv(uniformLoc.u_Transform,false,transform)
}

function render(){
    gl.drawArrays(gl.TRIANGLES,0,data.length/3)
    gl.drawArrays(gl.POINTS,0,data.length/3)
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