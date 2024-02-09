var errors = 0;                                      //set error=0
var cardlist = [                                     //add card list
    "boo",
    "bowser-jr",
    "bowser",
    "daisy",
    "diddy",
    "donkey",
    "luigi",
    "mario",
    "peach",
    "rosalina",
    "toad",
    "waluigi",
    "wario",
    "yoshi"
]

var cardSet;
var board = [];                                    //show outline of the card placement
var rows = 4;
var columns = 7;

var card1Selected;                                  //add card selected
var card2Selected;

var matchesFound = 0; // Initialize the matches found counter

window.onload = function() {                       //add functions to the game
    shuffleCards();
    startGame();
}

function shuffleCards(){                            
    cardSet = cardlist.concat(cardlist);            //two of each card
    console.log(cardSet);
    for (let i = 0; i < cardSet.length; i++) {      //shuffle the card
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        let temp = cardSet[i];                      //swap card
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame(){
    for (let r = 0; r < rows; r++) {                //arange board 4x7
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);                     //for JS use

            //<img id="0-0" class="card" src="boo.png">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "/assets/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click",selectCard);      //click to select card
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {                              //function to flip card
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "assets/9b43a5b6e04365158bf4f6765f9b3ee7.jpg";
    }
}                                
}

function selectCard(){                              
    if (this.src.includes("9b43a5b6e04365158bf4f6765f9b3ee7")){ //function to select card
        if(!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0"-"1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "/assets/" + board[r][c] + ".png";
        }
        else if (!card2Selected && this != card1Selected){
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0"-"1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "/assets/" + board[r][c] + ".png";   
            setTimeout(update, 1000);                //update to new cards after clicking by 1000s
        }
    }
}

function update() {
    if (card1Selected.src === card2Selected.src) {  // If cards are the same, it's a match
        matchesFound += 1;                          // Increase the count of matches found
        playClapSound();                            // Play clap sound
        if (matchesFound === 14) {                  // Check if all matches are found
            setTimeout(declareWinner, 100);         // Call declareWinner function after a short delay
        }
    } else {                                        // If cards not the same, flip both back
        card1Selected.src = "assets/9b43a5b6e04365158bf4f6765f9b3ee7.jpg";
        card2Selected.src = "assets/9b43a5b6e04365158bf4f6765f9b3ee7.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;

        if (errors >= 10) {                        // Check if errors have reached 10
            gameOver();                            // Call gameOver function
        }
    }

    card1Selected = null;
    card2Selected = null;
}

function declareWinner() {
    if (errors < 10) {                              // Checks if the player won without exceeding the error limit
        alert("Super Winner! You matched all pairs successfully.");
    }
}

function gameOver() {
    alert("Mario Kart Restart");
    window.location.reload();                       // Reloads the page to restart the game
}

function playClapSound() {
    var clapSound = document.getElementById('clapSound');
    clapSound.currentTime = 0;                      // Reset the audio file to its beginning if it was already played before
    clapSound.play();                               // Start playing the sound

    setTimeout(function() {
        clapSound.pause();                          // Stop playing the sound after 1 second
        clapSound.currentTime = 0;                  // Optionally reset the sound to start for the next play
    }, 2000);                                       // 2000 milliseconds = 2 second
}
