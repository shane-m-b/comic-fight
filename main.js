/**
 * Created by Shane on 4/18/2017.
 */

var char1Strength, char2Strength, isChar1OK, isChar2OK;

$(document).ready(function () {
    //adds click functionality to elements
   $("#char1Submit").click(searchAPIChar1);
   $("#char2Submit").click(searchAPIChar2);
   $("#battleSubmit").click(startBattle);
   $("#resetButton").click(resetAll);
   $("#hTitle").click(toggleInstructions);

   //changes the color to yellow when entering a character name
   $("#charName1").click(function() {
        $(this).css({"background-color": "yellow"})
   });

    $("#charName2").click(function() {
        $(this).css({"background-color": "yellow"})
    });

   isChar1OK = false;
   isChar2OK = false;

   char1Strength = 0;
   char2Strength = 0;

   //hides these elements until they are needed.
   $("#battleSubmit").hide();
   $("#resetButton").hide();
   $("#infoDiv").hide();
});

//searches the API for the first character
function searchAPIChar1() {

    $("#character1Div").fadeOut(250);

    var charName = $("#charName1").val();
    //var apiKey = "d20bb6af7ace1e3e67db60711180e6ff";

    //searches for character as long as the input field is not empty
    //places the character name into a url to access the API
    
    alert("Hie");
    
    if(charName.length > 0) {
        
        var encCharName = encodeURI(charName);
        var url = "https://gateway.marvel.com:443/v1/public/characters?name=" + encCharName + "&apikey=d20bb6af7ace1e3e67db60711180e6ff";

        console.log("URL:");
        console.log(url);
        $.getJSON(url, handleChar1JSON);
    } else {
        console.log("(char1) No name entered...");
        setCharacterBad("#charName1");
    }

    setTimeout("delayFadeIn('#character1Div', '#character1_img')", 1000);

    resetOpacity();

    //hides the character title
    $("#c1").hide();
    hideResetButton();


}

//searches the API for the second character
function searchAPIChar2() {

    $("#character2Div").fadeOut(250);

    var charName = $("#charName2").val();
    //var apiKey = "d20bb6af7ace1e3e67db60711180e6ff";

    if(charName.length > 0) {
        var encCharName = encodeURI(charName);
        //public key
        var url = "https://gateway.marvel.com:443/v1/public/characters?name=" + encCharName + "&apikey=d20bb6af7ace1e3e67db60711180e6ff";

        //private key
        //var url = "https://gateway.marvel.com:443/v1/public/characters?name=" + encCharName + "&apikey=f951478dd0ddaaf83db346b7688cb7e4ff55b806";

        console.log("URL:");
        console.log(url);
        $.getJSON(url, handleChar2JSON);
    } else {
        console.log("(char2) No name entered...");
        setCharacterBad("#charName2");
    }

    setTimeout("delayFadeIn('#character2Div', '#character2_img')", 1000);

    resetOpacity();

    $("#c2").hide();
    hideResetButton();
}

//handles the JSON response for the first character search
function handleChar1JSON(json) {
    var charCode, charName, charStrength, charPicture;


    //no results are found
    if(json.data.results.length == 0) {
        console.log("No results");
        setCharacterBad("#charName1");  //set the character to false
    } else {
        charCode = json.code;   //code to make sure it is ok
        charName = json.data.results[0].name;   //get the character name
        charStrength = json.data.results[0].comics.available;   //get how many comics the character is in

        charPicture = json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension; //get teh character img path

        //console log for testing
        console.log(json);
        console.log("Code: " + charCode);
        console.log("Name: " + charName);
        console.log("Strength: " + charStrength);
        console.log("Thumbnail Path: ");
        console.log(charPicture);

        //sets the character divs with received information
        $("#character1_title").text(charName);
        $("#character1_score").text(charStrength);
        $("#character1_img").attr("src", charPicture);

        char1Strength = charStrength;

        setCharacterGood("#charName1"); //sets the character good to true
    }

    checkIfCharactersOK();
}

//handles the JSON response for the second character search
function handleChar2JSON(json) {
    var charCode, charName, charStrength, charPicture;


    if(json.data.results.length == 0) {
        console.log("No results");
        setCharacterBad("#charName2");
    } else {
        charCode = json.code;
        charName = json.data.results[0].name;
        charStrength = json.data.results[0].comics.available;

        charPicture = json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension;

        console.log(json);
        console.log("Code: " + charCode);
        console.log("Name: " + charName);
        console.log("Strength: " + charStrength);
        console.log("Thumbnail Path: ");
        console.log(charPicture);

        $("#character2_title").text(charName);
        $("#character2_score").text(charStrength);
        $("#character2_img").attr("src", charPicture);

        char2Strength = charStrength;

        setCharacterGood("#charName2");
    }

    checkIfCharactersOK();
}

//sets the character to found
function setCharacterGood(elementID) {
    //changes the background to indicate an OK character
    $(elementID).css({"background-color": "green"});
    console.log(elementID + ": OK");

    //sets appropriate character to true
    switch (elementID) {
        case "#charName1":
            isChar1OK = true;
            break;
        case "#charName2":
            isChar2OK = true;
            break;
    }
}

//sets the character not found
function setCharacterBad(elementID) {
    //changes background to indicate no character
    $(elementID).css({"background-color": "red"});
    console.log(elementID + ": Error");

    //sets appropriate character to false and
    //empties the info texts
    switch (elementID) {
        case "#charName1":
            $("#character1_img").attr("src", "character not found.png");
            $("#character1_title").text("-");
            $("#character1_score").text("-");
            isChar1OK = false;
            break;
        case "#charName2":
            $("#character2_img").attr("src", "character not found.png");
            $("#character2_title").text("-");
            $("#character2_score").text("-");
            isChar2OK = false;
            break;
        default:
            break;
    }
}

//makes sure that both characters are found
function checkIfCharactersOK() {
    if(isChar1OK == true && isChar2OK == true) {
        console.log("Battle Started: ");
        console.log("Character One: " + char1Strength);
        console.log("Character Two: " + char2Strength);
        showBattleButton(); //allows user to click battle if characters are found
        return true;

    } else {
        console.log("Characters not ready...");
        console.log("Character One: " + isChar1OK);
        console.log("Character Two: " + isChar2OK);
        //hides the buttons if characters are not found.
        hideBattleButton();
        hideResetButton();
        return false;
    }
}

//battles the characters using the strengths of each character
// and a bool to determine who goes first
function battleFight(charStrength1, charStrength2, bAttackChar) {

    var winningChar = 0;    //The winner at the end

    //this function runs until the interval is cleared.
    //it is cleared when a character reaches 0 health
    var intervalID = setInterval(function(){

        if (charStrength1 > 0 && charStrength2 > 0) {

            //picks a random number to determine strength of attack
            var attackPower = Math.floor(Math.random() * 5) + 1;
            attackPower *= 50;

            //whichever character is not attacking gets damages
            switch (bAttackChar) {
                case true:
                    charStrength1 -= attackPower;
                    animateHit("#character1_img");
                    break;
                case false:
                    charStrength2 -= attackPower;
                    animateHit("#character2_img");
                    break;
            }

            //toggle which character is the attacking character for next loop
            bAttackChar = !bAttackChar;

            //ensure that character health never goes below 0
            if (charStrength1 < 0) {
                charStrength1 = 0;
            } else if(charStrength2 < 0) {
                charStrength2 = 0;
            }

            //update character strength
            $("#character1_score").text(charStrength1);
            $("#character2_score").text(charStrength2);

        } else {
            //sets the winning character
            if (charStrength1 == 0) {
                winningChar = 2;
            } else if (charStrength2 == 0) {
                winningChar = 1;
            } else {
                winningChar = 0;
            }

            console.log("battlefight: " + winningChar);

            //clears the interval since a winner has been found
            clearInterval(intervalID);

            //calls the declar winner function
            declareWinner(winningChar);
        }

    }, 500);    //the duration between each call of this function

}

//starts the battle
function startBattle() {

    //when the battle button is clicked, the battle will start
    $("#battleSubmit").prop("disabled", true);
    var bAttackChar = Math.random() >= 0.5; //selects randomly which character attacks first
    battleFight(char1Strength, char2Strength, bAttackChar);

}

//declares a winner
function declareWinner(winner) {

    //explodes the losing character
    switch (winner) {
        case 1:
            $("#character2_img").effect("explode", "slow");
            break;
        case 2:
            $("#character1_img").effect("explode", "slow");
            break;
    }

    //hides the battle button and shows the rematch button
    hideBattleButton();
    //disables the battle button because it could still be clicked while hiding
    $("#battleSubmit").prop("disabled", false);
    showResetButton();

}

//SHOW / HIDE BUTTONS - helper functions

function hideBattleButton() {
    $("#battleSubmit").hide("slide", {direction: "right"}, 1000);
}

function showBattleButton() {
    $("#battleSubmit").show("slide", {direction: "right"}, 1000);
}

function hideResetButton() {
    $("#resetButton").hide("slide", {direction: "left"}, 1000);
}

function showResetButton() {
    $("#resetButton").show("slide", {direction: "left"}, 1000);
}

//searches for the first character again
function resetCharacterOne() {
    searchAPIChar1();
}

//searches for the second character again
function resetCharacterTwo() {
    searchAPIChar2();
}

//resets the picture
function resetOpacity() {
    $("#character1_img").css("opacity", "1");
    $("#character2_img").css("opacity", "1");
}

//resets all characters
function resetAll() {

    resetCharacterOne();
    resetCharacterTwo();

    hideResetButton();

}

//shows/hides the instruction div
function toggleInstructions() {
    $("#infoDiv").toggle("blind", 1000);
}

//ANIMATIONS

//creates random effects when a character is hit
function animateHit(charHit) {

    var effects = ["shake", "bounce", "pulsate"];
    var randFX = Math.floor(Math.random() * 3);
    $(charHit).effect(effects[randFX], "fast");

}

//fades in the elements, used with a delay
function delayFadeIn(elementID_1, elementID_2) {
    $(elementID_1).fadeIn(500);
    $(elementID_2).fadeIn(500);
}
