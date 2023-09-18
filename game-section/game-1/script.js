
// Questions and Answers
const questions = [
    {
        question: "What's the primary purpose of a warm-up before exercise?",
        answers:[
            { text: "To show off your dance moves", correct: false},
            { text: "To increase your heart rate", correct: true},
            { text: "To cool down after the workout", correct: false},
            { text: "To catch up on social media", correct: false},
        ]
    },
    {
        question: "Which exercise primarily targets the chest muscles?",
        answers: [
            { text: "Squats", correct: false },
            { text: "Push-ups", correct: true },
            { text: "Lunges", correct: false },
            { text: "Planks", correct: false },
        ]
    },
    {
        question: "Which of the following foods is a good source of post-workout protein?",
        answers: [
            { text: "Ice Cream", correct: false },
            { text: "Potato Chips", correct: false },
            { text: "Grilled Chicken", correct: true },
            { text: "Candy Bars", correct: false },
        ]
    },
    {
        question: "Which type of stretching is best suited for increasing flexibility?",
        answers: [
            { text: "Static stretching", correct: true },
            { text: "Dancing", correct: false },
            { text: "Yoga", correct: false },
            { text: "Running", correct: false },
        ]
    },
    {
        question: "What's the recommended daily water intake for an average adult?",
        answers: [
            { text: "2.5 liters", correct: false },
            { text: "4 liters", correct: false },
            { text: "8 glasses (approximately 2 liters)", correct: true },
            { text: "1 gallon", correct: false },
        ]
    },
    {
        question: "Which exercise is also known as the 'king of all lifts' in strength training?",
        answers: [
            { text: "Bicep curls", correct: false },
            { text: "Dead lifts", correct: true },
            { text: "Leg press", correct: false },
            { text: "Tricep extensions", correct: false },
        ]
    },
    {
        question: "What's the ideal rest time between sets for building muscle?",
        answers: [
            { text: "10 seconds", correct: false },
            { text: "1 minute", correct: true },
            { text: "5 minutes", correct: false },
            { text: "30 seconds", correct: false },
        ]
    },
    {
        question: "Which of these workouts is known for its mind-body connection and slow, controlled movements?",
        answers: [
            { text: "High-Intensity Interval Training (HIIT)", correct: false },
            { text: "Pilates", correct: true },
            { text: "CrossFit", correct: false },
            { text: "Kickboxing", correct: false },
        ]
    },

];


// Get references to HTML elements.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.querySelector('.timer');

let timeLeft = 10; // Set the initial time in seconds
let currentQuestionIndex = 0;
let score = 0;
let timerRunning = false; 
let timerTimeout; 

// Function to start the quiz.

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
    resetTimer();

    // Reset the timer element's display property
    timerElement.style.display = 'block';
    
}

// Function to display a question and its answer choices.

function showQuestion(){
    resetState();
    resetTimer();
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
startQuiz()


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