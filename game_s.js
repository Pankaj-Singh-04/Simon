var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var level=0;
var start=false;

$(document).keypress(function(){
    if(!start){
        $("h1").text("Level "+level);
        nextSequence();
        start=true;
    }
});

$(".btn").click(function () {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.len-1);

});

function  checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
      else{
          console.log("wrong");
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          },200);
          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // for flash effect on buttons
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // var audio=new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    playSound(randomChosenColour);

}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed"); // to delay in remove class
      }, 100);
}

function startOver(){
    level=0;
    start=false;
    gamePattern=[];
}