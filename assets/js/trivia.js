 var selectedAnswer;
 var rightAnswer = [];
 var ul = $("ul");
 var parent = ul.parent();
 var ultPossibleAnswers = [];

 var randomQuestionHeader = $(".random_question");


 var countryQuestion = question1;

 var allQuestionsArr = [countryQuestion];

 $(".start_buton").on("click", function() {
     $(this).addClass("start_button_hide");
     startGame();
     randomQuestionHeader.addClass("random_question_reveal");
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

 function startGame() {
     var randomNumber = Math.floor(Math.random() * allQuestionsArr.length);
     console.log(allQuestionsArr[randomNumber]);
     allQuestionsArr[randomNumber]();
 }

 function question1() {
     ultPossibleAnswers = [];
     randomQuestionHeader.text("How many countries in the world?");
     $(".possible_answers_li").css("display", "block");
     rightAnswer.push(300);
     var possAnswers = [200, 300, 400, 500];
     for (var i = 0; i < possAnswers.length; i++) {
         ultPossibleAnswers.push(possAnswers[i]);
     }
     addLiToDom();
 }
