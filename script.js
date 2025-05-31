const questions = [
  {
    type: "single",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    type: "multi",
    question: "Select all prime numbers.",
    options: ["2", "3", "4", "5"],
    answer: ["2", "3", "5"]
  },
  {
    type: "fill",
    question: "Fill in the blank: The capital of France is ______.",
    answer: "Paris"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const submitBtn = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionContainer.innerHTML = `<p><strong>${q.question}</strong></p>`;

  if (q.type === "single") {
    q.options.forEach(option => {
      questionContainer.innerHTML += `
        <label><input type="radio" name="option" value="${option}"> ${option}</label><br/>
      `;
    });
  } else if (q.type === "multi") {
    q.options.forEach(option => {
      questionContainer.innerHTML += `
        <label><input type="checkbox" name="option" value="${option}"> ${option}</label><br/>
      `;
    });
  } else if (q.type === "fill") {
    questionContainer.innerHTML += `
      <input type="text" id="fill-input" placeholder="Your answer here"/>
    `;
  }
}

function checkAnswer() {
  const q = questions[currentQuestionIndex];
  let isCorrect = false;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && selected.value === q.answer) isCorrect = true;
  } else if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(input => input.value);
    isCorrect = selected.sort().toString() === q.answer.sort().toString();
  } else if (q.type === "fill") {
    const input = document.getElementById("fill-input").value.trim();
    if (input.toLowerCase() === q.answer.toLowerCase()) isCorrect = true;
  }

  if (isCorrect) score++;
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionContainer.innerHTML = "";
  submitBtn.style.display = "none";
  scoreContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}

submitBtn.addEventListener("click", checkAnswer);

loadQuestion();
