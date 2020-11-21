// Here is the list of all questions, choices, and answers.
var questions = [
  {
    title: "What are the two basic groups of data types in JavaScript?",
    choices: [
      "Primitive and attribute",
      "Primitive and reference types",
      "Reference types and attribute",
      "None of the above"
    ],
    answer: "Primitive and reference types"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  }
];

// DOM elements in variables.
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Quiz state variables.
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // Hide start screen.
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Un-hide questions section.
  questionsEl.removeAttribute("class");

  // Start the timer.
  timerId = setInterval(clockTick, 1000);

  // Show the starting time.
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Get current question object from array.
  var currentQuestion = questions[currentQuestionIndex];

  // Update the title with current question.
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear out old question choices.
  choicesEl.innerHTML = "";

  // Loop over the choices.
  currentQuestion.choices.forEach(function(choice, i) {
    // Create new button for every choice.
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // Attach click event listener to every choice.
    choiceNode.onclick = questionClick;

    // Show on the page.
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Check if the user guessed wrong.
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Penalize the time.
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // Display new time on the page.
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Flash right and wrong feedback.
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Put next question.
  currentQuestionIndex++;

  // The time checker.
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stop the timer.
  clearInterval(timerId);

  // Show the end screen.
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show a final score.
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide the questions section.
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // Update the time.
  time--;
  timerEl.textContent = time;

  // Check if user ran out of time.
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get value of input box.
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Get saved scores from localstorage, or if not any, set to empty array.
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user.
    var newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage.
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to the next page.
    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Submit the initials.
submitBtn.onclick = saveHighscore;

// Start the quiz.
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;