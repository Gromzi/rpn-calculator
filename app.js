const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const clearButton = document.querySelector('[data-clear]')
const clearAllButton = document.querySelector('[data-clear-all]')
const panel4 = document.getElementById("panel4-textbox")
const panel3 = document.getElementById("panel3-textbox")
const panel2 = document.getElementById("panel2-textbox")
const panel1 = document.getElementById("panel1-textbox")

numberButtons.forEach(button => {
    button.addEventListener('click', () => {appendNumber(button.innerHTML)})
})

clearButton.addEventListener('click', () => {
    panel1.value = ""
})

function appendNumber(number) {
    panel1.value += number
}