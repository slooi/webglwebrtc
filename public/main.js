console.log('main.js loaded')

/* 
ORDER:
translate
rotate
scale
origin
*/

// Initialise variables
const trArray = document.getElementById('controls').children[0].children

// START
attachListeners()
setAllSliderValues()



// ############
// FUNCTIONS
// ############


// SET
function setAllSliderValues(){
    // TRANSLATE
    setPair(0,0) // 0
    setPair(1,0) // 1
    setPair(2,0) // 2
    // ROTATE
    setPair(3,0) // 3
    setPair(4,0) // 4
    setPair(5,0) // 5
    // SCALE
    setPair(6,1) // 6
    setPair(7,1) // 7
    setPair(8,1) // 8
    // ORIGIN
    setPair(9,0) // 9
    setPair(10,0) // 10
    setPair(11,0) // 11
}
function setPair(i,val){
    // sets the slider value & sets its corresponding display value
    setSlider(i,val)
    setDisplayVal(i,val)
}
function setSlider(i,val){
    getSlider.value = val
}
function setDisplayVal(i,val){
    trArray[i].children[2].innerText = val
}

// GET
function getAllSliderVals(){
    const values = []
    for(let i=0;i<12;i++){
        values.push(Number(getSlider(i).value))
    }
    return values
}
function getSlider(i){
    return trArray[i].children[1].children[0]
}

// EVENTLISTENERS
function attachListeners(){
    for(let i=0;i<12;i++){
        getSlider(i).addEventListener('input',e=>{
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