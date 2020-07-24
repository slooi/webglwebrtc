console.log('controls.js loaded')

/* 
ORDER:
translate
rotate
scale
origin
*/

// Initialise variables
const trArray = document.getElementById('controls').children[0].children
const numOfSliders = 18

// START
attachListeners()
setAllSliderValues()
changeOccured()


// ############
// FUNCTIONS
// ############


// SET
function setAllSliderValues(){
    // TRANSLATE
    setPair(0,0)
    setPair(1,0)
    setPair(2,300)
    // ROTATE
    setPair(3,0)
    setPair(4,0)
    setPair(5,0)
    // SCALE
    setPair(6,1)
    setPair(7,1)
    setPair(8,1)
    // ORIGIN
    setPair(9,0)
    setPair(10,0)
    setPair(11,0)

    // CAMERA
    // TRANSLATE
    setPair(12,0)
    setPair(13,0)
    setPair(14,0)

    // ROTATE
    setPair(15,0)
    setPair(16,0)
    setPair(17,0)
}
function setPair(i,val){
    // sets the slider value & sets its corresponding display value
    setSlider(i,val)
    setDisplayVal(i,val)
}
function setSlider(i,val){
    getSlider(i).value = val
}
function setDisplayVal(i,val){
    trArray[i].children[2].innerText = val
}

// GET
function getAllSliderVals(){
    const values = []
    for(let i=0;i<numOfSliders;i++){
        values.push(Number(getSlider(i).value))
    }
    return values
}
function getSlider(i){
    return trArray[i].children[1].children[0]
}

// EVENTLISTENERS
function attachListeners(){
    for(let i=0;i<numOfSliders;i++){
        getSlider(i).addEventListener('input',e=>{
            console.log('input')
            setDisplayVal(i,e.target.value)
            changeOccured()
        })
    }
}

// Change in slider values
function changeOccured(){
    console.log(getAllSliderVals())
    setTransform(...getAllSliderVals())
    clear()
    render()
}