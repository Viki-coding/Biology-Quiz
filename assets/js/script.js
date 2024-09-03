
//Get username from input field//
let username;

document.getElementById("start-btn").onclick = function(){
    username = document.getElementById("name").ariaValueMax;
    document.getElementById("start-btn").textContent = 'Hello ${username}';
}


// let the variable of questions include the following list(array) of questions and answers//
let questions = [{
        question: "What do motor neurons connect to?",
        answers: [{
                text: "Receptors",
                correct: false
            },
            {
                text: "Muscles and glands",
                correct: true
            },
            {
                text: "Muscles only",
                correct: false
            },
            {
                text: "Glands only",
                correct: false
            },
        ]
    },
    {
        question: "Which disease cannot be treated with anitbiotics?",
        answers: [{
                text: "Tuberculosis",
                correct: false
            },
            {
                text: "Measles",
                correct: true
            },
            {
                text: "Gonorrhoea",
                correct: false
            },
            {
                text: "Salmonella",
                correct: true
            },
        ]
    },
    {
        question: "Which of the following describes coal, oil and natural gas?",
        answers: [{
                text: "They are all fossil fuels and their supply is unlimited",
                correct: false
            },
            {
                text: "They are all renewable fuels and their supply is unlimited",
                correct: false
            },
            {
                text: "They are all fossil fuels and their supply is finite",
                correct: true
            },
            {
                text: "They are all renewable fuels and their supply is finite",
                correct: false
            },
        ]
    },
    {
        question: "The presence of some viruses such as HPV in cells can lead to the development of what type of disease?",
        answers: [{
                text: "Cancer",
                correct: true
            },
            {
                text: "Diabetes",
                correct: false
            },
            {
                text: "Measels",
                correct: false
            },
            {
                text: "HIV/AIDS",
                correct: false
            },
        ]
    },
    {
        question: "What do plants absorb from the soil to produce proteins?",
        answers: [{
                text: "Oxygen",
                correct: false
            },
            {
                text: "Nitrate ions",
                correct: true
            },
            {
                text: "Amino Acids",
                correct: false
            },
            {
                text: "Chlorophyll",
                correct: false
            },
        ]
    },
    {
        question: "What is the extended part of a neurone which carries an electrical signal away from the cell body called?",
        answers: [{
                text: "Dendron",
                correct: false
            },
            {
                text: "Axon",
                correct: true
            },
            {
                text: "Dendrite",
                correct: false
            },
            {
                text: "Synapse",
                correct: false
            },
        ]
    },
    {
        question: "What substance is used to make cell walls?",
        answers: [{
                text: "Water",
                correct: false
            },
            {
                text: "Oxygen",
                correct: false
            },
            {
                text: "Cellulose",
                correct: true
            },
            {
                text: "Carbon dioxide",
                correct: false
            },
        ]
    },
    {
        question: "What is the overall movement of particles from an area of higher concentration to an area of lower concentration called?",
        answers: [{
                text: "Active transport",
                correct: false
            },
            {
                text: "Osmosis",
                correct: false
            },
            {
                text: "Ventilation",
                correct: false
            },
            {
                text: "Diffusion",
                correct: true
            },
        ]
    },
    {
        question: "What greenhouse gas is relased when peat is burned as a fuel?",
        answers: [{
                text: "Nitrogen",
                correct: false
            },
            {
                text: "Helium",
                correct: false
            },
            {
                text: "Methane",
                correct: false
            },
            {
                text: "Carbon Dioxide",
                correct: true
            },
        ]
    },
    {
        question: "What type of cell detects stimulus?",
        answers: [{
                text: "Relay",
                correct: false
            },
            {
                text: "Sensory",
                correct: false
            },
            {
                text: "Motor",
                correct: false
            },
            {
                text: "Receptor",
                correct: true
            },
        ]
    }
];

//Add variables to questions and answers and next button in quiz area//
let questionElement = document.getElementById("questions");
let answerButtons = document.getElementById("ans-button");
let nextButton = document.getElementById("next-btn");

//Question number and score changing once we start quiz - create variables to restore question index and score//
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
// set the question number incrementally//
//display the various questions using the question element that we have id in the html//
//resetState to hide the Ansewer 1, 2, 3, 4 then //
function displayQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
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
    });

}
//define function to resetState do the previous answers(firstChild) are not diplayed//
function resetState() {
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

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        displayQuestion();
    }else{
        showScore();
    }
}
//if the current index is less than lenght then we add the next button otherwise we display start quix button?//
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
})

startQuiz()