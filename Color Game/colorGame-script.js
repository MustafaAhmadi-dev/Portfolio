const squares = document.querySelectorAll('.square'),
      colorDisplay = document.getElementById('color-display'),
      messageDisplay = document.getElementById('message'),
      h1 = document.querySelector('h1'),
      resetButton = document.getElementById('reset'),
      modeButtons = document.querySelectorAll('.mode'),
      easyButton = document.querySelector('.mode');

let numSquares = 6,
    colors = [],
    pickedColor;

init();

function init(){
    colorDisplay.textContent = pickedColor;
    setupSquares();
    setupMode();
    reset()
}

resetButton.addEventListener('click' , function(){
    reset()
})

function setupSquares(){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];

        squares[i].addEventListener("click" , function(){
            let cilckedColor = this.style.backgroundColor;

            if(cilckedColor === pickedColor){
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again";
                changeColor(pickedColor)
            }
            else{
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

function setupMode(){
    for(let i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click" , function(){
            for(let i = 0; i < modeButtons.length; i++){
                modeButtons[i].classList.remove("selected");
            }

            this.classList.add("selected");

            if(this.textContent === "Easy"){
                numSquares = 3;
            }
            else{
                numSquares = 6;
            }

            reset();
        });
    }
}

function reset(){
    colors = getRandomColor(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#2C8E99";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
}

function changeColor(color){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

function chooseColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function getRandomColor(num){
    let arr = [];
    for(let i = 0; i < num; i++){
        arr.push(makeColor());
    }
    return arr;
}

function makeColor(){
    let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}