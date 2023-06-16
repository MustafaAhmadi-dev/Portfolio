let audio = new AudioContext();
let buttonSize = 26;

let canvas = document.getElementById('canvas');
let screen = canvas.getContext("2d");

let data = {
    step : 0,
    tracks : [
        createTrack('gold' , note(audio, 880)),
        createTrack('gold' , note(audio, 659)),
        createTrack('gold' , note(audio, 587)),
        createTrack('gold' , note(audio, 523)),
        createTrack('gold' , note(audio, 440)),
        createTrack('dodgerblue' , kick(audio))
    ]
};

setInterval(function(){

    data.step = (data.step + 1) % data.tracks[0].steps.length;

    data.tracks.filter(function(track){return track.steps[data.step]; }).forEach(function(track){track.playSound(); });
} , 100);


(function draw (){
    screen.clearRect(0 , 0 , screen.canvas.width , screen.canvas.height);

    drawTracks(screen , data);

    drawButton(screen , data.step , data.tracks.length , "red");

        requestAnimationFrame(draw)
    }
)();

(function setupButtonClicking(){
    canvas.addEventListener('click' , function(e){
        let p = {x : e.offsetX  ,y : e.offsetY};

        data.tracks.forEach(function(track , row){
            track.steps.forEach(function(on , column){
                if(isPointInButton(p , column , row)){
                    track.steps[column] = !on
                }
            });
        });
    });
})();

function note(audio , frequency){
    return function(){
        let duration = 1;

        let sinWave = createSinWave(audio , duration);
        sinWave.frequency.value = frequency;

        chain([
            sinWave,

            createAmplifier(audio , 0.2 , duration),

            audio.destination
        ]);
    };
};

function kick(audio){
    return function(){
        let duration = 2;

        let sinWave = createSinWave(audio , duration);

        rampDown(audio , sinWave.frequency , 160 , duration);

        chain([
            sinWave,
            createAmplifier(audio , 0.4 , duration),
            audio.destination
        ]);
    };
};

function createSinWave(audio , duration){
    let oscillator = audio.createOscillator();

    oscillator.type = 'sine';

    oscillator.start(audio.currentTime);

    oscillator.stop(audio.currentTime + duration);

    return oscillator;
};

function rampDown(audio , value , startValue , duration){
    value.setValueAtTime(startValue , audio.currentTime);
    value.exponentialRampToValueAtTime(0.01 , audio.currentTime + duration);
}

function createAmplifier(audio , startValue , duration){
    let amplifier = audio.createGain();
    rampDown(audio , amplifier.gain , startValue , duration);
    return amplifier;
}

function chain(soundNodes){
    for (let i =0; i < soundNodes.length - 1; i++){
        soundNodes[i].connect(soundNodes[i + 1]);
    }
}

function createTrack(color , playSound){
    let steps = [];
    for(let i = 0; i < 16; i++){
        steps.push(false);
    }

    return { steps: steps , color: color , playSound: playSound};
}

// let buttonSize = 26;

function buttonPosition(column , row){
    return {
        x: buttonSize / 2 + column * buttonSize * 1.5,
        y: buttonSize / 2 + row * buttonSize * 1.5
    };
}

function drawButton(screen , column , row , color){
    let position = buttonPosition(column , row);
    screen.fillStyle = color;
    screen.fillRect(position.x , position.y , buttonSize, buttonSize);
}

function drawTracks(screen , data){
    data.tracks.forEach(function(track, row){
        track.steps.forEach(function(on , column){
            drawButton(screen , column , row , on ? track.color : "lightgray");
        });
    });
}

function isPointInButton(p , column , row){
    let b = buttonPosition(column , row);
    return !(p.x < b.x || p.y < b.y || p.x > b.x + buttonSize || p.y > b.y + buttonSize);
}