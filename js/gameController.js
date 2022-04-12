// Retreives question list from questions.json
var questionList = [];
$.getJSON("questions.json", function (data) {
    questionList = data;
    nextQuestion();
});
// List of words
var words = [
    "fake",
    "die",
    "kill"
];

var currentQuestion = {};
var totalPoints = 0;


var hintCount = 0;

function addHint() {
    var newHint = $("<img>").attr("src", currentQuestion.hints[hintCount + 1]);
    var mediaSample = $("<div>").addClass("mediaSample").append(newHint);
    mediaSample.insertBefore($("#addMediaButton"));
    currentQuestion.points -= currentQuestion.hintDeduction * currentQuestion.hintDeductionMultiplier;
    deductPoints(currentQuestion.points, currentQuestion.hintDeduction * currentQuestion.hintDeductionMultiplier);
    currentQuestion.hintDeductionMultiplier += currentQuestion.hintDeductionMultiplierIncriment;
    if (currentQuestion.points < 0) {
        currentQuestion.points = 0;
    }
    hintCount++;

    if (hintCount == 2) {
        $("#addMediaButton").hide();
    }
}

function hintConstructor(hint) {
    var newHint = $("<img>").attr("src", hint);
    var mediaSample = $("<div>").addClass("mediaSample").append(newHint);
    mediaSample.insertBefore($("#addMediaButton"));
}

function questionConstructor(question) {
    var questionDiv = $("#question");
    var answers = question.incorrectAnswers;
    // inserts question.answer into answers array at random pos without replacement
    var randomPos = Math.floor(Math.random() * answers.length);
    answers.splice(randomPos, 0, question.answer);
    var answersDiv = $("#answers");
    answersDiv.empty();
    for (var i = 0; i < answers.length; i++) {
        var answer = $("<div>").addClass("answer")
        var answerSpan = $("<span>").text("How To " + answers[i]);
        answer.append(answerSpan);
        answer.attr("data-answer", answers[i]);
        answer.on("click", checkAnswer);
        answer.appendTo(answersDiv);
    }
    currentQuestion = question;
    currentQuestion.deduction = 30;
    currentQuestion.deductionMultiplier = 1;
    currentQuestion.deductionMultiplierIncriment = 0.5;

    currentQuestion.hintDeduction = 10;
    currentQuestion.hintDeductionMultiplier = 1;
    currentQuestion.hintDeductionMultiplierIncriment = 1;

    currentQuestion.points = 200;

    $(".mediaSample").remove();
    hintConstructor(currentQuestion.hints[0]);
    hintCount = 0;
    $("#addMediaButton").show();
}



function checkAnswer() {
    if ($(this).hasClass("correctAnswer") || $(this).hasClass("wrongAnswer")) return;
    var answer = $(this).attr("data-answer");
    if (answer == currentQuestion.answer) {
        correctAnswer();
        $(this).addClass("correctAnswer");
    } else {
        wrongAnswer();
        $(this).addClass("wrongAnswer");
    }
}

function correctAnswer() {
    totalPoints += currentQuestion.points;
    $("#nextQuestionButton").removeClass("hidden");
}

function wrongAnswer() {
    currentQuestion.points -= currentQuestion.deduction * currentQuestion.deductionMultiplier
    // ensures that deduction is not negative
    if (currentQuestion.points < 0) {
        currentQuestion.points = 0;
    }
    deductPoints(currentQuestion.points, currentQuestion.deduction * currentQuestion.deductionMultiplier);

    currentQuestion.deductionMultiplier += currentQuestion.deductionMultiplierIncriment;
}


function nextQuestion() {
    $("#nextQuestionButton").addClass("hidden");
    currentQuestion.points;
    questionConstructor(questionList[Math.floor(Math.random() * questionList.length)]);
}

function addToTotal(points) {

}


function deductPoints(newPoints, deduction) {
    $(".deduction").remove();
    var deductionDiv = $("<div>").addClass("deduction").text("-" + deduction);
    $("#questionPoints").append(deductionDiv);
    setTimeout(() => {
        $("#questionPointsNumber").text(newPoints);
    }, 1500);
}