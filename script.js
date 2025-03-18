const questionElement = document.getElementById("question");  
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let selectedQuestions = [];

const questions = [
    // **JavaScript**
    { question: "Which keyword is used to declare a variable in JavaScript?", answers: ["var", "int", "string", "declare"], correct: "var", category: "JavaScript" },
    { question: "What will `console.log(typeof null)` output?", answers: ["null", "undefined", "object", "string"], correct: "object", category: "JavaScript" },
    { question: "Which symbol is used for single-line comments in JavaScript?", answers: ["//", "/*", "#", "--"], correct: "//", category: "JavaScript" },
    { question: "Which method converts a string to an integer in JavaScript?", answers: ["parseInt()", "toString()", "Number()", "parseFloat()"], correct: "parseInt()", category: "JavaScript" },
    { question: "How do you declare a function in JavaScript?", answers: ["function myFunction()", "def myFunction()", "fun myFunction()", "void myFunction()"], correct: "function myFunction()", category: "JavaScript" },
    { question: "What will `console.log(2 + '2')` output?", answers: ["4", "22", "NaN", "Error"], correct: "22", category: "JavaScript" },
    { question: "Which of these is a JavaScript framework?", answers: ["Django", "Laravel", "React", "Spring"], correct: "React", category: "JavaScript" },
    { question: "Which event occurs when the user clicks on an HTML element?", answers: ["onhover", "onmouseclick", "onclick", "onpress"], correct: "onclick", category: "JavaScript" },
    { question: "What is `NaN` in JavaScript?", answers: ["Not a Name", "Not a Number", "Negative and Null", "New and Numeric"], correct: "Not a Number", category: "JavaScript" },
    { question: "Which built-in method sorts the elements of an array?", answers: ["changeOrder()", "order()", "sort()", "arrange()"], correct: "sort()", category: "JavaScript" },
  
    // **HTML & CSS**
    { question: "What does HTML stand for?", answers: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Machine Language", "Hyperlink Text Marking Language"], correct: "Hyper Text Markup Language", category: "HTML & CSS" },
    { question: "Which HTML tag is used to define an unordered list?", answers: ["<ul>", "<ol>", "<li>", "<list>"], correct: "<ul>", category: "HTML & CSS" },
    { question: "What does CSS stand for?", answers: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], correct: "Cascading Style Sheets", category: "HTML & CSS" },
    { question: "Which property is used to change the background color in CSS?", answers: ["background-color", "bgcolor", "color", "background"], correct: "background-color", category: "HTML & CSS" },
    { question: "Which unit is not relative in CSS?", answers: ["em", "px", "rem", "%"], correct: "px", category: "HTML & CSS" },
    { question: "What is the default position property of an HTML element?", answers: ["relative", "fixed", "absolute", "static"], correct: "static", category: "HTML & CSS" },
    { question: "Which CSS property is used for flexbox layouts?", answers: ["display", "flex-direction", "align-items", "All of the above"], correct: "All of the above", category: "HTML & CSS" },
    { question: "What is the correct HTML for creating a hyperlink?", answers: ["<a>https://example.com</a>", "<a href='https://example.com'>Link</a>", "<link>https://example.com</link>", "<href>https://example.com</href>"], correct: "<a href='https://example.com'>Link</a>", category: "HTML & CSS" },
    { question: "Which CSS property makes text bold?", answers: ["font-weight", "bold", "text-style", "font-bold"], correct: "font-weight", category: "HTML & CSS" },
    { question: "What does the 'z-index' property control?", answers: ["Font size", "Layer stacking order", "Text alignment", "Element width"], correct: "Layer stacking order", category: "HTML & CSS" },
  
    // **Maths**
    { question: "What is 12 × 12?", answers: ["120", "124", "144", "132"], correct: "144", category: "Maths" },
    { question: "What is the square root of 81?", answers: ["8", "9", "10", "11"], correct: "9", category: "Maths" },
    { question: "What is the value of π (pi) rounded to two decimal places?", answers: ["3.12", "3.14", "3.16", "3.18"], correct: "3.14", category: "Maths" },
    { question: "Solve: 5 + (3 × 4) - 2", answers: ["9", "15", "17", "19"], correct: "15", category: "Maths" },
    { question: "What is 25% of 200?", answers: ["25", "50", "75", "100"], correct: "50", category: "Maths" },
    { question: "What is the perimeter of a square with side length 5?", answers: ["10", "15", "20", "25"], correct: "20", category: "Maths" },
    { question: "What is 9 cubed?", answers: ["27", "81", "729", "243"], correct: "729", category: "Maths" },
    { question: "What is 7! (7 factorial)?", answers: ["42", "120", "5040", "40320"], correct: "5040", category: "Maths" },
    { question: "If x = 3 and y = 4, what is the value of x² + y²?", answers: ["9", "16", "25", "12"], correct: "25", category: "Maths" },
    { question: "Solve for x: 2x + 5 = 15", answers: ["5", "7", "10", "12"], correct: "5", category: "Maths" },

    // General Knowledge
    { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Rome"], correct: "Paris", category: "General Knowledge" },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: "William Shakespeare", category: "General Knowledge" },
    { question: "Which country is famous for the Great Wall?", answers: ["Japan", "India", "China", "Korea"], correct: "China", category: "General Knowledge" },
    { question: "Who was the first person to walk on the moon?", answers: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correct: "Neil Armstrong", category: "General Knowledge" },
    { question: "Which gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide", category: "General Knowledge" },
    { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Iron", "Diamond", "Quartz"], correct: "Diamond", category: "General Knowledge" },
    { question: "What is the chemical symbol for gold?", answers: ["Ag", "Au", "Pb", "Pt"], correct: "Au", category: "General Knowledge" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Mars", category: "General Knowledge" },
    { question: "Who discovered gravity?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Isaac Newton", category: "General Knowledge" },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: "7", category: "General Knowledge" },
    { question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific", category: "General Knowledge" },
    { question: "How many bones are in the adult human body?", answers: ["204", "206", "208", "210"], correct: "206", category: "General Knowledge" }
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
    shuffledQuestions = [...selectedQuestions]; 
    shuffleQuestions(shuffledQuestions);
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    progressBar.style.width = "0%"; 
    nextButton.style.display = "none";
    document.getElementById("timer").style.display = "block";
    showQuestion();
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function categorizeQuestions(category) {
    selectedQuestions = questions.filter(q => q.category === category);
    
    if (selectedQuestions.length === 0) {
        alert("No questions found for this category.");
        return;
    }

    currentCategory = category;
    document.getElementById("categorySelection").style.display = "none";
    startButton.style.display = "block"
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

        const timeUpAudio = new Audio("assets/wrong.mp3"); 

        if (timeLeft === 0) { 
            clearInterval(timer);

            timeUpAudio.play();

            showAlert("Time's up! Moving to next question...");
            disableAnswers();
            
            setTimeout(() => {
                goToNextQuestion();
            }, 5000);
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

        const backButton = document.createElement("button");
        backButton.textContent = "Back to Categories";
        backButton.classList.add("back-btn");
        backButton.onclick = goToCategorySelection;

        answerButtons.appendChild(backButton);
    }
}

function goToCategorySelection() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("categorySelection").style.display = "block";
}

function restartQuiz() {
    categorizeQuestions(currentCategory);
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    
    shuffledQuestions = [...questions]; 
    shuffleQuestions(shuffledQuestions);

    nextButton.textContent = "Next";
    nextButton.style.display = "none";

    nextButton.onclick = goToNextQuestion; 

    document.getElementById("start-btn").style.display = "none";

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
    }, 5000);
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
    
    let audio = new Audio(answer === correctAnswer ? "assets/correct.mp3" : "assets/wrong.mp3");
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


