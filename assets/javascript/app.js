$(document).ready(function(){

   // start the game when user clicks on Start button
   $("#start-btn").on("click", gameState.startTimer);
 
 });
 
 // information about the state of game play
 var gameState = {
 
   // set the time at 30 seconds, and count down by 1 second
   timeRemaining : 30,
 
   // start the timer, hide the start page, show the questions
   startTimer: function() {
     $("#timer").text("Time remaining: " + gameState.timeRemaining);
     setInterval(gameState.countdown, 1000);
     $(".start-page").hide();
     trivia.displayQuestions();
   },
 
   // decrement the timer and stop the timer at 0
   countdown: function() {
     gameState.timeRemaining--;
     $("#timer").text("Time remaining: " + gameState.timeRemaining);
     if (gameState.timeRemaining === 0) {
       gameState.stopTimer();
       $("#timer").empty();
     }
   },
 
   // stop the timer and check the answers
   stopTimer: function() {
     clearInterval();
     trivia.checkAnswers();
   },
 
   // hide the questions and display the end page with results
   showEndPage: function(correct, incorrect, unanswered) {
     $("#end-page").show();
     $("#questions-box").empty();
     $("#timer").empty();
     $("#timer").hide();
     $("#correct-answers").text("Correct answers (Way to go!): " + correct);
     $("#incorrect-answers").text("Incorrect answers (You can always try again!): " + incorrect);
     $("#unanswered").text("Skipped questions (Meh): " + unanswered);
   }
 }
 
 // functions to handle the building questions page and scoring
 var trivia = {
 
   // pull questions from the array of questions, loop through them, and append to UI
   displayQuestions: function() {
     var divContainer = $("#questions-box");
     var answerGroup = $(".form-check");
     divContainer.append('<h2>Answer the following questions:</h2>');
             
     for (var i = 0; i < questionBank.length; i++) {
 
       divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
 
       var answer1 = questionBank[i].answers[0];
       var answer2 = questionBank[i].answers[1];
       var answer3 = questionBank[i].answers[2];
       var answer4 = questionBank[i].answers[3];
 
       divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
       divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
       divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
     }
 
     // add a Done button to the end of the page and register its click handler
     var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
     divContainer.append(doneButton);
     $("#done-button").on("click", gameState.stopTimer);
   },
 
   // test if the user answers are correct, incorrect, or if there are unanswered questions
   checkAnswers: function() {
     var correctAnswer;
     var userAnswer;
     var correct = 0;
     var incorrect = 0;
     var unanswered = 0;
 
     // loop through to compare the text of the label with the user answers
     // increment score counts appropriately
     for (var i = 0; i < questionBank.length; i++) {
       correctAnswer = questionBank[i].correct;
       userAnswer = $('input[id=radio'+i+']:checked + label').text();
 
       if (userAnswer === correctAnswer) {
        correct++;
       } else if (userAnswer === "") {
         unanswered++;
       } else if (userAnswer !== correctAnswer) {
         {
           incorrect++;
         }
       }
     }
 
     // show the end page with the score tally
     gameState.showEndPage(correct, incorrect, unanswered);
   },
 }
 
 // array of objects with the questions, possible answers, and the correct answer
 var questionBank =
 [
   {
     question: "What city did The Walking Dead Series start?",
     answers: ["Los Angeles", "New York", " Denver"],
     correct: "Atlanta"
   },
 
   {
     question: "Carol kills several people in the course of the Walking Dead who is not one?",
     answers: ["Lizzie", "Karen", "Mike"],
     correct: "David"
   },
   {
     question: "Which eye did Carl lose?",
     answers: ["Right", "Left", "Both", "None"],
     correct: "Left"
   },
   {
     question: "When Glenn is taken by the Vatos gang where do they take him?",
     answers: ["Chick fil-a", "Military Base", "Knoxville", "Nursing Home"],
     correct: "Nursing Home"
   },
   {
     question: "Who is Merle sibling?",
     answers: ["carrots and peas", "a cross of tomatoes and tobacco", "gummy bears"],
     correct: "a cross of tomatoes and tobacco"
   },
   {
     question: "Who is Judith Father?",
     answers: ["Rick", "Dayrl", "Shane", "Glenn"],
     correct: "Shane" 
   },
   {
     question: "Who did Nigen kill in the Final Epsiode of Season 6?",
     answers: ["Flanders", "Van Houten", "Smithers"],
     correct: "Flanders"
   }
 ]