// Event Listener for DOM to start quiz once all loaded//


// Event Listener – has player entered NAME?// 
// Event Listener  - Load questions once player has ENTERED NAME and clicked on START// 
// Event Listener  - Load NEXT questions once player has selected an ANSWER and clicked on NEXT// 
// Event Listener – Once the users has reached 10th question – display the REULTS page with score// 
// Event Listener – Load NEXT questions if player clicks PLAY AGAIN unless they have reached 10th question// 
// Event Listener – Return user to HOME screen if they click on HOME// 

// Functions: // 
// Username – user to enter name then START – save user name to user so we can display on RESULTS page// 
// START Quiz // 
// NEXT question till 10th question then end quiz to display score// 

// Display Number of Questions – questions will increase // 
// Display correct questions // 
// Display current question// 

// Remove previous answers when user clicks on NEXT and display next questions// 
// Is the question correct? True or False// 
// Display RESULTS score and final message// 
// If user clicks replay – reset score and start on question 11-20.// 

// let the variable of questions include the following list(array) of questions and answers//
let questions = [{
        question: "What do motor neurons connect to?",
        answers: [{
                text: "Receptors",
                correct: false
            },
            {
                text: "Muscles or glands",
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
let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("ans-buttons");
let nextButton = document.getElementById("nextbtn");

//Question number and score changing once we start quiz - create variables to restore question index and score//
let currentQuestionIndex = 0;
let score = 0;

//Function to start quiz -> reset current question and score to begin at 0//
// -> reset next.Button //
// -> call the display question function//
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    displayQuestion();
}

//Display Question & Answer//
//call on the current questions from the question array//
// set the question number incrementally//
//display the various questions using the question element that we have id in the html//
function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    //Display our answer and text answers for the current questions listed above it will populate the inner html buttons//
    //create the button tag and save it as a variable, then add the answer text//
    //display the button inside the div which we id'd in our html as answerButton//
    //if the answer is true then we add a dataset which equals correct answer//
    //Add event listerner when the mouse clicks an answer, this will then run the chosenAnswer function//
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chosenAnswer);
    });
}

//Remove all previous answers//
function reset() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Checks the chosen answer from the dataset and checks if the chosen answer is true or false//
function chosenAnswerAnswer(e) {
    let chosenAnswer = e.target;
    let isRight = chosenAnswer.dataset.correct === "true";
    if (isRight) {
        chosenAnswer.classList.add("correct");
    } else {
        chosenAnswer.classList.add("incorrect");
    }
}
}

startQuiz();