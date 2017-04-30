var questionList = [];
var currentQuestion = -1;
var reviewList = [];

function showDiv(id) {
  document.getElementById(id).style.display = "block";
}

function hideDiv(id) {
  document.getElementById(id).style.display = "none";
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function showQuestion() {
  showDiv("question");
  showDiv("reveal");
  hideDiv("question_choice");
  hideDiv("questionControls");
  hideDiv("answer");
  document.getElementById("question").innerHTML = questions[currentQuestion].n + ". " + questions[currentQuestion].q;
}

function revealAnswer() {
  hideDiv("question");
  hideDiv("reveal");
  showDiv("answer");
  listItems = "";
  answers = questions[currentQuestion].a.trim().split(";");
  
  for (var i = 0, len = answers.length; i < len; i++) {
    listItems += "&#x25CF; &nbsp;" + answers[i].trim() + "<br>";
  }
  
  document.getElementById("answer").innerHTML = listItems;
  showDiv("questionControls");
}

function nextQuestion() {
  if (questionList.length == 0) {
    hideDiv("questionControls");
    hideDiv("question");
    hideDiv("answer");
    showDiv("reviewList");
    // show review list
    if (reviewList.length > 0) {
      reviewList.sort();
      reviewDisplay = "";
      for (var i = 0, len = reviewList.length; i < len; i++) {
        reviewDisplay += questions[reviewList[i]].n + ". " + questions[reviewList[i]].q + "<br>";
        // add answers
        var reviewAnswers = "";
        var ansList = questions[reviewList[i]].a.trim().split(";");
  
        for (var j = 0, aLen = ansList.length; j < aLen; j++) {
          reviewAnswers += "&#x25CF; &nbsp;" + ansList[j].trim() + "<br>";
        }
        reviewDisplay += reviewAnswers;
        reviewDisplay += "<br>";
      }
      showDiv("reviewList");
      document.getElementById("reviewList").innerHTML = "Please review the following questions:<br><br>" + reviewDisplay;
    } else {
      document.getElementById("reviewList").innerHTML = "Well done! You got everything right!";
    }
    showDiv("reset");
  } else {
    currentQuestion = questionList.pop();
    showQuestion();
  }
}

document.getElementById("revealButton").onclick = function () {
  revealAnswer();
}

document.getElementById("gotItButton").onclick = function () {
  nextQuestion();
}

document.getElementById("reviewButton").onclick = function () {
  reviewList.push(currentQuestion);
  nextQuestion();
}

document.getElementById("resetButton").onclick = function () {
  reset();
}

function reset() {
  hideDiv("question");
  hideDiv("answer");
  hideDiv("reveal");
  hideDiv("questionControls");
  hideDiv("reviewList");
  showDiv("question_choice");
  hideDiv("reset");
  reviewList = [];
}

reset();

function beginQuiz(questions) {
  questionList = questions;
  shuffleArray(questionList);
  nextQuestion();
}

document.getElementById("set1").onclick = function() {
  beginQuiz([0, 1, 2, 3, 4]);
}

document.getElementById("set2").onclick = function() {
  beginQuiz([5, 6, 7, 8, 9]);
}

