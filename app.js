const numberButtons = document.querySelectorAll('[data-number]');
const enterButton = document.querySelector('[data-enter]');
const popButton = document.querySelector('[data-pop]');
const swapButton = document.querySelector('[data-swap]');
const powerButton = document.querySelector('[data-power]');
const fracButton = document.querySelector('[data-frac]');
const moduloButton = document.querySelector('[data-modulo]');
const addButton = document.querySelector('[data-add]');
const subtractButton = document.querySelector('[data-subtract]');
const multiplyButton = document.querySelector('[data-multiply]');
const divideButton = document.querySelector('[data-divide]');
const clearButton = document.querySelector('[data-clear]');
const clearAllButton = document.querySelector('[data-clear-all]');
const panel4 = document.getElementById("panel4-textbox");
const panel3 = document.getElementById("panel3-textbox");
const panel2 = document.getElementById("panel2-textbox");
const panel1 = document.getElementById("panel1-textbox");

const panels =  Array(panel1, panel2, panel3, panel4);


function isEmptyArrayIndex(array, index) {
    return typeof array[index] === 'undefined';
}
function refreshPanels(stack){
    for (let i=0; i<4; i++) {
        isEmptyArrayIndex(stack,i) ? panels[i].innerHTML = "" : panels[i].innerHTML = stack[i];
    }
}



let stack = Array();

stack.push = function() {
    let retrn = Array.prototype.push.apply(this, arguments);
    refreshPanels(this);
    return retrn;
}
stack.pop = function() {
    let retrn = Array.prototype.pop.apply(this, arguments);
    refreshPanels(this);
    return retrn;
}
stack.shift = function() {
    let retrn = Array.prototype.shift.apply(this, arguments);
    refreshPanels(this);
    return retrn;
}
stack.unshift = function() {
    let retrn = Array.prototype.unshift.apply(this, arguments);
    refreshPanels(this);
    return retrn;
}
stack.empty = function() {
    this.length = 0
    refreshPanels(this);
}
stack.swap = function () {
    [this[0], this[1]] = [this[1], this[0]];
    refreshPanels(this);
}
stack.power = function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(Math.pow(x,y));
}
stack.frac = function () {
    // console.log(generatePrimeFactors(this[0]));
    // var content = "$${{ -b \\pm \\sqrt {{b^2} - 4ac}} \\over {2a}}$$";
    // // panel1.innerHTML = content
    // console.log("alala");
    // MathJax.Hub.queue(["Text",panel1,content]);

    let panel1 = document.getElementById("panel1-textbox"); 
    panel1.innerHTML="\\({{a}_{x}}=\\frac{\\,d^2 z}{\\,dt^2}\\)";
    MathJax.typeset();
}
stack.mod =  function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(y%x);
}
stack.add = function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(y+x);
}
stack.subtract = function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(y-x);
}
stack.multiply = function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(y*x);
}
stack.divide = function () {
    let x = this.shift();
    let y = this.shift();

    if(x == 0){
        panel1.innerHTML = "Dzielenie przez 0";
        return;
    }

    this.unshift(Math.trunc(y/x));
}


function appendNumber(number) {
    panel1.innerHTML += number

    stack[0] = Number(panel1.innerHTML);
}

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => { appendNumber(button.innerHTML) });
})

// Clear button
clearButton.addEventListener('click', () => {
    panel1.innerHTML = String(panel1.innerHTML).slice(0, -1)

    stack[0] = Number(panel1.innerHTML);
})

// Clear all button
clearAllButton.addEventListener('click', () => {
    stack.empty();
})

// POP button
popButton.addEventListener('click', () => {
    stack.shift();
})

// Enter button
enterButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "") {
        stack.unshift("");
    }
})

// Swap Button
swapButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "") {
        stack.swap();
    }
})

// Power Button
powerButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.power();
    }
})

// Frac Button
fracButton.addEventListener('click', () => {
    // if (panel1.innerHTML !== "") {
    //     stack.frac();
    // }
    stack.frac();
})

// Mod Button
moduloButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.mod();
    }
})

// Add Button
addButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.add();
    }
})

// Subtrack Button
subtractButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.subtract();
    }
})

// Multiply Button
multiplyButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.multiply();
    }
})

// Divide Button
divideButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "" && panel2.innerHTML !== "") {
        stack.divide();
    }
})