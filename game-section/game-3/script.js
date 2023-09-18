
// Questions and Answers
const questions = [
    {
        question: "What is the correct form for a deadlift exercise?",
        answers: [
            { text: "Bending your back as much as possible", correct: false },
            { text: "Keeping your back straight and lifting with your legs", correct: true },
            { text: "Lifting with your back only", correct: false },
            { text: "Using a rounded back to lift the weight", correct: false },
        ]
    },
    {
        question: "Which muscle group does the Romanian deadlift primarily target?",
        answers: [
            { text: "Quadriceps", correct: false },
            { text: "Hamstrings", correct: true },
            { text: "Biceps", correct: false },
            { text: "Calves", correct: false },
        ]
    },
    {
        question: "What is the term for the maximum amount of weight you can lift for a single repetition of an exercise?",
        answers: [
            { text: "One-rep max (1RM)", correct: true },
            { text: "Maximum load capacity", correct: false },
            { text: "Rep max limit", correct: false },
            { text: "Weightlifting peak", correct: false },
        ]
    },
    {
        question: "Which exercise is best for targeting the muscles of the posterior chain?",
        answers: [
            { text: "Bench press", correct: false },
            { text: "Leg press", correct: false },
            { text: "Bent-over rows", correct: true },
            { text: "Tricep dips", correct: false },
        ]
    },
    {
        question: "In strength training, what does the acronym 'AMRAP' stand for?",
        answers: [
            { text: "All Muscle Repetition and Performance", correct: false },
            { text: "As Many Repetitions As Possible", correct: true },
            { text: "Advanced Muscle Resistance and Power", correct: false },
            { text: "Accelerated Muscle Recovery and Adaptation Program", correct: false },
        ]
    },
    {
        question: "What is the main purpose of periodization in a workout program?",
        answers: [
            { text: "To increase workout duration", correct: false },
            { text: "To eliminate rest days", correct: false },
            { text: "To vary training intensity and volume over time", correct: true },
            { text: "To focus on a single exercise for an extended period", correct: false },
        ]
    },
    {
        question: "Which type of exercise is most effective for improving cardiovascular endurance?",
        answers: [
            { text: "Isometric exercises", correct: false },
            { text: "Plyometric exercises", correct: false },
            { text: "Aerobic exercises", correct: true },
            { text: "Anaerobic exercises", correct: false },
        ]
    },
    {
        question: "What is the recommended rest period between different muscle group workouts in a split routine?",
        answers: [
            { text: "24 hours", correct: false },
            { text: "48 hours", correct: true },
            { text: "72 hours", correct: false },
            { text: "7 days", correct: false },
        ]
    },
    {
        question: "What is the purpose of a spotter in weightlifting exercises?",
        answers: [
            { text: "To lift the weight for the lifter", correct: false },
            { text: "To provide encouragement and motivation", correct: false },
            { text: "To ensure safety and assist when needed", correct: true },
            { text: "To time the rest intervals between sets", correct: false },
        ]
    },
    {
        question: "Which of the following is a compound exercise that targets multiple muscle groups?",
        answers: [
            { text: "Bicep curls", correct: false },
            { text: "Leg curls", correct: false },
            { text: "Squats", correct: true },
            { text: "Tricep extensions", correct: false },
        ]
    },
        

];


// Get references to HTML elements.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timerRunning = false; 
let timerTimeout; 


// Function to shuffle an array using the Fisher-Yates shuffle algorithm.

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap the elements at randomIndex and currentIndex
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

// Function to start the quiz.

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
    resetTimer()

    // Reset the timer element's display property
    timerElement.style.display = 'block';
    
}

// Function to display a question and its answer choices.

function showQuestion(){
    resetState();
    resetTimer()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });

    // Start the timer when showing a new question
    timerRunning = true;
    timeLeft = 10; // Set the initial time

    // Start the timer
    updateTimer();
}

// Function to reset the quiz state.
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

// Function to handle the user's answer selection.
function selectAnswer(e){
    if (!timerRunning) {
        // If the timer is not running, do nothing (answers can't be clicked)
        return;
    }

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
       // button.disabled = true;
    });
    
     // Stop the timer when an answer is chosen
     timerRunning = false;
     clearTimeout(timerTimeout);
 
     Array.from(answerButtons.children).forEach(button => {
         if (button.dataset.correct === 'true') {
             button.classList.add("correct");
         }
         // button.disabled = true;
     });
     nextButton.style.display = "block";

    // Show the correct answer
    showCorrectAnswer();

}

// Function to show the final score at the end of the quiz.
function showScore() {
    resetState();
    timerElement.style.display = 'none';
    questionElement.innerHTML = `Congrats! you got ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

// Function to handle the "Next" button click.
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore()
    }
}
// Event listener for the "Next" button.
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Timer
const timerElement = document.querySelector('.timer');
let timeLeft = 5; // Set the initial time in seconds

// Function to update and display the timer.
function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft === 0 && timerRunning) {

        // Handle when time runs out and show correct answer and next button
        timerRunning = false; // Stop the timer from running into negative
        showCorrectAnswer(); // Function to display the correct answer
    }  else if (timerRunning) {
        if (timeLeft <= 5) {
            timerElement.style.color = 'red'; // Change color when time is running out
        }
        timeLeft--;
        if (timeLeft >= 0) {
            setTimeout(updateTimer, 1000); // Update the timer every second
        }
    }

}

// Function to reset the timer.
function resetTimer() {
    timeLeft = 10;
    timerElement.style.color = 'white'; 
}


// Function to display the correct answer and handle timer-related actions.

function showCorrectAnswer() {
    // Displays the correct answer 
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.answers.findIndex(answer => answer.correct);
    const correctButton = answerButtons.children[correctAnswerIndex];
    
    // Add a class to highlight the correct answer
    correctButton.classList.add("correct");

    if (timeLeft === 0) {
        // Show an alert only when the timer is out
        alert("You are out of time!");
    }
    // Show the next button
    nextButton.style.display = "block";
}

// Initialize the timer and start the quiz.
updateTimer();
shuffleArray(questions);
startQuiz();


document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    const accountLink = document.getElementById("account-icon");
  
    if (isAuthenticated === 'true') {
        // User is logged in, show the account page
        accountLink.href = "/account-section/main-account-section/index.html";
    } else {
        // User is not logged in, show the make an account page
        accountLink.href = "/account-section/index.html";
    }
  });