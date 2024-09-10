
//Get username from input field//
//Interpreteted using youtube video "Get Textbox Value and Display on Page | Javascript"
const startButton = document.getElementById("start-btn");
const userName = document.getElementById("input-name");
const input = document.getElementById("name");

function displayName(inputName){
    inputName.innerText = inputName;
}
console.log(userName.value);

startButton.addEventListener('click', () => {
    displayName(userName.value)
})

//Hide/Show quiz areas
let div = document.getElementById("loginarea")
let display = 0;

function hideShow()
{
    if(display == 1)
    {
        div.style.display = 'block';
        display = 0;
    }
    else
    {
        div.style.display = 'none';
        display = 1;
    }
}
   


//Create 1 minute countdown timer//
let count = 60;
const timer = setInterval(function() {
  count--;
  console.log(count);
  document.getElementsByClassName("time-board").innerHTML = "s ";
  if (count === 0) {
    clearInterval(timer);
    console.log("Time's up!");
  }

  timer.innerHTML = timer + "time left ";

}, 1000);


//Add variables to questions and answers and next button in quiz area//
let questionElement = document.getElementById("questions");
let answerButtons = document.getElementById("ans-button");
let nextButton = document.getElementById("next-btn");

//Question number and score changing once we start quiz - create variables to restore question index and score//
let questionCounter = 0;
let currentQuestionIndex = 0;
let score = 0;

//Function to start quiz -> reset current question and score to begin at 0//
// -> reset next.Button //
// -> call the display question function//
function startQuiz() {
    currentQuestionIndex = 0
    score = 0;
    nextButton.innerHTML = "Next";
    displayQuestion();
}

//call on the current questions from the question array//
// display question in random order so if user plays again not predicable//
//display the various questions using the question element that we have id in the html//
//Reset to hide the Ansewer 1, 2, 3, 4 then //
function displayQuestion() {
    reset();
    let currentQuestion = questions[Math.floor(Math.random()* questions.length)];
    let questionNum = currentQuestionIndex + 1;
    
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;


    //display potential answers for each question in the buttons created in html//
    //add event listerner so that when user clicks on answer it will be recoginized//
    currentQuestion.answers.forEach(answers => {
        let button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
        questionCounter++ 
    });

}
//define function to Reset do the previous answers(firstChild) are not diplayed//
function reset() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//When user clicks on the selected answer it will check in the dataset answers if the ans is correct or incorrect//
// add an array from each dataset to check if the answer is true or not - it will change color to green and then it will be disabled to select another answer, the next button then displayed once and answer selected//
//add score ++ so the increase the score by 1 
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


//Show the score function//
function displayScore(){
    reset();
    questionElement.innnerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

//Manage the next button when all questions are asked//
function manageNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        displayQuestion();
    }else{
        displayScore();
    }
}
//if the current index is less than lenght then we add the next button otherwise we display start quiz button//
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        manageNextButton();
    }else{
        startQuiz();
    }
    
})

startQuiz()