class Question {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() {
    return this.question;
  }

  getAnswer() {
    return this.answer;
  }
}

$(document).ready(function () {
  $("#option-1").hide();
  $("#option-2").hide();
  $("#question").hide();
  $("label").hide();

  const questions = [
    new Question("JavaScript is object oriented.", "True"),
    new Question("JavaScript is only client-sided.", "False"),
    new Question("JavaScript was created in 1992.", "False"),
    new Question("Netscape created JavaScript.", "True"),
    new Question("Semi-colons are not required in JavaScript.", "True"),
  ];

  let currentQuestion = -1; // lazy fix for broken code
  let correctAnswers = 0;

  function isButtonForStart() {
    return $("#submit").val() == "Start Quiz";
  }

  function isButtonForAnswer() {
    return $("#submit").val() == "Check Answer";
  }

  function showResults() {
    $("#question").text(
      `You got ${correctAnswers} out of ${questions.length} questions right.`
    );
    currentQuestion = -1;
    correctAnswers = 0;
    $("#submit").val("Start Quiz");
    $("#option-1").hide();
    $("#option-2").hide();
    $("label").hide();
  }

  function getLabelForRadio(input) {
    return $("label[for='" + input.attr("id") + "']");
  }

  function getNextQuestion() {
    if (currentQuestion == questions.length - 1) {
      showResults();
      return;
    }

    currentQuestion++;
    let nextQuestion = questions[currentQuestion];
    let label1 = getLabelForRadio($("#option-1"));
    let label2 = getLabelForRadio($("#option-2"));

    $("#question").text(nextQuestion.getQuestion());
    $("#option-1").attr("disabled", false);
    $("#option-2").attr("disabled", false);
    label1.unmark(label1);
    label2.unmark(label2);
    $("#submit").val("Check Answer");
  }

  function generateQuiz() {
    getNextQuestion();
    $("#submit").val("Check Answer");
    $("#option-1").show();
    $("#option-2").show();
    $("#question").show();
    $("label").show();
  }

  function checkAnswer() {
    if (!$("#option-1").is(":checked") && !$("#option-2").is(":checked")) {
      return;
    }

    let answer = questions[currentQuestion].getAnswer();
    let optionPicked = !$("#option-1").is(":checked")
      ? $("#option-2")
      : $("#option-1");
    let oppositeOptionPicked = $("#option-1").is(":checked")
      ? $("#option-2")
      : $("#option-1");

    let label;
    if (optionPicked.val() == answer) {
      label = getLabelForRadio(optionPicked);
      correctAnswers++;
    } else {
      label = getLabelForRadio(oppositeOptionPicked);
    }

    label.mark(label.text());

    $("#option-1").attr("disabled", true);
    $("#option-2").attr("disabled", true);
    $("#submit").val("Next Question");
  }

  $("#quiz").submit(function (event) {
    if (isButtonForStart()) {
      generateQuiz();
    } else if (isButtonForAnswer()) {
      checkAnswer();
    } else {
      getNextQuestion();
    }

    event.preventDefault();
  });
});
