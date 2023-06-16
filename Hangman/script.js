window.onload = function(){
    let alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]

    let categories,
        chosenCategory,
        word,
        guess,
        guesses = [],
        mistakes = 0,
        lives,
        counter,
        space;
    
    const showLives = document.getElementById('mylives'),
          categoryName = document.getElementById('categoryName'),
          hint  = document.getElementById('hint'),
          showClue = document.getElementById('clue'),
          reset = document.getElementById('reset'),
          hangmanPic = document.querySelector('img');

    let buttons = function(){
        let myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for(let i = 0; i < alphabet.length; i++){
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    selectCategory = function(){
        if (chosenCategory === categories[0]){
            categoryName.innerHTML = "Guess the Football Team";
        }
        else if (chosenCategory === categories[1]){
            categoryName.innerHTML = "Guess the Movie";
        }
        else if (chosenCategory === categories[2]){
            categoryName.innerHTML = "Guess the City";
        }
    }

    result = function(){
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for(let i = 0; i < word.length; i++){
            correct.setAttribute('id' , 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class' , 'guess');

            if (guess[i] == "-"){
                guess.innerHTML = "-";
                space = 1;
            }else{
                guess.innerHTML = "__"
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // SHOW LIVES
    comments = function(){
        showLives.innerHTML = "You Can Try " + lives + " Times!"

        if(lives < 1){
            showLives.innerHTML = "Game Over!!!"
        }

        for(let i = 0; i < guesses.length; i++){
            if(counter + space === guesses.length){
                showLives.innerHTML = "You Win!!!"
            }
        }
    }

    // ON-CLICK Function
    check = function(){
        list.onclick = function(){
            let guess = (this.innerHTML);
            this.setAttribute('class' , 'active');
            this.onclick = null;

            for(let i = 0; i < word.length; i++){
                if(word[i] === guess){
                    guesses[i].innerHTML = guess;
                    counter += 1;
                }
            }

            let j = (word.indexOf(guess));

            if(j === -1){
                lives -= 1;
                mistakes++;
                hangmanPic.src = "./images/" + mistakes + ".jpg";
                comments();
            }
            else{
                comments();
            }
        }
    }

    play = function(){
        categories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        
        word = word.replace(/\s/g , "-");
        buttons();

        guesses = [];
        lives = 6;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCategory();
    }

    play();

    // HINT 
    hint.onclick = function(){
        hints = [
            ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
        ];

        let categoryIndex = categories.indexOf(chosenCategory);
        let hintIndex = chosenCategory.indexOf(word);

        showClue.innerHTML = "Clue : " + hints[categoryIndex][hintIndex];
    };

    reset.onclick = function(){
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        play();
    }
}