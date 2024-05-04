let gameBoard = document.getElementById('gameBoard');
let divCompNums = document.getElementById('compNums');
let divUserNums = document.getElementById('userNums');
let divInfoGame = document.getElementById('infoGame');
let compNums = null;
let countNum = 4;

function generateUniqueNumbers(){
    let arr = [];
    for (let i = 0; i < countNum; i++) {
        let num = Math.floor(Math.random() * 10).toString();

        while (arr.includes(num)) {
            num = Math.floor(Math.random() * 10).toString();
        }
        arr.push(num);
    }
    return arr;
}

function showUserInputs(){
    divOldInfo = document.createElement('div');
    divOldInfo.setAttribute('class', 'oldInfo');
    divOldInfo.innerHTML = divInfoGame.innerHTML;


    let oldSubmit = document.getElementById('submit');
    if (oldSubmit != null) {
        oldSubmit.parentElement.appendChild(divOldInfo);
        oldSubmit.remove();
    }
    let childOldTry = divUserNums.children[divUserNums.children.length-1];
    
    if (childOldTry!= null) {
        for (let i = 0; i < childOldTry.children.length; i++) {
            childOldTry.children[i].setAttribute('readonly', 'true');
        }
    }

    
    let divTry = document.createElement('div');
    
    for (let i = 0; i < countNum; i++) {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        divTry.appendChild(input);
    }
    let btn = document.createElement('button');
    btn.setAttribute('id', 'submit');
    btn.textContent = 'Submit';
    btn.addEventListener('click', function () {
        checkCompletion();
    });
    divTry.appendChild(btn);
    divUserNums.appendChild(divTry);
}

function checkCompletion() {
    let userInputs = [];
    let isDuplicate = false;
    for (let i = 0; i < countNum; i++) {
        let num =divUserNums.children[divUserNums.children.length-1].children[i].value;
        if(userInputs.includes(num)) {
            isDuplicate = true;
            break;
        }
        userInputs.push(num);
    }
    if (isDuplicate) {
        divInfoGame.innerHTML = 'You have duplicate numbers!';
        return;
    }


    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < countNum; i++) {
        if (userInputs[i] === compNums[i]) {
            bulls++;
        } else {
            for (let j = 0; j < countNum; j++) {
                if (userInputs[i] === compNums[j] && i!== j) {
                    cows++;
                }
            }
        }
    }

    divInfoGame.innerHTML = `Bulls: ${bulls} Cows: ${cows}`;

    if (bulls === countNum) {
        alert('You Win!');
        startGame();
    }
    else{
        showUserInputs();
    }
}

function startGame() {
    divCompNums.innerHTML = '';
    divUserNums.innerHTML = '';
    divInfoGame.innerHTML = '';
    compNums = generateUniqueNumbers();
    
    for (let i = 0; i < countNum; i++) {
        let div = document.createElement('div');
        div.textContent = compNums[i];
        divCompNums.appendChild(div);
    }

    showUserInputs(countNum);

}

startGame();