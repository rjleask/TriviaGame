 $(document).ready(function() {
     // array that holds the right answer for each question and is refreshed after each question
     var rightAnswer = [];
     var ul = $("ul");
     // assigning parent function
     var parent = ul.parent();
     // making a var in the global scope to be updated for each question
     var ultPossibleAnswers = [];
     var randomQuestionHeader = $(".random_question");
     // assigning question functions here
     var bestBasketQuestion = jordanQuestion;
     var goalsScoredQuestion = peleQuestion;
     var muhammadQuestion = aliQuestion;
     // array of all the questions to be accessed randomly
     var allQuestionsArr = [bestBasketQuestion, goalsScoredQuestion, muhammadQuestion];
     // takes in the current animated gif
     var animatedGifWrong;
     var animatedGif;
     // container around the gif image
     var animatedGifBox = $(".animated_gif_box");
     // updated based on what question was asked, a more descriptive answer
     var correctMessageDisplay;
     var wrongMessageDisplay;
     // counts what question its on, incremented in the questions themselves
     var questionCounter = 1;
     var timerNumber = 20;
     // timer variables
     var intervalId;
     var interval2Id;
     var timerNumberDisplay = $(".timer_number");
     var questionsRight = 0;
     var questionsWrong = 0;


     $(".start_button").on("click", function() {
         $(this).addClass("hideElement");
         $(".game_description").addClass("hideElement");
         startGame();
         randomQuestionHeader.addClass("revealElement");
         timerNumberDisplay.addClass("revealElement");
     });
     $(".restart_button").on("click", function() {
         restartGame();
     });

     function addLiToDom() {
         // This code below detaches the ul from the page so it doesnt refresh each time
         // empty the list to remove any values that might be in there
         // loop through each item in the array and append a li with the possAnswers value inside
         // then finally add it back into the dom
         ul.detach().empty().each(function(x) {
             for (var i = 0; i < ultPossibleAnswers.length; i++) {
                 $(this).append('<li><span>' + ultPossibleAnswers[i] + '</span></li>');
                 if (i == ultPossibleAnswers.length - 1) {
                     $(this).appendTo(parent);
                 }
             }
         });
     }
     // grabs a question function at random and calls it
     function startGame() {
         if (allQuestionsArr.length < 1) {
             randomQuestionHeader = "";
             correctMessageDisplay = "";
             wrongMessageDisplay = "";
             $("#right_answer").text("Questions Right:" + questionsRight);
             $("#wrong_answer").text("Questions Wrong:" + questionsWrong);
             $(".end_game_results").addClass("revealElement");
             $("#restart_button").css("display", "inline-block");
             animatedGifBox.empty();
         }
         var randomNumber = Math.floor(Math.random() * allQuestionsArr.length);
         allQuestionsArr[randomNumber]();
         timerNumberDisplay.html("Time:" + timerNumber);
         myTimer();

     }

     function restartGame() {
         allQuestionsArr = [bestBasketQuestion, goalsScoredQuestion, muhammadQuestion];
         questionsWrong = 0;
         questionsRight = 0;
         questionCounter = 1;
         startGame();
     }

     // all the questions are below here
     function jordanQuestion() {
         reset();
         // animatedGifWrong;
         animatedGifWrong = "<img src='assets/images/jordan-wrong.gif'>";
         animatedGif = "<img src='assets/images/jordan.gif'>";
         // removes its index from the questions array
         allQuestionsArr.splice(allQuestionsArr.indexOf(bestBasketQuestion), 1);
         wrongMessageDisplay = "The right answer was Jordan...look how disappointed jordan is in your knowledge";
         // runs after the correct answer was chosen
         correctMessageDisplay = " Jordan went 6-0 in NBA title series(Lebron is 3-5) including 5mvp and 10 defensive player awards!";
         // question to be displayed in the randomquestionheader
         randomQuestionHeader.text("Q" + questionCounter + ":Whom of the following is considered by many to be the best basketball player of all time?");
         $(".possible_answers_li").css("display", "block");
         var possAnswers = ["Michael Johnson", "Jackie Robinson", "Michael Jordan", "Morgan Freeman"];
         // push the right answer for the question to the gloabal right answer array
         rightAnswer.push(possAnswers[2]);
         // loops through possible answers and pushes them to the global array for referencing
         for (var i = 0; i < possAnswers.length; i++) {
             ultPossibleAnswers.push(possAnswers[i]);
         }
         addLiToDom();
         // listens for a click event on an li element calls questionclickhandler then passes in the event to correctGuessChecker which determins if its right or wrong
         questionClickEventHandler();
     }

     function peleQuestion() {
         reset();
         animatedGifWrong = "<img src='assets/images/pele-wrong.gif'>";
         animatedGif = "<img src='assets/images/pele.gif'>";
         allQuestionsArr.splice(allQuestionsArr.indexOf(goalsScoredQuestion), 1);
         wrongMessageDisplay = "The right answer was Pele..";
         correctMessageDisplay = "Pele has scored over 1200 goals in his career, twice the amount of the current live leader Christiano Ronaldo";
         randomQuestionHeader.text("Q" + questionCounter + ":Who has scored the most goals out of these players?");
         $(".possible_answers_li").css("display", "block");
         var possAnswers = ["Lionel Messi", "Christiano Ronaldo", "Pele", "Wayne Rooney"];
         rightAnswer.push(possAnswers[2]);
         for (var i = 0; i < possAnswers.length; i++) {
             ultPossibleAnswers.push(possAnswers[i]);
         }
         addLiToDom();
         questionClickEventHandler();
     }

     function aliQuestion() {
         reset();
         animatedGifWrong = "<img src='assets/images/ali-wrong.gif'>";
         animatedGif = "<img src='assets/images/ali.gif'>";
         allQuestionsArr.splice(allQuestionsArr.indexOf(muhammadQuestion), 1);
         wrongMessageDisplay = "You dolt! probably should have gotten that one...";
         correctMessageDisplay = "Ali (aka cassius clay) went 56 and 5 in his career with 37 knockouts and had a number of entertaining phrases";
         randomQuestionHeader.text("Q" + questionCounter + ":Who was famous for saying 'float like a butterfly, sting like a bee'");
         $(".possible_answers_li").css("display", "block");
         var possAnswers = ["George Foreman", "Larry Bird", "Kareem Jabbar", "Muhammad Ali"];
         rightAnswer.push(possAnswers[3]);
         for (var i = 0; i < possAnswers.length; i++) {
             ultPossibleAnswers.push(possAnswers[i]);
         }
         addLiToDom();
         questionClickEventHandler();
     }
     // passes in event to  questionclickhandler
     function questionClickEventHandler() {
         $("li").on("click", function(e) {
             stopTimer();
             correctGuessChecker(e);
         });
         questionCounter++;
     }

     function reset() {
         ultPossibleAnswers = [];
         correctMessageDisplay = "";
         wrongMessageDisplay = "";
         timerNumber = 20;
         rightAnswer = [];
         animatedGifBox.empty();
     }
     // determins if click event is right or wrong
     function correctGuessChecker(e) {
         if (e.target.innerText == rightAnswer[0]) {
             animatedGifBox.append(animatedGif);
             randomQuestionHeader.text("Correct! " + correctMessageDisplay);
             $("li").addClass("hideElement");
             questionsRight++;
             betweenQuestionTimer()
         } else {
             questionsWrong++;
             animatedGifBox.append(animatedGifWrong);
             randomQuestionHeader.text("Wrong! " + wrongMessageDisplay);
             $("li").addClass("hideElement");
             betweenQuestionTimer();
         }

     }

     function outOfTime() {
         $("li").addClass("hideElement");
         questionsWrong++;
         animatedGifBox.append("<img src='assets/images/times-up.gif'>");
         randomQuestionHeader.text("You ran out of time...");
         betweenQuestionTimer();
     }
     // meat in the myTimer function
     function timerDecrement() {
         timerNumberDisplay.html("Time:" + timerNumber);
         timerNumber--;
         if (timerNumber < 0) {
             stopTimer();
             outOfTime();
         }
     }
     // timers
     // calls on decrement function every second
     function myTimer() {
         intervalId = setInterval(timerDecrement, 1000);
     }

     function stopTimer() {
         clearInterval(intervalId);
     }
     // functions for between question timer
     function betweenQuestionTimer() {
         timerNumber = 10;
         interval2Id = setInterval(betweenQuestionDecrement, 1000);
     }

     function betweenQuestionDecrement() {
         timerNumber--;
         timerNumberDisplay.html("Next question in:" + timerNumber);
         if (timerNumber === 0) {
             stopBetweenQuestionTimer();
             startGame();
         }
     }

     function stopBetweenQuestionTimer() {
         clearInterval(interval2Id);
     }
 });
