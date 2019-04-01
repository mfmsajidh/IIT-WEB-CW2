const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const wrongAnswerContainer = document.getElementById("wrongAnswer");
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("start");
const retryButton = document.getElementById("retry");

let remainingSeconds = 600;
let consumedSeconds = 0;
let interval;

//To store the wrong answer
const wrongAnswer = [];

function hideVisibilityInstructions() {
    document.getElementById("quiz-body-questions").style.display = 'block';
    document.getElementById("quiz-body-instructions").style.display = 'none';

    interval = setInterval(function(){
        if (remainingSeconds === 600) {
            document.getElementById("time").innerHTML=`${Math.floor(remainingSeconds/60)} : 0${remainingSeconds%60}`;
        }
        else if (remainingSeconds%60<10) {
            document.getElementById("time").innerHTML=`0${Math.floor(remainingSeconds/60)} : 0${remainingSeconds%60}`;
        }
        else {
            document.getElementById("time").innerHTML=`0${Math.floor(remainingSeconds/60)} : ${remainingSeconds%60}`;
        }

        remainingSeconds--;
        consumedSeconds++;

        if (remainingSeconds === 0){
            clearInterval(interval);
            showResults(remainingSeconds);
        }
    }, 1000);
}

function tryAgain() {
    window.location.href = "QuizUI.html";
}

function buildQuiz(){
    //Stores the HTML output
    const output = [];

    //For each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            //Stores the list of answer choices
            const answers = [];

            //For each available answer...
            for(let letter in currentQuestion.answers){

                //...Adds an HTML radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
                );
            }

            //Adds this question and its answers to the output
            output.push(
                `<div class="quiz-slide">
                    <div id="number" class="quiz-paragraph">Question ${questionNumber+1} of ${myQuestions.length}</div>
                    <div class="quiz-heading2"> ${currentQuestion.question} </div>
                    <div class="quiz-paragraph-answers"> ${answers.join("")} </div>
                </div>`
            );
        }
    );

    //Combines the output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

    clearInterval(interval);

    document.getElementById("quiz-body-questions").style.display = 'none';
    document.getElementById("quiz-body-summary").style.display = 'block';

    //Gather answer containers from the quiz
    const answerContainers = quizContainer.querySelectorAll('.quiz-paragraph-answers');

    //Keeps track of user's answers
    let numCorrect = 0;
    let numWrong = 0;

    //For each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        //Find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value; //"{}" Initializing an empty object to deal with empty answers

        //Checks if answer is correct or wrong
        if(userAnswer === currentQuestion.correctAnswer){
            //Add to the number of correct answers
            numCorrect++;
        }
        else{
            //Add to the number of wrong answers
            numWrong++;
            wrongAnswer.push(
                `<div class="quiz-paragraph">• ${currentQuestion.question}</div>`
            )
        }
    });

    if (numCorrect>=5) {
        document.body.style.backgroundColor = "MediumSeaGreen";
    }
    else {
        document.body.style.backgroundColor = "Tomato";
    }

    //Shows the number of correct answers out of the total
    resultsContainer.innerHTML = `You've got ${numCorrect} answers correct out of ${myQuestions.length}<br/>and have achieved ${(numCorrect*2)-(numWrong)} points`;

    //Combines the wrongAnswer list into one string of HTML and put it on the page
    wrongAnswerContainer.innerHTML = wrongAnswer.join('');

    if (consumedSeconds === 600) {
        document.getElementById("timeSummary").innerHTML=`${Math.floor(consumedSeconds/60)} : 0${consumedSeconds%60}`;
    }
    else if (consumedSeconds%60<10) {
        document.getElementById("timeSummary").innerHTML=`0${Math.floor(consumedSeconds/60)} : 0${consumedSeconds%60}`;
    }
    else {
        document.getElementById("timeSummary").innerHTML=`0${Math.floor(consumedSeconds/60)} : ${consumedSeconds%60}`;
    }
}

function showSlide(n) {
    slides[currentSlide].classList.remove("quiz-slide-active");
    slides[n].classList.add("quiz-slide-active");
    currentSlide = n;

    if (currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

//Displays the Quiz instantly
buildQuiz();

//Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".quiz-slide");
let currentSlide = 0;

showSlide(0);

submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
startButton.addEventListener("click", hideVisibilityInstructions);
retryButton.addEventListener("click", tryAgain);



