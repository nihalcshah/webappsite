var count = 0;
updateDisplay()

function pseudoButtonPress(amt) {
    count += amt;
    updateDisplay()
}

function updateDisplay() {
    document.getElementById('results').innerHTML=count
}

function resetCount(){
    count = 0;
    updateDisplay()
}