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
const pqButton = document.querySelector('[data-pq]');
const clearButton = document.querySelector('[data-clear]');
const clearAllButton = document.querySelector('[data-clear-all]');
const panel4 = document.getElementById("panel4-textbox");
const panel3 = document.getElementById("panel3-textbox");
const panel2 = document.getElementById("panel2-textbox");
const panel1 = document.getElementById("panel1-textbox");

const panels =  Array(panel1, panel2, panel3, panel4);

let panel1ShouldUnshift = false;


function isEmptyArrayIndex(array, index) {
    return typeof array[index] === 'undefined';
}
function refreshPanels(stack){
    for (let i=0; i<4; i++) {
        isEmptyArrayIndex(stack,i) ? panels[i].innerHTML = "" : panels[i].innerHTML = stack[i];
    }
}
function isPrime(num) {
    if(num < 2) return false;
    for (var i = 2; i < num; i++) {
        if(num % i == 0)
            return false;
    }
    return true;
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
    if(Math.pow(this[0],this[1])>Number.MAX_SAFE_INTEGER) {
        panel1.innerHTML = "Za duża liczba";
        panel1ShouldUnshift = true;
        return;
    }

    let x = this.shift();
    let y = this.shift();
    this.unshift(Math.pow(x,y));
}
stack.frac = function () {
    let primeFactors = generatePrimeFactors(this[0]);

    let panel1 = document.getElementById("panel1-textbox");
    let text = `\\({${this[0]}}=`;
    for(let i=0; i<primeFactors.length; i++){
        if(i<primeFactors.length-1){
            text += `{\\,${primeFactors[i][0]}^${primeFactors[i][1]} \\cdot}`;
        }else{
            text += `{\\,${primeFactors[i][0]}^${primeFactors[i][1]} }`;
        }

    } 
    text+= `\\)`;
    
    panel1.innerHTML = text;
    MathJax.typeset();
}
stack.pq = function () {
    let arg = this[0];

    if( arg <= 4 | arg%2 != 0)
    {
        panel1.innerHTML = 'Działa na parzystych > 4';
    }
    else{
      let x = arg
      for(let i=3; i<=(x/2); i++)
      {
        if(isPrime(x-i) & isPrime(i))
        {
            panel1.innerHTML = `\\( ${x.toString()} = ${i.toString()} + ${(x-i).toString()} \\)`;
            MathJax.typeset();
        }
      }
    }
    panel1ShouldUnshift = true;
}
stack.mod =  function () {
    let x = this.shift();
    let y = this.shift();
    this.unshift(y%x);
}
stack.add = function () {
    if(this[0]+this[1]>Number.MAX_SAFE_INTEGER) {
        panel1.innerHTML = "Za duża liczba";
        panel1ShouldUnshift = true;
        return;
    }

    let x = this.shift();
    let y = this.shift();
    this.unshift(y+x);
}
stack.subtract = function () {
    if(this[1]-this[0]<0) {
        panel1.innerHTML = "Liczba mniejsza niż 0";
        panel1ShouldUnshift = true;
        return;
    }
    let x = this.shift();
    let y = this.shift();
    this.unshift(y-x);
}
stack.multiply = function () {
    if(this[1]*this[0]>Number.MAX_SAFE_INTEGER) {
        panel1.innerHTML = "Za duża liczba";
        panel1ShouldUnshift = true;
        return;
    }
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
    if(panel1ShouldUnshift) {
        stack.unshift("");
        // panel1.innerHTML = "" ;
        panel1ShouldUnshift = false;
    }

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
        if (panel1ShouldUnshift) return;

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
    stack.frac();
    panel1ShouldUnshift = true;
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

// Pq Button
pqButton.addEventListener('click', () => {
    if (panel1.innerHTML !== "") {
        stack.pq();
    }
})