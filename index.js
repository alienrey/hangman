function guess(userSelectedLetter){
    
    let solvedLetters 
    document.getElementById(userSelectedLetter).disabled = true;
    guesses.push(userSelectedLetter)
    
    if(lettersInWord[userSelectedLetter] == true){
        solvedLetters = wordToGuess.split('').map((letterOfWord) => guesses.includes(letterOfWord) ? letterOfWord : "  _  ").join('')
        document.getElementById("letter-ui").innerHTML = solvedLetters
        
        if(solvedLetters == wordToGuess){
            hasWon=true
        }
    }
    
    else{
        lives--
        getCurrentAstronautState()
        incorrectGuessEffect()
    }
}

function win(){
    hasWon = true
    for(let i = 0; i < 26;i++){
        document.getElementById(String.fromCharCode(i+65)).disabled = false;
        console.log(String.fromCharCode(i+65))
    }

    alert(`Guessed it! Press 'OK' to proceed to next word.\nScore: ${score + 1}`);
    
    nextStage()
}

function lose(){
    hasWon = false
    document.getElementById("letter-ui").innerHTML = wordToGuess
    console.log("executes")
    for(let i = 0; i < 26;i++){
        document.getElementById(String.fromCharCode(i+65)).disabled = true;
    }
    setTimeout(() => {
        alert(`Aw, better luck next time. GG\nScore: ${score}`)
    }, 250); 

}

function incorrectGuessEffect(){
    document.getElementById("body-ui").style.backgroundColor = "#e98074";
    setInterval(
        function(){
            document.getElementById("body-ui").style.backgroundColor = "white";
        }
        ,100
    )
}

function timer(){
    const endTime = getEndTime()
    let countdown = setInterval(
        function(){
            let difference = endTime - new Date().getTime()
            document.getElementById("timer").innerHTML = Math.ceil(difference/1000) + " seconds"
            console.log(Math.ceil(difference/1000))

            if(difference < 0 && !hasWon){
                clearInterval(countdown)
                document.getElementById("timer").innerHTML = "Time is up!"
                document.getElementById("astronaut-state").src='./images/6.png'
                lose()
            }
            else if(lives == 0 && !hasWon){
                clearInterval(countdown)
                lose()
            }
            else if(hasWon){
                clearInterval(countdown)
                win()
            }
        }
    ,100)
}

function createLettersMap(word){
    let letterMap = {}
    for(const letter of word){
        letterMap[letter] = true
    }
    
    return letterMap
}

function getEndTime(secondsToAdd = 30){
    let startTime = new Date()
    return startTime.setSeconds(startTime.getSeconds() + secondsToAdd)
}



function getCurrentAstronautState(){
    if(lives == 5){
        document.getElementById('').src = './images/1.png'
    }
    else if(lives == 4){
        document.getElementById('astronaut-state').src='./images/2.png'
    }
    else if(lives == 3){
        document.getElementById('astronaut-state').src='./images/3.png'
    }
    else if(lives == 2){
        document.getElementById('astronaut-state').src='./images/4.png'
    }
    else if (lives == 1){
        document.getElementById('astronaut-state').src='./images/5.png'
    }
    else{
        document.getElementById('astronaut-state').src='./images/6.png'
    }
}

function getRandomWord(){
    const socialNetworkingSites = [
        "FACEBOOK",
        "INSTAGRAM",
        "TWITTER",
        "TUMBLR",
        "LINKEDLN",
        "WHATSAPP",
        "SNAPCHAT",
        "PINTEREST",
        "REDDIT",
        "YOUTUBE",
        "DEVIANTART",
        "QUORA",
        "REVERBNATION",
        "TWITCH",
        "WATTPAD",
        "FLICKR"
    ]
    
    return socialNetworkingSites[Math.floor(Math.random()*socialNetworkingSites.length)]
}

function nextStage(){
    score++
    document.getElementById('score-ui').innerHTML = `Score: ${score}`
    lives = 5
    guesses = []
    hasWon = false
    wordToGuess = getRandomWord()
    console.log(wordToGuess)
    lettersInWord = createLettersMap(wordToGuess)
    document.getElementById('letter-ui').innerHTML = "  _  ".repeat(wordToGuess.length)
    timer()
}

    let score = 0
    let lives = 5
    let guesses = []
    let hasWon = false
    let wordToGuess = getRandomWord()
    let lettersInWord = createLettersMap(wordToGuess)
    console.log(wordToGuess)
    document.getElementById('letter-ui').innerHTML = "  _  ".repeat(wordToGuess.length)
    timer()
