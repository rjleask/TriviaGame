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
     var countryQuestion = jordanQuestion;
     var goalsScoredQuestion = peleQuestion;
     // array of all the questions to be accessed randomly
     var allQuestionsArr = [countryQuestion, goalsScoredQuestion];
     // takes in the current iframe for the question
     var animatedGifHolder;
     // updated based on what question was asked, a more descriptive answer
     var correctMessageDisplay;
     // counts what question its on, incremented in the questions themselves
     var questionCounter = 1;

     $(".start_button").on("click", function() {
         $(this).addClass("hideElement");
         $(".game_description").addClass("hideElement");
         startGame();
         randomQuestionHeader.addClass("revealElement");
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
         var randomNumber = Math.floor(Math.random() * allQuestionsArr.length);
         allQuestionsArr[randomNumber]();
     }

     // all the questions are below here
     function jordanQuestion() {
         // resets rightAnswer and ultPossibleAnswers
         reset();
         animatedGifHolder = $(".jordan");
         allQuestionsArr.splice(0, 1);
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
         animatedGifHolder = $("#pele1");
         allQuestionsArr.splice(1, 1);
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
     // passes in event to  questionclickhandler
     function questionClickEventHandler() {
         $("li").on("click", function(e) {
             correctGuessChecker(e);
         });
         questionCounter++;
     }

     function reset() {
         ultPossibleAnswers = [];
         correctMessageDisplay = "";
     }
     // determins if click event is right or wrong
     function correctGuessChecker(e) {
         if (e.target.innerText == rightAnswer[0]) {
             randomQuestionHeader.text("Correct! " + correctMessageDisplay);
             animatedGifHolder.addClass("revealGif");
             animatedGifHolder.find("a").addClass("revealGif");
             $("li").addClass("hideElement");
         } else {
             console.log("wrong");
         }

     }
 });


 // var delayButtonAlert;
 //  $(#start).on("click",function(){
 //   delayButtonAlert = setTimeout(function(){
 // alert("dsfsfsd");
 // }, 3000);
 // });
 // $(#div).on("click",function(){
 //   clearTimeout(delayButtonAlert);
 // });
