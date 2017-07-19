var App = function() {
    this.rightAnswer = [];
    this.ul = $("ul");
    // assigning parent function
    this.parent = this.ul.parent();
    this.ultPossibleAnswers = [];
    this.randomQuestionHeader = $(".random_question");
    this.questionCounter = 1;
    // takes in the current animated gif
    this.animatedGifWrong;
    this.animatedGif;
    // container around the gif image
    this.animatedGifBox = $(".animated_gif_box");
    // updated based on what question was asked, a more descriptive answer
    this.correctMessageDisplay;
    this.wrongMessageDisplay;
    // counts what question its on, incremented in the questions themselves
    this.timerNumber = 20;

    this.questionCounter = 1;
    this.intervalId;
    this.interval2Id;
    this.timerNumberDisplay = $(".timer_number");
    this.questionsRight = 0;
    this.questionsWrong = 0;
    var base = this;

    $(".start_button").on("click", function() {
        $(this).addClass("hideElement");
        $(".game_description").addClass("hideElement");
        base.startGame();
        base.randomQuestionHeader.addClass("revealElement");
        base.timerNumberDisplay.addClass("revealElement");
    });
    $("#restart_button").on("click", function() {
        base.restartGame();
    });

    this.addLiToDom = function() {
        var base = this;
        // This code below detaches the ul from the page so it doesnt refresh each time
        // empty the list to remove any values that might be in there
        // loop through each item in the array and append a li with the possAnswers value inside
        // then finally add it back into the dom
        this.ul.detach().empty().each(function(x) {
            for (var i = 0; i < base.ultPossibleAnswers.length; i++) {
                $(this).append('<li><span>' + base.ultPossibleAnswers[i] + '</span></li>');
                if (i == base.ultPossibleAnswers.length - 1) {
                    $(this).appendTo(base.parent);
                }
            }
        });
    }

    this.startGame = function() {
        if (this.allQuestionsArr.length < 1) {
            this.stopTimer();
            this.stopBetweenQuestionTimer();
            this.randomQuestionHeader.text("");
            $("#right_answer").text("Questions Right:" + this.questionsRight);
            $("#wrong_answer").text("Questions Wrong:" + this.questionsWrong);
            $(".end_game_results").addClass("revealElement");
            $("#restart_button").css("display", "inline-block");
            this.allQuestionsArr = [this.peleQuestion, this.jordanQuestion, this.aliQuestion, this.phelpsQuestion, this.gretzkyQuestion, this.babeQuestion, this.serenaQuestion, this.tigerQuestion];
            this.animatedGifBox.empty();
        } else {
            var randomNumber = Math.floor(Math.random() * this.allQuestionsArr.length);
            this.allQuestionsArr[randomNumber].call(this);
            this.timerNumberDisplay.html("Time:" + this.timerNumber);
            this.myTimer();
        }
    }
    this.restartGame = function() {
        $("#right_answer").css("display", "none");
        $("#wrong_answer").css("display", "none");
        $("#restart_button").css("display", "none");
        this.questionsWrong = 0;
        this.questionsRight = 0;
        this.questionCounter = 1;
        this.startGame();
    }
    this.reset = function() {
        this.ultPossibleAnswers = [];
        this.correctMessageDisplay = "";
        this.wrongMessageDisplay = "";
        this.timerNumber = 20;
        this.rightAnswer = [];
        this.animatedGifBox.empty();
    }
    this.correctGuessChecker = function(e) {

            if (e.target.innerText == this.rightAnswer[0]) {
                this.animatedGifBox.append(this.animatedGif);
                this.randomQuestionHeader.text("Correct! " + this.correctMessageDisplay);
                $("li").addClass("hideElement");
                this.questionsRight++;
                this.betweenQuestionTimer()
            } else {
                this.questionsWrong++;
                this.animatedGifBox.append(this.animatedGifWrong);
                this.randomQuestionHeader.text("Wrong! " + this.wrongMessageDisplay);
                $("li").addClass("hideElement");
                this.betweenQuestionTimer();
            }
        }
        // passes in event to  questionclickhandler
    this.questionClickEventHandler = function() {
        var base = this;
        $("li").on("click", function(e) {
            base.stopTimer();
            base.correctGuessChecker(e);
        });
        this.questionCounter++;
    }
    this.jordanQuestion = function() {
        // resets rightAnswer and ultPossibleAnswers
        this.reset();
        this.animatedGif = "<img src='assets/images/jordan.gif'>";
        this.animatedGifWrong = "<img src='assets/images/jordan-wrong.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.jordanQuestion), 1);
        this.wrongMessageDisplay = "The right answer was Jordan...look how disappointed jordan is in your knowledge";
        // runs after the correct answer was chosen
        this.correctMessageDisplay = " Jordan went 6-0 in NBA title series(Lebron is 3-5) including 5mvp and 10 defensive player awards!";
        // question to be displayed in the randomquestionheader
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":Whom of the following is considered by many to be the best basketball player of all time?");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Michael Johnson", "Jackie Robinson", "Michael Jordan", "Morgan Freeman"];
        // push the right answer for the question to the gloabal right answer array
        this.rightAnswer.push(possAnswers[2]);
        // loops through possible answers and pushes them to the global array for referencing
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        // listens for a click event on an li element calls questionclickhandler then passes in the event to correctGuessChecker which determins if its right or wrong
        this.questionClickEventHandler();
    }
    this.peleQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/pele-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/pele.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.peleQuestion), 1);
        this.wrongMessageDisplay = "The right answer was Pele..";
        this.correctMessageDisplay = "Pele has scored over 1200 goals in his career, twice the amount of the current live leader Christiano Ronaldo";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":Who has scored the most goals out of these players?");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Lionel Messi", "Christiano Ronaldo", "Pele", "Wayne Rooney"];
        this.rightAnswer.push(possAnswers[2]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }
    this.aliQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/ali-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/ali.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.aliQuestion), 1);
        this.wrongMessageDisplay = "You dolt! probably should have gotten that one...";
        this.correctMessageDisplay = "Ali (aka cassius clay) went 56 and 5 in his career with 37 knockouts and had a number of entertaining phrases";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":Who was famous for saying 'float like a butterfly, sting like a bee'");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["George Foreman", "Larry Bird", "Kareem Jabbar", "Muhammad Ali"];
        this.rightAnswer.push(possAnswers[3]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }
    this.gretzkyQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/gretzky-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/gretzky.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.gretzkyQuestion), 1);
        this.wrongMessageDisplay = "Need to know this person if you want to be cool...Wayne Gretzky";
        this.correctMessageDisplay = "'He Who Must Be Named' when talking hockey. Wayne Gretzky was/is THE hockey god, he holds or shares around 60 NHL records!";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":Which one of these athletes is nicknamed 'The Great One'");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Babe Ruth", "Tiger Woods", "Wayne Gretzky", "Tom Brady"];
        this.rightAnswer.push(possAnswers[2]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }

    this.phelpsQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/phelps-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/phelps.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.phelpsQuestion), 1);
        this.wrongMessageDisplay = "Good gracious gravy...where have you been";
        this.correctMessageDisplay = "Surprising to see him in sports legends? you shouldnt be..39 world records, 22 olympic medals 18 of them gold";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":Swimmer...18 olympic gold medals...Who is it!?");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Michael Phelps", "Michael Keaton", "Michael Myers", "Mike Piazza"];
        this.rightAnswer.push(possAnswers[0]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }
    this.babeQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/babe-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/babe.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.babeQuestion), 1);
        this.wrongMessageDisplay = "ugh...Babe Ruth";
        this.correctMessageDisplay = "In a time when the record for HR's in a career was 128, Babe Ruth came along and hit 714, oh and decided to win 100 games with 2.28 era";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":7x world series champion, 12x home run leader nicknamed 'The Great Bambino'");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Bobby Bonilla", "Babe Ruth", "Billy Wagner", "David Ortiz"];
        this.rightAnswer.push(possAnswers[1]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }
    this.serenaQuestion = function() {
        this.reset();
        this.animatedGifWrong = "<img src='assets/images/serena-wrong.gif'>";
        this.animatedGif = "<img src='assets/images/serena.gif'>";
        this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.serenaQuestion), 1);
        this.wrongMessageDisplay = "not at all good...Answer was Serena Williams";
        this.correctMessageDisplay = "Absolute dominance is how i would describe serena career 23 grandslams 4x mixed doubles finalist, 4x gold medalist";
        this.randomQuestionHeader.text("Q" + this.questionCounter + ":This womens tennis player has won 23 grandslams........!");
        $(".possible_answers_li").css("display", "block");
        var possAnswers = ["Venus Williams", "Monica Seles", "Serena Williams", "Stefi Graff"];
        this.rightAnswer.push(possAnswers[2]);
        for (var i = 0; i < possAnswers.length; i++) {
            this.ultPossibleAnswers.push(possAnswers[i]);
        }
        this.addLiToDom();
        this.questionClickEventHandler();
    }
    this.tigerQuestion = function() {
            this.reset();
            this.animatedGifWrong = "<img src='assets/images/woods-wrong.gif'>";
            this.animatedGif = "<img src='assets/images/woods.gif'>";
            this.allQuestionsArr.splice(this.allQuestionsArr.indexOf(this.tigerQuestion), 1);
            this.wrongMessageDisplay = "no no no, answer was tiger woods";
            this.correctMessageDisplay = "By far the most dominent and exciting golfer ever, he didnt just win, he absolutely destroyed his competition. People who don't watch golf watched golf when tiger played.";
            this.randomQuestionHeader.text("Q" + this.questionCounter + ":This golfer has spent 683 weeks as number 1 in the world, the next closest is 6 years behind...");
            $(".possible_answers_li").css("display", "block");
            var possAnswers = ["Jack Nicholas", "Arnald Palmer", "Jordan Spieth", "Tiger Woods"];
            this.rightAnswer.push(possAnswers[3]);
            for (var i = 0; i < possAnswers.length; i++) {
                this.ultPossibleAnswers.push(possAnswers[i]);
            }
            this.addLiToDom();
            this.questionClickEventHandler();
        }
        // array of all the questions to be accessed randomly
    this.allQuestionsArr = [this.jordanQuestion, this.peleQuestion, this.phelpsQuestion, this.tigerQuestion, this.babeQuestion, this.serenaQuestion, this.aliQuestion, this.gretzkyQuestion];
    this.outOfTime = function() {
            $("li").addClass("hideElement");
            this.questionsWrong++;
            this.animatedGifBox.append("<img src='assets/images/times-up.gif'>");
            this.randomQuestionHeader.text("You ran out of time...");
            this.betweenQuestionTimer();
        }
        // meat in the myTimer function
    this.timerDecrement = function() {
            base.timerNumber--;
            base.timerNumberDisplay.html("Time:" + base.timerNumber);
            if (base.timerNumber <= 0) {
                base.stopTimer();
                base.outOfTime();
            }
        }
        // calls on decrement function every second
    this.myTimer = function() {
        this.intervalId = setInterval(this.timerDecrement, 1000);
    }

    this.stopTimer = function() {
            clearInterval(this.intervalId);
        }
        // functions for between question timer
    this.betweenQuestionTimer = function() {
        this.timerNumber = 10;
        this.interval2Id = setInterval(this.betweenQuestionDecrement, 1000);
    }

    this.betweenQuestionDecrement = function() {
        base.timerNumber--;
        base.timerNumberDisplay.html("Next question in:" + base.timerNumber);
        if (base.timerNumber <= 0) {
            base.stopBetweenQuestionTimer();
            base.startGame();
        }
    }

    this.stopBetweenQuestionTimer = function() {
        clearInterval(this.interval2Id);
    }
};

var myApp = new App();
// console.time
