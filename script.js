const questionElement = document.getElementById("question");  
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const questions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Rome"], correct: "Paris" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Mars" },
    { question: "What is the square root of 64?", answers: ["6", "7", "8", "9"], correct: "8" },
    { question: "Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: "Leonardo da Vinci" },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: "7" },
    { question: "Which gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
    { question: "What is the largest mammal in the world?", answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correct: "Blue Whale" },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: "William Shakespeare" },
    { question: "What is the fastest land animal?", answers: ["Cheetah", "Lion", "Horse", "Kangaroo"], correct: "Cheetah" },
    { question: "What is the chemical symbol for gold?", answers: ["Ag", "Au", "Pb", "Pt"], correct: "Au" },
    { question: "Which country is famous for the Great Wall?", answers: ["Japan", "India", "China", "Korea"], correct: "China" },
    { question: "How many colors are there in a rainbow?", answers: ["5", "6", "7", "8"], correct: "7" },
    { question: "Who discovered gravity?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Isaac Newton" },
    { question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific" },
    { question: "How many bones are in the adult human body?", answers: ["204", "206", "208", "210"], correct: "206" },
    { question: "Which instrument has 88 keys?", answers: ["Violin", "Guitar", "Piano", "Flute"], correct: "Piano" },
    { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Iron", "Diamond", "Quartz"], correct: "Diamond" },
    { question: "Which country is known as the Land of the Rising Sun?", answers: ["China", "India", "Japan", "South Korea"], correct: "Japan" },
    { question: "Who was the first person to walk on the moon?", answers: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correct: "Neil Armstrong" }
];

const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("quiz-container");
const timerDisplay = document.getElementById("timer");
const messageBox = document.getElementById("message");

questionContainer.style.display = "none"; 

startButton.addEventListener("click", () => {
    startButton.style.display = "none"; 
    questionContainer.style.display = "block"; 
    startQuiz();
});

function startQuiz() {
    shuffledQuestions = [...questions];
    shuffleQuestions(shuffledQuestions);
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    nextButton.style.display = "none";
    document.getElementById("timer").style.display = "block";
    progressBar.style.width = "0%";
    showQuestion()
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => checkAnswer(answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });

    updateProgressBar();
    startTimer();
}

function updateProgressBar() {
    let progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

let timeLeft = 10;
let timer;

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").textContent = `You're on a timer: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `You're on a timer: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            showAlert("Time's up! Moving to next question...");
            disableAnswers();
            setTimeout(() => {
                goToNextQuestion();
            }, 3000);
        }
    }, 1000);
}

function goToNextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {

        document.getElementById("timer").style.display = "none"; 
        document.getElementById("score").style.display = "none"; 

        questionElement.textContent = `Quiz Over! Your final score is ${score}/${shuffledQuestions.length}`;
        answerButtons.innerHTML = "";
        nextButton.textContent = "Restart";
        nextButton.style.display = "block";

        nextButton.onclick = restartQuiz;
    }
}

function restartQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    
    shuffledQuestions = [...questions]; 
    shuffleQuestions(shuffledQuestions);

    nextButton.textContent = "Next";
    nextButton.style.display = "none";

    nextButton.onclick = goToNextQuestion; 

    startQuiz(); 
}

function disableAnswers() {
    document.querySelectorAll(".answer-btn").forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "lightgreen";
        }
    });
}

function showAlert(message) {
    messageBox.textContent = message;
    messageBox.style.display = "block"; 
    setTimeout(() => {
        messageBox.style.display = "none"; 
    }, 3000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function checkAnswer(answer, correctAnswer) {
    stopTimer();
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    let audio = new Audio(answer === correctAnswer ? "correct.mp3" : "wrong.mp3");
    audio.play(); 

    if (answer === correctAnswer) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    buttons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "green";
        } else if (btn.textContent === answer) {
            btn.style.backgroundColor = "red";
        }
    });

    nextButton.style.display = "block"; 
}

nextButton.onclick = () => {
    goToNextQuestion();
};


