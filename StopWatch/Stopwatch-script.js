const clockButton = document.querySelector(".clock-button");
const stopwatchButton = document.querySelector(".stopwatch-button");
const content = document.querySelector(".content");
const title = document.querySelector(".title");

//        SWITCH FROM CLOCK TO STOPWATCH
clockButton.addEventListener('click' , function(){
    content.classList.remove('move-mode')
})
stopwatchButton.addEventListener('click' , function(){
    content.classList.add('move-mode')
})

clockButton.addEventListener('click' , function(){
    clockButton.classList.add('show');
    stopwatchButton.classList.remove('show');
})

stopwatchButton.addEventListener('click' , function(){
    stopwatchButton.classList.add('show');
    clockButton.classList.remove('show');
})

//          Clock

const nHour = document.querySelector('.numberClock-hour'),
    nMin = document.querySelector('.numberClock-min'),
    nSec = document.querySelector('.numberClock-sec'),
    sec = document.querySelector('.s'),
    min = document.querySelector('.m'),
    hour = document.querySelector('.h');

function clock(){
    let time = new Date();
    let getHour = time.getHours(),
        getMin = time.getMinutes(),
        getSec = time.getSeconds();

    nHour.innerHTML = getHour < 10 ? "0" + getHour : getHour;
    nMin.innerHTML = getMin < 10 ? "0" + getMin : getMin;
    nSec.innerHTML = getSec < 10 ? "0" + getSec : getSec;

    sec.style = `transform: rotate(${getSec * 6}deg); transition: 1s linear`
    min.style = `transform: rotate(${getMin * 6}deg); transition: 1s linear`
    hour.style = `transform: rotate(${getHour * 30}deg); transition: 1s linear`

    setTimeout(clock, 1000)
}
clock();

//         Stopwatch
const startBtn = document.querySelector('.start'),
      stHour = document.querySelector('.stHour'),
      stMin = document.querySelector('.stMin'),
      stSec = document.querySelector('.stSec');

      startBtn.addEventListener('click', function(){
    
        if (this.innerHTML === "start") {
            this.innerHTML = "stop"
            this.style = `background-color: red`
            // this.style = `color: #fff`
            document.querySelector('.stopwatch-button').classList.add('active')
        }
        else if(this.innerHTML === "stop"){
            this.innerHTML = "reset"
            // this.style = `color: #fff`
            document.querySelector('.stopwatch-button').classList.add('reActive')
            this.style = `background-color: #0051ff`
        }
        else if(this.innerHTML === "reset"){
            this.innerHTML = "start"
            document.querySelector('.stopwatch-button').classList.remove('active')
            document.querySelector('.stopwatch-button').classList.remove('reActive')
            this.style = `background: #fff`
            document.querySelector('main.day-mode .start').style = `background: #8aafff`
        }
        // stopwatch()
    
    });
    
    function stopwatch() {
        
        if(startBtn.innerHTML === "stop"){
            stSec.innerHTML++
        }
    
        if(stSec.innerHTML > 59){
            stSec.innerHTML = 00
            stMin.innerHTML++
        }
        if(stMin.innerHTML > 59){
            stMin.innerHTML = 00
            stHour.innerHTML++
        }
        if(stHour.innerHTML > 24){
            stHour.innerHTML = 00
        }
    
        if(startBtn.innerHTML === "start"){
    
            stHour.innerHTML = 0
            stMin.innerHTML = 0
            stSec.innerHTML = 0
            
        }
        setTimeout(() => stopwatch(), 1000)
    
    }
    stopwatch()
