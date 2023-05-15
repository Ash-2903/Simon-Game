var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;
var level = 0;


// when a key is pressed 

    $(document).keydown(function () {
        if(!started) {
            
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }    
    });


// when clicked on the button

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("your pattern : "+userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});


// to check the user inputted answer

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
            
        }
    }
    else {
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


// to generate sequences continuously

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  
    console.log("system pattern : "+gamePattern);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    // console.log(randomChosenColor);
    playSound(randomChosenColor);
}


// function to play sound

function playSound(colorChosen) {
    var colorSound = new Audio('sounds/'+colorChosen+'.mp3');
    colorSound.play();
}


// function to animate the buttons

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function () {
        $("."+currentColor).removeClass("pressed");
    }, 100);
}


// function to start over 

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



