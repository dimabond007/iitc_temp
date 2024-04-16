let display = null
function createCalculator() {
    let arr_val = [1,2,3,4,5,6,7,8,9,0,'+','-','*','/','=']
    display = document.createElement('input');
    display.setAttribute('type', 'text');  
    display.setAttribute('id', 'display');
    display.setAttribute('readonly', 'true');
    document.getElementById('calculator').appendChild(display);
    
    let clearDisplay = document.createElement('button');
    clearDisplay.textContent = 'C';
    clearDisplay.addEventListener('click',function(e) {
        display.value = '';
    });
    document.getElementById('calculator').appendChild(clearDisplay);

    for (var i = 0; i < arr_val.length; i++) {
        let btn = document.createElement('button');
        btn.textContent = arr_val[i];
        btn.addEventListener('click', function () {
            input(this.textContent);
        });
        document.getElementById('calculator').appendChild(btn);
    }
    let btn = document.createElement('button');
}

function input(value) {
    if (value === '=') {
        calculate();
    } else {
        display.value += value;
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

createCalculator()